import React from "react";
import { Link } from "react-router-dom";

export default function Home({ logOut, setActive }) {
  return (
    <div>
      <button
        onClick={() => {
          setActive(true);
        }}
      >
        start game
      </button>
      <Link to="/board">board</Link>
      <button onClick={logOut}>log out</button>
    </div>
  );
}
