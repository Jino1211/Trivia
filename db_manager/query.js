const { Op, Sequelize } = require("sequelize");
const { questions } = require("./models");
const models = require(`./models`);

//checking the kind of the type 1,3 questions (max/min).
const checkIncludesText = (question) => {
  const maxWords = ["highest", "higher", "most", "largest", "more", "larger"];
  return maxWords.some((word) => question.includes(word));
};

//function for handling the type 1 questions.
const type1 = (countries, { question, column }) => {
  const sendData = { question: "", options: [], answer: "" };
  const isMax = checkIncludesText(question);
  sendData.question = question;
  countries.map((country) => sendData.options.push(country.Country));
  countries.sort((a, b) => b[column] - a[column]);
  isMax
    ? (answer =
        "In " +
        countries[0].Country +
        " the " +
        column +
        " is: " +
        countries[0][column])
    : (answer =
        "In " +
        countries[3].Country +
        " the " +
        column +
        " is: " +
        countries[3][column]);
  sendData.answer = answer;

  console.log(sendData);
};

//function for handling the type 2 questions.
const type2 = (countries, { question, column }) => {
  const sendData = { question: "", options: [], answer: "" };
  const ranAns = Math.floor(Math.random() * 4);
  sendData.question = question + " " + countries[ranAns].Country;
  const answer = countries[ranAns][column];
  countries.map((country) => sendData.options.push(country[column]));
  sendData.answer = answer;

  console.log(sendData);
};

//function for handling the type 3 questions.
const type3 = (countries, { question, column }) => {
  const sendData = { question: "", options: [true, false], answer: "" };
  sendData.question =
    question
      .replace("variable-x", countries[0].Country)
      .replace("variable-y", countries[1].Country) + "?";
  const answer = countries[0][column] > countries[1][column] ? true : false;
  sendData.answer = answer;
  console.log(sendData);
};

// main query for navigating between questions types.
questions.findOne({ order: Sequelize.literal("rand()") }).then((result) => {
  const table = models[`${result["table"]}`];

  switch (result.type) {
    case 1:
      table
        .findAll({ order: Sequelize.literal("rand()"), limit: 4 })
        .then((countries) => {
          type1(countries, result);
        });
      break;
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
      break;

    case 3:
      table
        .findAll({
          order: Sequelize.literal("rand()"),
          limit: 2,
        })
        .then((countries) => {
          type3(countries, result);
        });
  }
});
