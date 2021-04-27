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
    <div>
      <div>
        <div>lives left : {lives}</div>
        <div>{timer} </div>
        <LinearProgress variant="determinate" value={progress} />
        <div className="question">{question.question}</div>
        <Options options={question.options} setChosenAnswer={setChosen} />
        <div className="total-score">Total score:{Math.floor(score)}</div>
      </div>
    </div>
  );
}
