"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class age_structure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  age_structure.init(
    {
      Country: { type: DataTypes.STRING, primaryKey: true },
      Age_0_to_14_years: DataTypes.FLOAT,
      Age_15_to_64_years: DataTypes.FLOAT,
      Age_above_65_years: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "age_structure",
      underscored: true,
    }
  );
  return age_structure;
};
