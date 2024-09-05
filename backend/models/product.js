'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {foreignKey : "userId"})
      Product.belongsTo(models.Category, {foreignKey : "categoryId"})
    }
  }
  Product.init({
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Brand required",
        },
        notEmpty: {
          msg: "Brand required",
        },
      },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Model required",
        },
        notEmpty: {
          msg: "Model required",
        },
      },
    },
    kilometer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Kilometer required",
        },
        notEmpty: {
          msg: "Kilometer required",
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image URL required",
        },
        notEmpty: {
          msg: "Image URL required",
        },
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Year required",
        },
        notEmpty: {
          msg: "Year required",
        },
      },
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Transmission required",
        },
        notEmpty: {
          msg: "Transmission required",
        },
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Color required",
        },
        notEmpty: {
          msg: "Color required",
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category required",
        },
        notEmpty: {
          msg: "Category required",
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User required",
        },
        notEmpty: {
          msg: "User required",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description required",
        },
        notEmpty: {
          msg: "Description required",
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price required",
        },
        notEmpty: {
          msg: "Price required",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};