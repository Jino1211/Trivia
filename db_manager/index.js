const express = require("express");
const app = express();
const { getQuestion, handleNewRate } = require("./utils");
let currentQuestion;
let numOfQuestion = 0;
const historyOfPlayer = {
  user: "jino",
  difficulty: "hard",
  score: 400,
  playerQuestionsAndRates: [
    {
      question: "What country has the highest percent of litterers?",
      options: ["Palau", "Jersey", "Mozambique", "Nigeria"],
      answer: "In Palau the Literacy percent is: 92",
      rate: 2,
    },
  ],
};
// const historyOfPlayer = {
//   user: "",
//   difficulty: "easy",
//   score: 0,
//   playerQuestionsAndRates: [],
// };

app.use(express.json());

app.post("/createuser", (req, res) => {
  const { user } = req.body;
  const { difficulty } = req.body;

  historyOfPlayer.user = user;
  historyOfPlayer.difficulty = difficulty;
  historyOfPlayer.score = 0;
  historyOfPlayer.playerQuestionsAndRates = [];

  res.status(200).json({ message: "User was successfully created" });
  console.log(historyOfPlayer);
});

//Entry point for sending  new questions for the users
app.get("/question/:difficulty?", (req, res) => {
  const { difficulty } = req.params;
  console.log(difficulty);
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
app.get("/answer", (req, res) => {
  res.status(200).json({ answer: currentQuestion.answer });
});

//Entry point for updating the users rate to a question
app.put("/update", (req, res) => {
  const { rate } = req.body;
  currentQuestion.rate = rate;
  historyOfPlayer.playerQuestionsAndRates.push(currentQuestion);
  historyOfPlayer.score += 100;
  res.status(201).json(historyOfPlayer);
  console.log(historyOfPlayer);
});

app.post("/finish", (req, res) => {
  const promises = [];
  historyOfPlayer.playerQuestionsAndRates.forEach((question) => {
    console.log("promises before push:");
    console.log(promises);

    promises.push(
      handleNewRate(question, historyOfPlayer.difficulty, historyOfPlayer.score)
    );
    console.log("promises after push:");
    console.log(promises);
  });
  console.log("promises:");
  console.log(promises);
  Promise.all(promises)
    .then(() =>
      res
        .status(200)
        .json({ message: "The data of the user was successfully saved" })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error! we have a problem with our server" })
    );
});

app.listen(3000, () => console.log("app listen to port 3000"));
