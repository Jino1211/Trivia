import React from "react";
import Button from "@material-ui/core/Button";

export default function Option({ option, setChosenAnswer }) {
  const selectAnswer = (e) => {
    setChosenAnswer(e);
  };

  return (
    <Button
      id="option"
      variant="contained"
      color="primary"
      size="medium"
      onClick={selectAnswer}
    >
      {`${option}`}
    </Button>
  );
}
