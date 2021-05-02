import React, { useEffect, useState } from "react";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default function RatingPanel({
  isRight,
  correctAnswer,
  setChosenAnswer,
  getQuestion,
  lives,
  setCorrectAnswer,
  finishGame,
  setLives,
}) {
  const [rate, setRate] = useState(0);

  const handleRate = async (newRate) => {
    if (newRate) {
      await axios.put("api/update", { rate: newRate });
      setRate(newRate);
    }
    if (!isRight) {
      setLives((prev) => prev - 1);
    }
    if (lives <= 0) {
      setCorrectAnswer();
      await finishGame();
    } else {
      await getQuestion();
      setCorrectAnswer();
    }
  };
  return (
    <div>
      <div>{isRight ? "You were right!" : "You are so wrong!"}</div>
      <div>The correct answer is: {correctAnswer}</div>
      <Rating
        name="hover-feedback"
        value={rate}
        precision={1}
        onChange={(event, newRate) => {
          handleRate(newRate);
        }}
      />
      <div className="skip-btn">
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => handleRate()}
        >
          skip!
        </Button>
      </div>
    </div>
  );
}
