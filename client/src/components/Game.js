import React, { useState, useEffect } from "react";
import Options from "./Options";
import CreateUser from "./CreateUser";
import GameSummery from "./GameSummery";
import axios from "axios";
import RatingPanel from "./RatingPanel";
import { LinearProgress } from "@material-ui/core";
import { Redirect } from "react-router";

export default function Game() {
  const [user, setUser] = useState();
  const [question, setQuestion] = useState();
  const [chosenAnswer, setChosenAnswer] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [isRight, setIsRight] = useState();
  const [score, setScore] = useState(0);
  const [reduceTimer, setReduceTimer] = useState(20);
  const [timer, setTimer] = useState(reduceTimer);
  const [progress, setProgress] = useState(100);
  const [lives, setLives] = useState(3);
  const [isDone, setIsDone] = useState("/game");

  /////
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) {
        clearInterval(interval);
        setLives((prev) => prev - 1);
        setCorrectAnswer(true);
      } else {
        setTimer((prev) => prev - 0.5);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [timer, reduceTimer]);

  /////
  // useEffect(() => {
  //   setProgress((prev) => prev - 100 / (reduceTimer * 2));
  // }, [timer]);

  const setChosen = async (e) => {
    try {
      const { data } = await axios.get("/answer");
      const chosen = e.target.innerText;
      const correct = data.answer;
      setChosenAnswer(chosen);
      setCorrectAnswer(correct);
      compareAnswers(chosen, correct);
      setTimer("");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getQuestion();
  }, [user]);

  const compareAnswers = (chosen, correct) => {
    setIsRight(chosen === `${correct}`);
    console.log(chosen);
    console.log(typeof chosen);

    console.log(correct);
    console.log(chosen === `${correct}`);

    if (chosen === `${correct}`) {
      const currentScore = (1 - (reduceTimer - timer) / reduceTimer) * 70 + 30;
      setScore((score) => score + currentScore);
    } else {
      setLives((prev) => prev - 1);
      console.log(lives);
    }
  };
  const finishGame = async () => {
    try {
      const done = await axios.post("/finish", { score: score });
      setIsDone("/gamesummery");
      console.log(done);
    } catch (err) {
      console.log(err.message);
    }
  };
  const getQuestion = async () => {
    try {
      const { data } = await axios.get("/question");
      setQuestion(data);
      reduceTimer > 5
        ? setReduceTimer((prev) => prev - 0.5)
        : setReduceTimer(5);
      setTimer(reduceTimer);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {lives === 0 ? (
        <GameSummery user={user} score={score} />
      ) : !user ? (
        <CreateUser setUser={setUser} setTimer={setTimer} />
      ) : correctAnswer ? (
        <RatingPanel
          isRight={isRight}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          getQuestion={getQuestion}
          lives={lives}
          finishGame={finishGame}
        />
      ) : (
        <div>
          <div>lives left : {lives}</div>
          <div>{timer} </div>
          <LinearProgress variant="determinate" value={progress} />
          <div className="question">{question.question}</div>
          <Options options={question.options} setChosenAnswer={setChosen} />
          <div className="total-score">{Math.floor(score)}</div>
        </div>
      )}
    </div>
  );
}
