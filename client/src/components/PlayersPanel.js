import React from "react";

export default function PlayersPanel({ user }) {
  return (
    <div className="user-panek">
      <div>{user.name}</div>
      <div>{user.score}</div>
      <div>{user.created_at}</div>
    </div>
  );
}
