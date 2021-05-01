import axios from "axios";
import React, { useRef } from "react";

export default function Register({}) {
  const registerEmail = useRef();
  const registerUsername = useRef();
  const registerPassword = useRef();

  const signUp = async () => {
    if (
      registerEmail.current.value !== "" &&
      registerUsername.current.value !== "" &&
      registerPassword.current.value !== ""
    ) {
      const user = {
        email: registerEmail.current.value,
        userName: registerUsername.current.value,
        password: registerPassword.current.value,
      };
      await axios.post("/users/register", user);
    } else {
      alert(
        "You can't register without inserting an email, username and a password"
      );
    }
  };
  return (
    <form className="form form-signup">
      <fieldset>
        <legend>
          Please, enter your email, password and password confirmation for sign
          up.
        </legend>
        <div className="input-block">
          <label htmlFor="signup-email">E-mail</label>
          <input id="signup-email" ref={registerEmail} type="email" required />
        </div>
        <div className="input-block">
          <label htmlFor="signup-password">User Name:</label>
          <input ref={registerUsername} required />
        </div>
        <div className="input-block">
          <label htmlFor="signup-password-confirm">password</label>
          <input
            id="signup-password-confirm"
            ref={registerPassword}
            type="password"
            required
          />
        </div>
      </fieldset>
      <button type="submit" className="btn-signup" onClick={signUp}>
        Continue
      </button>
    </form>
  );
}
