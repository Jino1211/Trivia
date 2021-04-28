import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Register from "./Register";

export default function CreateUser({ setUser, setTimer }) {
  const [haveAccount, setHaveAccount] = useState(true);
  const email = useRef();
  const password = useRef();
  const [difficulty, setDifficulty] = useState("");

  const login = () => {
    if (
      email.current.value !== "" &&
      password.current.value !== "" &&
      difficulty !== ""
    ) {
      const user = {
        email: email.current.value,
        password: password.current.value,
        difficulty: difficulty,
      };

      axios
        .post("/users/login", user)
        .then(({ data }) => {
          user.name = data.name;
          setUser(user);
          setTimer(20);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      {haveAccount ? (
        <div>
          {" "}
          <input ref={email} />
          <input ref={password} />
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
          <button className="login-btn" onClick={login}>
            Log in!
          </button>
          <button
            className="create-user-btn"
            onClick={() => {
              setHaveAccount(false);
            }}
          >
            Create user
          </button>{" "}
        </div>
      ) : (
        <Register setHaveAccount={setHaveAccount} />
      )}
    </div>
  );
}
