"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("saved_questions", "rates_multiply_points", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("saved_questions", "points_per_player", {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "saved_questions",
      "rates_multiply_points"
    );
    await queryInterface.removeColumn("saved_questions", "points_per_player");
  },
};
