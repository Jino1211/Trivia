import React, { useState, useEffect } from "react";
import Options from "./Options";
import CreateUser from "./CreateUser";
import axios from "axios";
import RatingPanel from "./RatingPanel";
import { LinearProgress } from "@material-ui/core";

export default function Game() {
  const [user, setUser] = useState();
  const [question, setQuestion] = useState();
  const [chosenAnswer, setChosenAnswer] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [isRight, setIsRight] = useState();
  const [score, setScore] = useState(0);
  const [reduceTimer, setReduceTimer] = useState(20);
  const [timer, setTimer] = useState(reduceTimer);

  /////
  useEffect(() => {
    const interval = setInterval(() => {
      timer === 0 ? clearInterval(interval) : setTimer((prev) => prev - 0.5);
    }, 500);
    return () => clearInterval(interval);
  }, [timer, reduceTimer]);

  /////

  useEffect(async () => {
    try {
      const { data } = await axios.get("/answer");
      setCorrectAnswer(data.answer);
      compareAnswers();
    } catch (err) {
      console.log(err.message);
    }
  }, [chosenAnswer]);

  useEffect(() => {
    getQuestion();
  }, [user]);

  const compareAnswers = () => {
    setIsRight(chosenAnswer === `${correctAnswer}`);
    if (chosenAnswer === `${correctAnswer}`) {
      const currentScore = (1 - (reduceTimer - timer) / reduceTimer) * 70 + 30;
      setScore((score) => score + currentScore);
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
      {!user ? (
        <CreateUser setUser={setUser} setTimer={setTimer} />
      ) : chosenAnswer ? (
        <RatingPanel
          isRight={isRight}
          correctAnswer={correctAnswer}
          setChosenAnswer={setChosenAnswer}
          getQuestion={getQuestion}
          setReduceTimer={setReduceTimer}
        />
      ) : (
        <div>
          <div>{timer} </div>
          <LinearProgress variant="determinate" value={timer} />
          <div className="question">{question.question}</div>
          <Options
            options={question.options}
            setChosenAnswer={setChosenAnswer}
          />
          {/* <button className="submit-answer">Submit Answer!</button> */}
          <div className="total-score">{score}</div>
        </div>
      )}
    </div>
  );
}
