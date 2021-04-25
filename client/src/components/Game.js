import React, { useEffect, useState } from "react";
import Question from "./Question";
import Options from "./Options";
import Timer from "./Timer";
import { LinearProgress } from "@material-ui/core";

import { Rating } from "@material-ui/lab";

import axios from "axios";

export default function Game() {
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [reduceTimer, setReduceTimer] = useState(20);
  const [timer, setTimer] = useState(reduceTimer);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  //Finishes the game when players lives ends
  useEffect(() => {
    if (lives === 0)
      axios
        .post("/finish", { score: score })
        .then((res) => console.log("status" + res.status))
        .catch((err) => console.log(err.message));
  }, [lives]);

  //pulls a new question for players in game's start
  useEffect(() => {
    getQuestion();
  }, []);

  //Resets timer total length on each half second
  useEffect(() => {
    const interval = setInterval(() => {
      timer === 0 ? clearInterval(interval) : setTimer((prev) => prev - 0.5);
    }, 500);
    return () => clearInterval(interval);
  }, [timer, question]);

  //Updating the rate of a question in the db on every players rate, and pulling new question
  const updateRate = async (newRating) => {
    try {
      const update = await axios.put("/update", { rate: newRating });
    } catch (err) {
      console.log(err.message);
    }
    getQuestion();
  };

  //Function for reCalculating the players current score
  const calculateScore = () => {
    const currentScore = (1 - (reduceTimer - timer) / reduceTimer) * 70 + 30;
    setScore((score) => score + currentScore);
  };

  //Function for pulling a new question and reSetting the reduce timer
  const getQuestion = async () => {
    try {
      const dbQuestion = await axios.get("/question");
      setQuestion(dbQuestion.data);
      reduceTimer > 5
        ? setReduceTimer((prev) => prev - 0.5)
        : setReduceTimer(5);
      setTimer(reduceTimer);
      calculateScore();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {timer}
      <LinearProgress variant="determinate" value={timer} />
      {question && (
        <>
          <Question question={question.question} />
          {question.options.map((option, i) => (
            <Options key={`option-${i}`} option={option} setLives={setLives} />
          ))}
        </>
      )}
      <Rating
        name="hover-feedback"
        value={rating}
        precision={1}
        onChange={(event, newRating) => {
          setRating(newRating);
          updateRate(newRating);
        }}
      />

      <button onClick={getQuestion}> Next </button>
    </div>
  );
}
