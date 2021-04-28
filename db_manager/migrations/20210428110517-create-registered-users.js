"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("registeredUsers", {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      user_name: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("registeredUsers");
  },
};
