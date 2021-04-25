import React, { useState, useEffect } from "react";
import Options from "./Options";
import CreateUser from "./CreateUser";
import axios from "axios";

export default function Game() {
  const [user, setUser] = useState();
  const [question, setQuestion] = useState();
  const [chosenAnswer, setChosenAnswer] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();

  useEffect(async () => {
    try {
      const { data } = await axios.get("/answer");
      setCorrectAnswer(data.answer);
    } catch (err) {
      console.log(err.message);
    }
  }, [chosenAnswer]);

  useEffect(() => {
    getQuestion();
  }, [user]);

  const getQuestion = async () => {
    try {
      const { data } = await axios.get("/question");
      setQuestion(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {!user ? (
        <CreateUser setUser={setUser} />
      ) : (
        <div>
          <div className="timer"></div>
          <div className="question">{question.question}</div>
          <Options
            options={question.options}
            setChosenAnswer={setChosenAnswer}
          />
          <button className="submit-answer">Submit Answer!</button>
          {/* <div className="total-score">{score}</div> */}
        </div>
      )}
    </div>
  );
}
