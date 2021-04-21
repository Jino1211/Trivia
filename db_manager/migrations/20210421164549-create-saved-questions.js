'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('saved_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      str_quetion: {
        type: Sequelize.STRING
      },
      option_1: {
        type: Sequelize.STRING
      },
      option_2: {
        type: Sequelize.STRING
      },
      option_3: {
        type: Sequelize.STRING
      },
      option_4: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      rate: {
        type: Sequelize.FLOAT
      },
      amount_of_time: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('saved_questions');
  }
};