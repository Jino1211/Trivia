import React from "react";
import { Link } from "react-router-dom";

export default function PlayersSummery({ userAchievement }) {
  // console.log(userAchievement);
  return (
    <div>
      <h1>Achievement</h1>
      <div>user: {userAchievement.user}</div>
      <div>score: {Math.floor(userAchievement.score)}</div>
      <div>difficulty: {userAchievement.difficulty}</div>
      <Link to="/createuser">New game</Link>
      <Link to="/scoreboard">Score Board</Link>
    </div>
  );
}
