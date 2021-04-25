import React from "react";

export default function GameSummery({ user, score }) {
  return (
    <div>
      <h1>{user.username}</h1>
      <div>
        <h3>{user.difficulty}</h3>
        <h3>{score}</h3>
      </div>
    </div>
  );
}
