import React from "react";

export default function GameSummery({ user, score, difficulty }) {
  return (
    <div class="artboard">
      <div class="card">
        <div class="card__side card__side--back">
          <div class="card__cover">
            <h4 class="card__heading">
              <span class="card__heading-span">Game Summery</span>
            </h4>
          </div>
          <div class="card__details">
            <ul>
              <li>User: {user.name}</li>
              <li>Difficulty: {difficulty}</li>
              <li>Score: {Math.floor(score)}</li>
            </ul>
          </div>
        </div>

        <div class="card__side card__side--front">
          <div class="card__theme">
            <div class="card__theme-box">
              <p class="card__subject">{user.name}</p>
              <p class="card__title">Game Over!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
