import axios from "axios";
import React from "react";

export default function Option({ option }) {
  const getAnswer = async (e) => {
    let { data } = await axios.get("/answer");
    console.log(e.target.innerText);
    console.log(data.answer);
    console.log(`${data.answer}` === e.target.innerText);
  };
  return <div className="option" onClick={getAnswer}>{`${option}`}</div>;
}
