import "../App.css";
import axios from "axios";
import React, { useState } from "react";

export default function Options({ option, setLives, getAnswer }) {
  return <div onClick={getAnswer} className={`option`}>{`${option}`}</div>;
}
