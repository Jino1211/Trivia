"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cost_of_livings", {
      Country: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Cost_of_living_index: {
        type: Sequelize.FLOAT,
      },
      Rent_index: {
        type: Sequelize.FLOAT,
      },
      Groceries_index: {
        type: Sequelize.FLOAT,
      },
      Restaurant_price_index: {
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
    await queryInterface.dropTable("cost_of_livings");
  },
};
