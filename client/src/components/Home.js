import React from "react";
import { Link } from "react-router-dom";

export default function Home({
  logOut,
  setActive,
  setTimer,
  setDifficulty,
  difficulty,
}) {
  return (
    <div>
      <button
        onClick={() => {
          if (!difficulty) {
            return alert("fuckall");
          }
          setActive(true);
          setTimer(20);
        }}
      >
        start game
      </button>
      <div>
        <label>
          {" "}
          Easy
          <input
            name="difficulty"
            type="radio"
            value="easy"
            onChange={(e) => {
              setDifficulty(e.target.value);
              console.log(e.target.value);
            }}
            // checked
          />
        </label>
        <label>
          {" "}
          Hard
          <input
            name="difficulty"
            type="radio"
            value="hard"
            onChange={(e) => {
              setDifficulty(e.target.value);
              console.log(e.target.value);
            }}
          />
        </label>
      </div>
      <Link to="/board">board</Link>
      <button onClick={logOut}>log out</button>
    </div>
  );
}
