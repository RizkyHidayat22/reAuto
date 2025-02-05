'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey : "userId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email Already Taken",
      },
      validate: {
        isEmail: true,
        notNull: {
          msg: "Email required",
        },
        notEmpty: {
          msg: "Email required",
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Password required",
        },
        notEmpty: {
          msg: "Password required",
        },
        len: {
          args: 5,
          msg: "Password minimum 5 characters",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Buyer',
      validate: {
        notNull: {
          msg: "Role required",
        },
        notEmpty: {
          msg: "Role required",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hash(user.password);
  });
  return User;
};