const { Op, Sequelize } = require("sequelize");
const { questions, saved_questions } = require("./models");
const models = require(`./models`);
let question;

//checking the kind of the type 1,3 questions (max/min).
const checkIncludesText = (question) => {
  const maxWords = ["highest", "higher", "most", "largest", "more", "larger"];
  return maxWords.some((word) => question.includes(word));
};

//function for handling the type 1 questions.
const type1 = (countries, { question, column }) => {
  const currentQuestion = { question: "", options: [], answer: "" };
  const isMax = checkIncludesText(question);
  const noDashColumn = column.replace(/\_/g, " ");
  currentQuestion.question = question;
  countries.map((country) => currentQuestion.options.push(country.Country));
  countries.sort((a, b) => b[column] - a[column]);
  isMax
    ? (answer =
        "In " +
        countries[0].Country +
        " the " +
        noDashColumn +
        " is: " +
        countries[0][column])
    : (answer =
        "In " +
        countries[3].Country +
        " the " +
        noDashColumn +
        " is: " +
        countries[3][column]);
  currentQuestion.answer = answer;

  return currentQuestion;
};

//function for handling the type 2 questions.
const type2 = (countries, { question, column }) => {
  const currentQuestion = { question: "", options: [], answer: "" };
  const ranAns = Math.floor(Math.random() * 4);
  currentQuestion.question = question + " " + countries[ranAns].Country;
  const answer = countries[ranAns][column];
  countries.map((country) => currentQuestion.options.push(country[column]));
  currentQuestion.answer = answer;

  return currentQuestion;
};

//function for handling the type 3 questions.
const type3 = (countries, { question, column }) => {
  const currentQuestion = { question: "", options: [true, false], answer: "" };
  currentQuestion.question =
    question
      .replace("variable-x", countries[0].Country)
      .replace("variable-y", countries[1].Country) + "?";
  const answer = countries[0][column] > countries[1][column] ? true : false;
  currentQuestion.answer = answer;

  return currentQuestion;
};

// main query for navigating between questions types.
const getQuestion = async () => {
  const result = await questions.findOne({
    order: Sequelize.literal("rand()"),
  });
  const table = models[`${result["table"]}`];
  let countries;
  switch (result.type) {
    case 1:
      countries = await table.findAll({
        order: Sequelize.literal("rand()"),
        limit: 4,
      });
      question = type1(countries, result);
      break;

    case 2:
      countries = await table.findAll({
        order: Sequelize.literal("rand()"),
        group: result.column,
        limit: 4,
      });
      question = type2(countries, result);
      break;

    case 3:
      countries = await table.findAll({
        order: Sequelize.literal("rand()"),
        limit: 2,
      });
      question = type3(countries, result);
      break;
  }

  return question;
};

//Function for saving a new rated question
const saveQuestion = (rate, question) => {
  saved_questions
    .create({
      question: question.question,
      option_1: question.options[0],
      option_2: question.options[1],
      option_3: question.options[2],
      option_4: question.options[3],
      answer: question.answer,
      rate: rate,
      amount_of_times_rated: 1,
      created_at: new Date().toLocaleDateString(),
      updated_at: new Date().toLocaleDateString(),
    })
    .then((x) => console.log(x.toJSON()));
};

//Function for updating an already rated question
const updateSaveQuestion = (savedQuestion, { question }, rate) => {
  saved_questions
    .update(
      {
        rate:
          (savedQuestion.rate + rate) /
          (savedQuestion.amount_of_times_rated + 1),
        amount_of_times_rated: savedQuestion.amount_of_times_rated + 1,
      },
      { where: { question: question } }
    )
    .then((x) => console.log(x));
};

//Function to distinguish between already rated questions to new rated questions
const handleNewRate = async () => {
  const { rate } = req.body;
  const result = await saved_questions.findOne({
    where: { question: question.question },
  });
  result
    ? updateSaveQuestion(result, question, rate)
    : saveQuestion(rate, question);
};
module.exports = { getQuestion };
console.log(getQuestion().then((res) => res));
