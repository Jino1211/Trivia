import React, { useEffect, useState } from "react";
import Question from "./Question";
import Timer from "./Timer";

// import  from "react";
import axios from "axios";

export default function Game() {
  const [question, setQuestion] = useState("");
  const getQuestion = async () => {
    const dbQuestion = await axios.get("/question");
    setQuestion(dbQuestion.data);
  };
  useEffect(() => {
    getQuestion();
  }, []);

  console.log(question);
  return (
    <div>
      <Timer />
      <Question question={question.question} />
      <button onClick={getQuestion}> Next </button>
    </div>
  );
}
