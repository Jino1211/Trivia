import axios from "axios";
import React, { useRef } from "react";

export default function Login({ setUser, setTimer }) {
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
    <div className="form form-login">
      <fieldset>
        <legend>Please, enter your email and password for login.</legend>
        <div className="input-block">
          <label htmlFor="login-email">E-mail</label>
          <input id="login-email" ref={email} type="email" required />
        </div>
        <div className="input-block">
          <label htmlFor="login-password">Password</label>
          <input id="login-password" ref={password} type="password" required />
        </div>
      </fieldset>
      <button type="submit" className="btn-login" onClick={login}>
        Login
      </button>
    </div>
  );
}
