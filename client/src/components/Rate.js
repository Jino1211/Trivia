import React from "react";
import { Rating } from "@material-ui/lab";

export default function Rate({
  rating,
  setRating,
  updateRate,
  getQuestion,
  setOpenRating,
}) {
  return (
    <div>
      <button onClick={getQuestion}> Next </button>
      <Rating
        name="hover-feedback"
        value={rating}
        precision={1}
        onChange={(event, newRating) => {
          setRating(newRating);
          updateRate(newRating);
        }}
      />
    </div>
  );
}
