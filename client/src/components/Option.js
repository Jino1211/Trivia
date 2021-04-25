import React from "react";

export default function Option({ option, setChosenAnswer }) {
  const selectAnswer = (e) => {
    setChosenAnswer(e.target.innerText);
    console.log(e.target.innerText);
  };

  return <div onClick={selectAnswer}>{`${option}`}</div>;
}
