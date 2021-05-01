import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

export default function LandingPage({ setUser, setTimer }) {
  const [activeLogin, setActiveLogin] = useState("is-active");
  const [activeRegister, setActiveRegister] = useState();

  const switchToSignup = () => {
    setActiveLogin("is-active");
    setActiveRegister();
  };
  const switchToRegister = () => {
    setActiveLogin();
    setActiveRegister("is-active");
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Trivia Game</h1>
      <div className="forms">
        <div className={`form-wrapper ${activeLogin}`}>
          <button
            type="button"
            className="switcher switcher-login"
            onClick={switchToSignup}
          >
            Login
            <span className="underline" />
          </button>
          <Login setUser={setUser} setTimer={setTimer} />
        </div>
        <div className={`form-wrapper ${activeRegister}`}>
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={switchToRegister}
          >
            Sign Up
            <span className="underline" />
          </button>
          <Register />
        </div>
      </div>
    </section>
  );
}
