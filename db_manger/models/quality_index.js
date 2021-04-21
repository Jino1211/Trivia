"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class quality_index extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  quality_index.init(
    {
      Country: { type: DataTypes.STRING, primaryKey: true },
      Quality_of_life_index: DataTypes.FLOAT,
      Purchasing_power_index: DataTypes.FLOAT,
      Safety_index: DataTypes.FLOAT,
      Health_care_index: DataTypes.FLOAT,
      Cost_of_living_index: DataTypes.FLOAT,
      Property_price_to_income_ratio: DataTypes.FLOAT,
      Pollution_index: DataTypes.FLOAT,
      Climate_index: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "quality_index",
      underscored: true,
    }
  );
  return quality_index;
};
