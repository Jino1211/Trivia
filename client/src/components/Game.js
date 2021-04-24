import React, { useEffect, useState } from "react";
import Question from "./Question";
import Option from "./Option";
import Timer from "./Timer";

// import  from "react";
import axios from "axios";

export default function Game() {
  const [question, setQuestion] = useState("");
  useEffect(() => {
    getQuestion();
  }, []);
  const getQuestion = async () => {
    const dbQuestion = await axios.get("/question");
    setQuestion(dbQuestion.data);
  };

  console.log(question);
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
      <button onClick={getQuestion}> Next </button>
    </div>
  );
}
