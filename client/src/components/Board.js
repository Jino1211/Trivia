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
    <section>
      <h1>Winners Board</h1>
      <div className="tbl-header">
        <table cellPadding={0} cellSpacing={0} border={0}>
          <thead>
            <tr>
              <th className="users-column">User</th>
              <th className="score-column">Score</th>
              <th className="date-column">Date</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding={0} cellSpacing={0} border={0}>
          <tbody>
            {scoreBoard?.map((user, i) => (
              <UserPanel key={`user-${i}`} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
