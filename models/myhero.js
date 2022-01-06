"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyHero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyHero.belongsTo(models.Hero);
    }
  }
  MyHero.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "User id required" },
        },
      },
      HeroId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Hero id required" },
        },
      },
      status: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          instance.status = "Unplayed";
        },
      },
      sequelize,
      modelName: "MyHero",
    }
  );
  return MyHero;
};
