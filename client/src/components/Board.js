import axios from "axios";
import React, { useEffect, useState } from "react";
import UserPanel from "./UserPanel";

export default function Board() {
  const [scoreBoard, setScoreBoard] = useState();
  useEffect(async () => {
    const updatedScoreBoard = await axios.get("api/scoreboard");
    setScoreBoard(updatedScoreBoard.data);
  }, []);

  return (
    <table className="board-table">
      <thead>
        <tr>
          <th className="users-column">User</th>
          <th className="score-column">Score</th>
          <th className="date-column">Date</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {scoreBoard?.map((user, i) => (
          <UserPanel key={`user-${i}`} user={user} />
        ))}
      </tbody>
    </table>
  );
}
