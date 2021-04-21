"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class capitals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  capitals.init(
    {
      Country: { type: DataTypes.STRING, primaryKey: true },
      Capital: DataTypes.STRING,
      Continent: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "capitals",
      underscored: true,
    }
  );
  return capitals;
};
