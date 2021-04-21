"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cost_of_living extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cost_of_living.init(
    {
      Country: { type: DataTypes.STRING, primaryKey: true },
      Cost_of_living_index: DataTypes.FLOAT,
      Rent_index: DataTypes.FLOAT,
      Groceries_index: DataTypes.FLOAT,
      Restaurant_price_index: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "cost_of_living",
      underscored: true,
    }
  );
  return cost_of_living;
};
