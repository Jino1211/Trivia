import "../App.css";
import axios from "axios";
import React, { useState } from "react";

export default function Option({ option }) {
  const [isCorrect, setIsCorrect] = useState();

  const getAnswer = async (e) => {
    let { data } = await axios.get("/answer");
    console.log(data.answer);
    `${data.answer}` === e.target.innerText
      ? setIsCorrect("correct")
      : setIsCorrect("wrong");
    setTimeout(() => {
      setIsCorrect();
    }, 2000);
  };

  return (
    <div
      className={`option ${isCorrect}`}
      onClick={getAnswer}
    >{`${option}`}</div>
  );
}
