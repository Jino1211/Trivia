"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "questions",
      [
        {
          question: "Which country is most populous?",
          type: 1,
          table: "population_density",
          column: "Population",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "Which country is least populous?",
          type: 1,
          table: "population_density",
          column: "Population",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "Which country is the largest by total area?",
          type: 1,
          table: "population_density",
          column: "Area_km2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "Which country is the smallest by total area?",
          type: 1,
          table: "population_density",
          column: "Area_km2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "Which country is the most densely populated?",
          type: 1,
          table: "population_density",
          column: "Density_pop_km2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "Which country is the least densely populated?",
          type: 1,
          table: "population_density",
          column: "Density_pop_km2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "Which country has the most cell phones per person?",
          type: 1,
          table: "countries_general",
          column: "Phones_per_1000",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "What country is the most expensive to live in? ",
          type: 1,
          table: "quality_index",
          column: "Cost_of_living_index",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "What country has the highest percent of litterers?",
          type: 1,
          table: "countries_general",
          column: "Literacy_percent",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "What is the size of ",
          type: 2,
          table: "population_density",
          column: "Area_km2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "how many people live in",
          type: 2,
          table: "population_density",
          column: "Population",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "What is the capital of ",
          type: 2,
          table: "capitals",
          column: "Capital",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "How many people live in ",
          type: 2,
          table: "population_density",
          column: "Population",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "In what continent is ",
          type: 2,
          table: "countries_general",
          column: "Region",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "Are there more people in variable-x than in variable-y",
          type: 3,
          table: "population_density",
          column: "Population",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: "Is variable-x larger than variable-y",
          type: 3,
          table: "population_density",
          column: "Area_km2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question:
            "Does variable-x have a higher population density than variable-y",
          type: 3,
          table: "population_density",
          column: "Density_pop_km2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question:
            "Is the quality of life in variable-x higher than the quality of life in variable-y",
          type: 3,
          table: "quality_index",
          column: "Quality_of_life_index",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question:
            "Is the crime rate of variable-x higher than the crime rate in variable-y",
          type: 3,
          table: "crime_index",
          column: "Crime_index",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question:
            "Are restaurants in variable-x more expensive than restaurants in variable-y",
          type: 3,
          table: "cost_of_living",
          column: "Restaurant_price_index",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("questions", null, {});
  },
};
