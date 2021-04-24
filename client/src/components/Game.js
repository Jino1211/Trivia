import React, { useEffect, useState } from "react";
import Question from "./Question";
import Option from "./Option";
import Timer from "./Timer";

import { Rating } from "@material-ui/lab";

import axios from "axios";

export default function Game() {
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    getQuestion();
  }, []);
  const getQuestion = async () => {
    const dbQuestion = await axios.get("/question");
    setQuestion(dbQuestion.data);
  };

  return (
    <div>
      <Timer />
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
