import React from "react";
import Game from "./Game";

export default function Home() {
  return (
    <div>
      <h1>Welcome to trivia!</h1>
      <button>Start New Game!</button>
      <button>Go to Winners board</button>
      <Game />
    </div>
  );
}
