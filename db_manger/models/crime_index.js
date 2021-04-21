"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class crime_index extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  crime_index.init(
    {
      Country: { type: DataTypes.STRING, primaryKey: true },
      Crime_index: DataTypes.FLOAT,
      Safety_index: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "crime_index",
      underscored: true,
    }
  );
  return crime_index;
};
