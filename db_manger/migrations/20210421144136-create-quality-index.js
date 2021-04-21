"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("quality_indices", {
      Country: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Quality_of_life_index: {
        type: Sequelize.FLOAT,
      },
      Purchasing_power_index: {
        type: Sequelize.FLOAT,
      },
      Safety_index: {
        type: Sequelize.FLOAT,
      },
      Health_care_index: {
        type: Sequelize.FLOAT,
      },
      Cost_of_living_index: {
        type: Sequelize.FLOAT,
      },
      Property_price_to_income_ratio: {
        type: Sequelize.FLOAT,
      },
      Pollution_index: {
        type: Sequelize.FLOAT,
      },
      Climate_index: {
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
    await queryInterface.dropTable("quality_indices");
  },
};
