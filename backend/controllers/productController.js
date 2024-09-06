const { Op } = require("sequelize");
const { Product, User } = require("../models");
const imagekit = require("../utils/imageKit");
const { v2: cloudinary } = require("cloudinary");
const midtransClient = require("midtrans-client");
const fetch = require("node-fetch");
const { generateUniqueOrderId } = require("../helpers/timestamp");
class productController {
  static async handleAdd(req, res, next) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      let { id } = req.loginInfo;
      const file = req.file;
      // console.log(req.file);
      if (!file) throw new Error("NotFound");
      const base64 = file.buffer.toString("base64");
      const output = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64}`);
      let { brand, model, kilometer, year, transmission, color, categoryId, description, price } = req.body;
      let data = await Product.create({
        brand,
        model,
        kilometer,
        imageUrl: output.secure_url,
        year,
        transmission,
        color,
        categoryId,
        description,
        price,
        userId: id,
      });

      res.status(201).json({ data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async readId(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Product.findByPk(id);

      if (!data) {
        throw new Error("NotFound");
      }
      res.status(200).json({ data });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Product.findByPk(id);

      if (!data) {
        throw new Error("NotFound");
      }

      await Product.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({ message: `${data.name} succes to delete` });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async patchProduct(req, res, next) {
    try {
      let { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        throw new Error("NotFound");
      }

      const convertTobase64 = req.file.buffer.toString("base64");
      const result = await imagekit.upload({
        file: convertTobase64,
        fileName: req.file.originalname,
      });

      await Product.update(
        { imageUrl: result.url },
        {
          where: {
            id,
          },
        }
      );

      const cekProduct = await Product.findByPk(id);
      res.status(200).json({
        massage: `${cekProduct.name} succed update image`,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readProduct(req, res, next) {
    try {
      const data = await Product.findAll();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async midtrans(req, res, next) {
    const { price } = req.body;
    // console.log(price);
    try {
      // if (!price) throw new Error("bad request");
      // Create Snap API instance

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVER_KEY,
      });

      const orderId = `trx-buy-${generateUniqueOrderId()}`;

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        // customer_details: {
        //   username: req.loginInfo.email,
        // },
      };

      const { token } = await snap.createTransaction(parameter);

      res.status(200).json({
        transaction_token: token,
        orderId,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = productController;
