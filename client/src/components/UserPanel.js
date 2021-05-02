import React from "react";

export default function UserPanel({ user }) {
  return (
    <tr className="user-panel">
      <td className="user-name">{user.name}</td>
      <td className="user-score">{user.score}</td>
      <td className="user-difficulty">{user.created_at.slice(0, 10)} </td>
    </tr>
  );
}
