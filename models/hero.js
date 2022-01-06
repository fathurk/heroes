"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hero.belongsToMany(models.User, { through: models.MyHero });
      // Hero.hasMany(models.MyHero);
    }
  }
  Hero.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Name is required" },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Image Url is required" },
        },
      },
      typeUrl: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Type Url is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Hero",
    }
  );
  return Hero;
};
