import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function CreateUser() {
  const userRef = useRef();
  const [pageToNavigate, setPageToNavigate] = useState("/createuser");
  const [difficulty, setDifficulty] = useState();

  const createUser = () => {
    if (userRef.current.value && difficulty) {
      const userDetails = {
        user: userRef.current.value,
        difficulty: difficulty,
      };
      axios
        .post("./createuser", userDetails)
        .then(() => setPageToNavigate("/game"))
        .catch((e) => console.log(e.message));
    } else {
      console.log("FuckALL");
    }
  };

  return (
    <div>
      <div>
        <input ref={userRef} />
      </div>
      <Button
        variant="contained"
        className="easy-button button"
        onClick={() => setDifficulty("Easy")}
      >
        Easy
      </Button>
      <Button
        variant="contained"
        className="hard-button button"
        onClick={() => setDifficulty("Hard")}
      >
        Hard
      </Button>
      <Button
        variant="contained"
        className="create-button button"
        onClick={createUser}
      >
        {" "}
        Create-User
      </Button>
      <Redirect push to={pageToNavigate} />
    </div>
  );
}

//<Button variant="contained">Default</Button>
