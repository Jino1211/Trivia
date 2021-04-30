import React, { useRef, useState } from "react";
import axios from "axios";
import Register from "./Register";

export default function Login({ setUser, setTimer }) {
  const [haveAccount, setHaveAccount] = useState(true);
  const email = useRef();
  const password = useRef();

  const login = () => {
    if (email.current.value !== "" && password.current.value !== "") {
      const user = {
        email: email.current.value,
        password: password.current.value,
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
    <div className="login-panel">
      {haveAccount ? (
        <div>
          {" "}
          <input ref={email} placeholder="Email" />{" "}
          <input ref={password} placeholder="Password" />
          <button className="login-btn" onClick={login}>
            Log in!
          </button>
          <div className="sign-up-div">
            Don't have an account?{" "}
            <span
              className="create-user-btn"
              onClick={() => {
                setHaveAccount(false);
              }}
            >
              Sign Up
            </span>{" "}
          </div>
        </div>
      ) : (
        <Register setHaveAccount={setHaveAccount} />
      )}
    </div>
  );
}
