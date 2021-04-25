import React from "react";
import Option from "./Option";

export default function Options({ options, setChosenAnswer }) {
  return (
    <div>
      {options.map((option, i) => (
        <Option
          key={`option-${i}`}
          option={option}
          setChosenAnswer={setChosenAnswer}
        />
      ))}
    </div>
  );
}
