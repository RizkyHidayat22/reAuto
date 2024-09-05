const { Op } = require("sequelize");
const { Product, User } = require("../models");
const imagekit = require("../utils/imageKit");
const {v2 : cloudinary} = require('cloudinary')
class productController {

  static async handleAdd(req, res, next) {
    try {
        cloudinary.config({
            cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
            api_key : process.env.CLOUDINARY_API_KEY,
            api_secret : process.env.CLOUDINARY_API_SECRET
        })

      let { id } = req.loginInfo;
        const file = req.file
        // console.log(req.file);
        if(!file) throw new Error ('NotFound')
        const base64 = file.buffer.toString('base64')
        const output = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${base64}`
        )
      let { brand, model, kilometer, year, transmission, color, categoryId, description, price } = req.body;
      let data = await Product.create({
        brand,
        model,
        kilometer,
        imageUrl : output.secure_url,
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
 
  static async readData(req, res, next) {
    try {
      let { search, sort, filter, page } = req.query;
      let limit = 10;
      let pageNUmber = 1;
      let condition = {
        where: {},
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        limit,
      };

      if (page !== "" && typeof page !== "undefined") {
        // condition.limit = limit;
        pageNUmber = page;
        condition.offset = (page - 1) * limit;
      }

      if (search !== "" && typeof search !== "undefined") {
        condition.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      if (sort !== "" && typeof sort !== "undefined") {
        condition.order = [["createdAt", sort]];
      }

      if (filter !== "" && typeof filter !== "undefined") {
        let filterArr = filter.category.split(",");

        condition.where.categoryId = {
          [Op.in]: filterArr,
        };
      }

      let { count, rows } = await Product.findAndCountAll(condition);
      let totalRows = rows.length;
      res.status(200).json({
        page: pageNUmber,
        totalProduct: count,
        totalPage: Math.ceil(count / limit),
        productPerPage: totalRows,
        data: rows,
      });
    } catch (error) {
      // console.log(error);
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

  static async updateProduct(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Product.findByPk(id);

      let { brand,
        model,
        kilometer,
        imageUrl,
        year,
        transmission,
        color,
        categoryId,
        description,
        price,
        userId } = req.body;
      let updateProduct = await Product.update(
        { brand,
            model,
            kilometer,
            imageUrl,
            year,
            transmission,
            color,
            categoryId,
            description,
            price,
            userId },
        {
          where: {
            id,
          },
          returning: true,
        }
      );

      if (!data) {
        throw new Error("NotFound");
      }

      res.status(200).json({ data, updateProduct: updateProduct[1] });
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
        result
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
}

module.exports = productController;
