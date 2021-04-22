const { Op, Sequelize } = require("sequelize");
const { questions } = require("./models");
const models = require(`./models`);

//checking the kind of the type one question (max/min).
const checkIncludesText = (question) => {
  const maxWords = ["highest", "most", "largest"];
  return maxWords.some((word) => question.includes(word));
};

//function for handling the type 1 questions.
const type1 = (countries, { question, column }) => {
  const sendData = { question: "", options: [] };
  const isMax = checkIncludesText(question);
  sendData.question = question;
  countries.map((country) => sendData.options.push(country.Country));
  countries.sort((a, b) => b[column] - a[column]);
  isMax
    ? (savedAnswer = countries[0].toJSON())
    : (savedAnswer = countries[3].toJSON());
  console.log(sendData);
  console.log(isMax);
  console.log(savedAnswer);
};

const type2 = (countries, { question, column }) => {
  const countryArr = [...countries];
  const sendData = { question: "", options: [] };
  const ranAns = Math.floor(Math.random() * 4);
  sendData.question = question + " " + countryArr[ranAns].Country;
  const answer = countryArr[ranAns][column];
  countries.map((country) => sendData.options.push(country[column]));
  console.log(sendData);
};

// main query for navigating between questions types.
questions
  .findOne({ order: Sequelize.literal("rand()"), where: { type: 2 } })
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
    switch (result.type) {
      case 1:
        table
          .findAll({ order: Sequelize.literal("rand()"), limit: 4 })
          .then((countries) => {
            type1(countries, result);
          });
      case 2:
        table
          .findAll({
            order: Sequelize.literal("rand()"),
            group: result.column,
            limit: 4,
          })
          .then((countries) => {
            type2(countries, result);
          });

      case 3:
    }
  });
