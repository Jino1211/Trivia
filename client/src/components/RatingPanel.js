import React, { useEffect, useState } from "react";
import { Rating } from "@material-ui/lab";
import axios from "axios";

export default function RatingPanel({
  isRight,
  correctAnswer,
  setChosenAnswer,
  getQuestion,
  lives,
  setCorrectAnswer,
  finishGame,
}) {
  const [rate, setRate] = useState(0);

  const handleRate = async (newRate) => {
    if (newRate) {
      await axios.put("/update", { rate: newRate });
      setRate(newRate);
    }
    if (lives <= 0) {
      finishGame();
    } else {
      await getQuestion();
      setCorrectAnswer();
    }
  };
  return (
    <div>
      <div>{isRight ? "you were right!" : "fuckall!"}</div>
      <div>The correct anser is: {correctAnswer}</div>
      <Rating
        name="hover-feedback"
        value={rate}
        precision={1}
        onChange={(event, newRate) => {
          handleRate(newRate);
        }}
      />
      <div className="skip-btn">
        <button onClick={() => handleRate()}>skip!</button>
      </div>
    </div>
  );
}
