import React, { useEffect, useState } from "react";
import { Rating } from "@material-ui/lab";
import axios from "axios";

export default function RatingPanel({
  isRight,
  correctAnswer,
  setChosenAnswer,
  getQuestion,
}) {
  const [rate, setRate] = useState(0);

  const handleRate = async (newRate) => {
    const rated = await axios.put("/update", { rate: newRate });
    setRate(newRate);
    console.log(rated);
    await getQuestion();

    setChosenAnswer();
  };
  return (
    <div>
      <div>{isRight ? "you were right!" : "fuckall!"}</div>
      <div>{correctAnswer}</div>
      <Rating
        name="hover-feedback"
        value={rate}
        precision={1}
        onChange={(event, newRate) => {
          handleRate(newRate);
        }}
      />
    </div>
  );
}
