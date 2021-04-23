const { Op, Sequelize } = require("sequelize");
const { questions, saved_questions, users } = require("./models");
const models = require(`./models`);
let question;
const history = [];
const questionsDuplicateByWeight = [];

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

//function for handling the saved questions.
const typeSaved = (saved) => {
  const currentQuestion = { question: "", options: [], answer: "" };

  currentQuestion.question = saved.question;
  currentQuestion.options = saved.option_3
    ? [saved.option_1, saved.option_2, saved.option_3, saved.option_4]
    : saved.option_1 === "0"
    ? [false, true]
    : [true, false];
  currentQuestion.answer = saved.answer;
  return currentQuestion;
};

//check if the current question was already displayed to the client
const isInHistory = () => {
  let bool = false;
  history.forEach((ques) => {
    if (ques.question === question.question && ques.answer === question.answer)
      bool = true;
  });
  return bool;
};

//Function for handling easy questions by their type.
const handleEasyTypes = async (result, table) => {
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
};

//Function for handling hard questions by their type
const handleDifficultTypes = async (result, table) => {
  let countries;
  const length = (await table.count({})) - 4;
  const randomRow = Math.floor(Math.random() * length);
  const shuffle = (array) =>
    array.sort(() => {
      return 0.5 - Math.random();
    });
  switch (result.type) {
    case 1:
      countries = await table.findAll({
        order: [[result.column]],
        limit: [randomRow, 4],
      });
      countries = shuffle(countries);
      question = type1(countries, result);
      break;

    case 2:
      countries = await table.findAll({
        order: [[result.column]],
        group: result.column,
        limit: [randomRow, 4],
      });
      countries = shuffle(countries);
      question = type2(countries, result);
      break;

    case 3:
      countries = await table.findAll({
        order: [[result.column]],
        limit: [randomRow, 2],
      });
      countries = shuffle(countries);
      question = type3(countries, result);
      break;
  }
};

// main query for navigating between questions types.
const getQuestion = async (third, difficulty) => {
  if (third) {
    question = typeSaved(getFromWeightedArr());
  } else {
    const result = await questions.findOne({
      order: Sequelize.literal("rand()"),
    });
    const table = models[`${result["table"]}`];

    difficulty === "hard"
      ? await handleDifficultTypes(result, table)
      : await handleEasyTypes(result, table);
  }
  if (isInHistory()) getQuestion();
  history.push(question);
  return question;
};

//Function for saving a new rated question.
const saveNewQuestion = (usersQuestion, difficulty, score) => {
  saved_questions
    .create({
      question: usersQuestion.question,
      option_1: usersQuestion.options[0],
      option_2: usersQuestion.options[1],
      option_3: usersQuestion.options[2],
      option_4: usersQuestion.options[3],
      answer: usersQuestion.answer,
      rates_multiply_points: score * usersQuestion.rate,
      points_per_player: score,
      rate: usersQuestion.rate,
      amount_of_times_rated: 1,
      difficulty: difficulty,
      created_at: new Date().toLocaleDateString(),
      updated_at: new Date().toLocaleDateString(),
    })
    .then((x) => console.log(x.toJSON()));
  console.log("finish save New Question ");
};

//Function for updating an already rated question.
const updateSavedQuestion = (result, usersQuestion, score) => {
  saved_questions
    .update(
      {
        rates_multiply_points:
          result.rates_multiply_points + score * usersQuestion.rate,
        points_per_player: result.points_per_player + score,
        rate:
          (result.rates_multiply_points + score * usersQuestion.rate) /
          (result.points_per_player + score),
        amount_of_times_rated: result.amount_of_times_rated + 1,
      },
      { where: { question: usersQuestion.question } }
    )
    .then((x) => console.log(x));
};

//Function to distinguish between already rated questions to new rated questions.
const handleNewRate = async (usersQuestion, difficulty, score) => {
  const result = await saved_questions.findOne({
    where: { question: usersQuestion.question },
  });
  result
    ? updateSavedQuestion(result, usersQuestion, score)
    : saveNewQuestion(usersQuestion, difficulty, score);
};

//Function to save user and there score in the database.
const saveUser = ({ user, score }) => {
  users
    .create({
      name: user,
      score: score,
    })
    .then((x) => console.log(x));
};

//Function for generating an array of saved questions,with frequency based on their rate.
const generateWeightedSavedQuestionArr = async () => {
  const savedQuestions = await saved_questions.findAll({});
  let totalRate = 0;
  savedQuestions.map((question) => (totalRate += question.rate));
  savedQuestions.map(
    (question) =>
      (question.weight = Math.floor((question.rate / totalRate) * 100))
  );
  savedQuestions.forEach((question) => {
    for (let i = 0; i < question.weight; i++) {
      questionsDuplicateByWeight.push(question);
    }
  });
};

//Function for getting a random question from the weighted array.
const getFromWeightedArr = () => {
  const randomQuestion = Math.floor(
    Math.random() * questionsDuplicateByWeight.length
  );

  console.log(questionsDuplicateByWeight[randomQuestion].toJSON());
  return questionsDuplicateByWeight[randomQuestion];
};

module.exports = {
  getQuestion,
  handleNewRate,
  saveUser,
  generateWeightedSavedQuestionArr,
};
