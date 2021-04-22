"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class population_density extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  population_density.init(
    {
      Rank: DataTypes.INTEGER,
      Country: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      Area_km2: DataTypes.FLOAT,
      Population: DataTypes.FLOAT,
      Density_pop_km2: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "population_density",
      underscored: true,
    }
  );
  return population_density;
};
