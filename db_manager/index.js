const express = require("express");
const app = express();
const { getQuestion, handleNewRate } = require("./utils");
let currentQuestion;

app.use(express.json());

//Entry point for sending  new questions for the users
app.get("/question", (req, res) => {
  getQuestion()
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
  res
    .status(200)
    .json({ answer: currentQuestion.answer })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error! we have a problem with our server" })
    );
});

//Entry point for updating the users rate to a question
app.post("/update", (req, res) => {
  const { rate } = req.body;
  handleNewRate(rate)
    .then(
      res.status(201).json({ message: "The rate was successfully updated" })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error! we have a problem with our server" })
    );
});

app.listen(3000, () => console.log("app listen to port 3000"));
