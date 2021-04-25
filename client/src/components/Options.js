import "../App.css";
import axios from "axios";
import React, { useState } from "react";

export default function Options({ option, setLives }) {
  const [isCorrect, setIsCorrect] = useState();

  //Function for coloring the clicked answer by wrong/right and updating the lives accordingly
  const getAnswer = async (e) => {
    try {
      let { data } = await axios.get("/answer");
      if (e.target.innerText === `${data.answer}`) {
        setIsCorrect("correct");
      } else {
        setIsCorrect("wrong");
        setLives((lives) => lives - 1);
      }
      setTimeout(() => {
        setIsCorrect();
      }, 1000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      onClick={getAnswer}
      className={`option ${isCorrect}`}
    >{`${option}`}</div>
  );
}
