"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class price_index extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  price_index.init(
    {
      Country: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      Price_to_income_ratio: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "price_index",
      underscored: true,
    }
  );
  return price_index;
};
