import React from "react";
import { Link } from "react-router-dom";
import { FormControlLabel, RadioGroup, Radio } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

export default function Home({
  logOut,
  setActive,
  setTimer,
  setDifficulty,
  difficulty,
  user,
}) {
  const BlueRadio = withStyles({
    root: {
      color: blue[400],
      "&$checked": {
        color: blue[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const prepareGame = () => {
    if (!difficulty) {
      return alert("Must choose difficulty");
    }
    setTimer(20);
    setActive(true);
  };

  return (
    <div className="home">
      <h1 className="welcome-title">Hello {user.name}</h1>
      <div className="start-game-panel">
        <div className="radios-difficulty">
          <p className="p-difficulty">Choose Difficultly:</p>
          <RadioGroup name="difficulty" className="radios-difficulty" row>
            <FormControlLabel
              control={<BlueRadio />}
              label="Easy"
              value="easy"
              onChange={(e) => {
                setDifficulty(e.target.value);
                console.log(e.target.value);
              }}
            />
            <FormControlLabel
              control={<BlueRadio />}
              label="Hard"
              value="hard"
              onChange={(e) => {
                setDifficulty(e.target.value);
                console.log(e.target.value);
              }}
            />
          </RadioGroup>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={prepareGame}
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}
