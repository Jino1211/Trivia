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
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>

      {scoreBoard?.map((user, i) => (
        <UserPanel key={`user-${i}`} user={user} />
      ))}
    </table>
  );
}
