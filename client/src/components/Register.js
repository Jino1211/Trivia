import axios from "axios";
import React, { useRef } from "react";

export default function Register({ setHaveAccount }) {
  const email = useRef();
  const username = useRef();
  const password = useRef();

  const signUp = async () => {
    if (
      email.current.value !== "" &&
      username.current.value !== "" &&
      email.current.value !== ""
    ) {
      const user = {
        email: email.current.value,
        userName: username.current.value,
        password: password.current.value,
      };
      await axios.post("/users/register", user);
      setHaveAccount(true);
    } else {
      alert(
        "You can't register without inserting an email, username and a password"
      );
    }
  };

  return (
    <div>
      <input className="new-mail-input" ref={email} required></input>
      <input className="new-name-input" ref={username} required></input>
      <input className="new-pass-input" ref={password} required></input>
      <button onClick={signUp}>Sign up!</button>
    </div>
  );
}
