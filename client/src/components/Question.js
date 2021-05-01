import React from "react";
import { LinearProgress } from "@material-ui/core";
import Options from "./Options";

export default function Play({
  lives,
  timer,
  progress,
  question,
  setChosen,
  score,
}) {
  return (
    <div className="question-container">
      <div className="lives">lives left : {lives}</div>
      <div className="total-score">Total score:{Math.floor(score)}</div>
      <div className="timer">{timer} </div>
      <LinearProgress id="time-line" variant="determinate" value={progress} />
      <div className="question">{question.question}</div>
      <Options options={question.options} setChosenAnswer={setChosen} />
    </div>
  );
}
