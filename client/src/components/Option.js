import React from "react";

export default function Option({ option, setChosenAnswer }) {
  const selectAnswer = (e) => {
    setChosenAnswer(e);
  };

  return <div onClick={selectAnswer}>{`${option}`}</div>;
}
