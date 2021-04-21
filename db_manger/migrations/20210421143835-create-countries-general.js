"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("countries_generals", {
      Country: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Region: {
        type: Sequelize.STRING,
      },
      Literacy_percent: {
        type: Sequelize.FLOAT,
      },
      Phones_per_1000: {
        type: Sequelize.FLOAT,
      },
      Climate: {
        type: Sequelize.FLOAT,
      },
      Birthrate: {
        type: Sequelize.FLOAT,
      },
      Deathrate: {
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
    await queryInterface.dropTable("countries_generals");
  },
};
