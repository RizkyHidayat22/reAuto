const { Category } = require("../models");

class categoryController {
  static async handleAdd(req, res, next) {
    try {
      let { name } = req.body;
      let data = await Category.create({
        name,
      });

      res.status(201).json({ data });
    } catch (error) {
  
      next(error);
    }
  }

  static async readCategory(req, res, next) {
    try {
      let data = await Category.findAll();
      res.status(200).json({ data });
    } catch (error) {
  
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Category.findByPk(id);
      let { name } = req.body;
      let updateCategory = await Category.update(
        { name },
        {
          where: {
            id,
          },
          returning: true,
        }
      );

      if (!data) {
        throw new Error ("NotFound")
      }

      res.status(200).json({ data, updateCategory: updateCategory[1] });
    } catch (error) {
      
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Category.findByPk(id);

      if (!data) {
        throw new Error ("NotFound")
      }

      await Category.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({ massage: `${data.name} succes to delete` });
    } catch (error) {
   
      next(error)
    }
  }
}

module.exports = categoryController;