import React from "react";

export default function Option({ option }) {
  console.log(option);
  return <div className="option">{`${option}`}</div>;
}
