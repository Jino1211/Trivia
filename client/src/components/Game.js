import React, { useEffect, useState } from "react";
import Question from "./Question";
import Option from "./Option";
import Timer from "./Timer";
import { LinearProgress } from "@material-ui/core";

import { Rating } from "@material-ui/lab";

import axios from "axios";

export default function Game() {
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(5);
  const [reduceTimer, setReduceTimer] = useState(20);
  const [timer, setTimer] = useState(reduceTimer);

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      timer === 0 ? clearInterval(interval) : setTimer((prev) => prev - 0.5);
    }, 500);
    return () => clearInterval(interval);
  }, [timer, question]);

  const getQuestion = async () => {
    const dbQuestion = await axios.get("/question");
    setQuestion(dbQuestion.data);
    reduceTimer > 5 ? setReduceTimer((prev) => prev - 0.5) : setReduceTimer(5);
    setTimer(reduceTimer);
  };

  return (
    <div>
      {timer}
      <LinearProgress variant="determinate" value={timer} />
      {question && (
        <>
          <Question question={question.question} />
          {question.options.map((option, i) => (
            <Option key={`option-${i}`} option={option} />
          ))}
        </>
      )}
      <Rating
        name="hover-feedback"
        value={rating}
        precision={1}
        onChange={(event, newRating) => {
          setRating(newRating);
          console.log(newRating);
          getQuestion();
        }}
      />
      <button onClick={getQuestion}> Next </button>
    </div>
  );
}
