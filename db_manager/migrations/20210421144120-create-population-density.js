"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("population_densities", {
      Rank: {
        type: Sequelize.INTEGER,
      },
      Country_or_dependent_territory: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Area_km2: {
        type: Sequelize.FLOAT,
      },
      Population: {
        type: Sequelize.FLOAT,
      },
      Density_pop_km2: {
        type: Sequelize.FLOAT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("population_densities");
  },
};
