"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class countries_general extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  countries_general.init(
    {
      Country: { type: DataTypes.STRING, primaryKey: true },
      Region: DataTypes.STRING,
      Literacy_percent: DataTypes.FLOAT,
      Phones_per_1000: DataTypes.FLOAT,
      Climate: DataTypes.FLOAT,
      Birthrate: DataTypes.FLOAT,
      Deathrate: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "countries_general",
      underscored: true,
    }
  );
  return countries_general;
};
