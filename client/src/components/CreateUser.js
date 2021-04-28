import React, { useRef, useState } from "react";
import axios from "axios";

export default function CreateUser({ setUser, setTimer }) {
  const username = useRef();
  const [difficulty, setDifficulty] = useState("");

  const createUser = () => {
    if (username.current.value !== "" && difficulty !== "") {
      const user = {
        user: username.current.value,
        difficulty: difficulty,
      };
      setUser(user);
      axios.post("api/createuser", user).then((res) => console.log(res));
      setTimer(20);
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
