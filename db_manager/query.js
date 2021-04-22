const { Op, Sequelize } = require("sequelize");
const { questions, saved_questions } = require("./models");
const models = require(`./models`);
let currentQuestion = {};

//checking the kind of the type 1,3 questions (max/min).
const checkIncludesText = (question) => {
  const maxWords = ["highest", "higher", "most", "largest", "more", "larger"];
  return maxWords.some((word) => question.includes(word));
};

//function for handling the type 1 questions.
const type1 = (countries, { question, column }) => {
  currentQuestion = { question: "", options: [], answer: "" };
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

  console.log(currentQuestion);
};

//function for handling the type 2 questions.
const type2 = (countries, { question, column }) => {
  currentQuestion = { question: "", options: [], answer: "" };
  const ranAns = Math.floor(Math.random() * 4);
  currentQuestion.question = question + " " + countries[ranAns].Country;
  const answer = countries[ranAns][column];
  countries.map((country) => currentQuestion.options.push(country[column]));
  currentQuestion.answer = answer;

  console.log(currentQuestion);
};

//function for handling the type 3 questions.
const type3 = (countries, { question, column }) => {
  currentQuestion = { question: "", options: [true, false], answer: "" };
  currentQuestion.question =
    question
      .replace("variable-x", countries[0].Country)
      .replace("variable-y", countries[1].Country) + "?";
  const answer = countries[0][column] > countries[1][column] ? true : false;
  currentQuestion.answer = answer;

  console.log(currentQuestion);
};

// main query for navigating between questions types.
questions
  .findOne({ order: Sequelize.literal("rand()"), where: { type: 1 } })
  .then((result) => {
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

//Function for saving a new rated question
const saveQuestion = (rate, currentQuestion) => {
  saved_questions
    .create({
      question: currentQuestion.question,
      option_1: currentQuestion.options[0],
      option_2: currentQuestion.options[1],
      option_3: currentQuestion.options[2],
      option_4: currentQuestion.options[3],
      answer: currentQuestion.answer,
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
    where: { question: currentQuestion.question },
  });
  result
    ? updateSaveQuestion(result, currentQuestion, rate)
    : saveQuestion(rate, currentQuestion);
};
