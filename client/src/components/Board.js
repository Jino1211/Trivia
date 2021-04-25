import React from "react";
import UserPanel from "./UserPanel";

export default function Board({ users }) {
  return (
    <div>
      {users.map((user, i) => (
        <UserPanel key={`user-${i}`} user={user} />
      ))}
    </div>
  );
}
