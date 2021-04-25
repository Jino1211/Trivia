import React, { useRef, useState } from "react";
import axios from "axios";

export default function CreateUser({ setUser }) {
  const username = useRef();
  const [difficulty, setDifficulty] = useState("");

  const createUser = () => {
    if (username.current.value !== "" && difficulty !== "") {
      const user = {
        username: username.current.value,
        difficulty: difficulty,
      };
      setUser(user);
      axios.post("/createuser", user).then((res) => console.log(res));
    }
  };
  return (
    <div>
      <input ref={username} />
      <div className="diff-buttons">
        <button
          className="difficulty-button"
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </button>
        <button
          className="difficulty-button"
          onClick={() => setDifficulty("hard")}
        >
          Hard
        </button>
      </div>
      <button className="create-user-btn" onClick={createUser}>
        Create User!
      </button>
    </div>
  );
}
