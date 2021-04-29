const { Router } = require("express");

// const { validToken } = require("./users");
const api = Router();

const {
  getQuestion,
  handleNewRate,
  saveUser,
  generateWeightedSavedQuestionArr,
  getScoreBoard,
  validToken,
} = require("./utils");
let currentQuestion;
let numOfQuestion = 0;
const historyOfPlayer = {
  user: "",
  difficulty: "",
  score: 0,
  playerQuestionsAndRates: [],
};

api.use(validToken);
//Entry point for sending  new questions for the users
api.get("/question", (req, res) => {
  const { difficulty } = historyOfPlayer;
  numOfQuestion += 1;
  let third = numOfQuestion % 3 === 0 ? true : false;
  getQuestion(third, difficulty)
    .then((result) => {
      currentQuestion = result;
      res.status(200).json({
        question: result.question,
        options: result.options,
      });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error! we have a problem with our server" })
    );
});

//Entry point for sending the correct answer
api.get("/answer", (req, res) => {
  res.status(200).json({ answer: currentQuestion.answer });
});

//Entry point for updating the users rate to a question
api.put("/update", (req, res) => {
  const { rate } = req.body;
  currentQuestion.rate = rate;
  historyOfPlayer.playerQuestionsAndRates.push(currentQuestion);
  res.status(201).end();
});

//Entry point for saving the users data when he finished a game
api.post("/finish", (req, res) => {
  historyOfPlayer.score = req.body.score;
  const promises = [];
  promises.push(saveUser(historyOfPlayer));
  historyOfPlayer.playerQuestionsAndRates.forEach((question) => {
    if (question.rate) {
      promises.push(
        handleNewRate(
          question,
          historyOfPlayer.difficulty,
          historyOfPlayer.score
        )
      );
    }
  });
  Promise.all(promises)
    .then(() =>
      res.status(200).json({
        user: historyOfPlayer.user,
        score: historyOfPlayer.score,
        difficulty: historyOfPlayer.difficulty,
      })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error! we have a problem with our server" })
    );
});

api.get("/scoreboard", async (req, res) => {
  const scoreBoard = await getScoreBoard();

  res.status(200).json(scoreBoard);
});

module.exports = { api, historyOfPlayer };
