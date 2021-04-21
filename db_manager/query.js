const { Op, Sequelize } = require("sequelize");
const { questions } = require("./models");
const models = require(`./models`);

// questions.findOne({ order: Sequelize.literal("rand()") }).then((result) => {
questions
  .findOne({ order: [["id", "desc"]], where: { type: 1 } })
  .then((result) => {
    const table = models[`${result["table"]}`];
    console.log(
      "question: " +
        result["question"] +
        " " +
        result["table"] +
        " " +
        result["column"]
    );
    switch (result["type"]) {
      case 1:
        table
          .findAll({ order: Sequelize.literal("rand()"), limit: 4 })
          .then((countries) => {
            const options = [];
            countries.map((country) => options.push(country.Country));
            countries.sort((a, b) => a.Literacy_percent - b.Literacy_percent);
            console.log(countries);
            console.log(options);
          });
      case 2:

      case 3:
    }
    table
      .findOne({ order: Sequelize.literal("rand()") })
      .then((res) => console.log(res.toJSON()));
  });
