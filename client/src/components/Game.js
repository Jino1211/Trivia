import React, { useEffect, useState } from "react";
import Question from "./Question";
import Options from "./Options";
import Timer from "./Timer";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import PlayersSummery from "./PlayersSummery";
import Rate from "./Rate";

export default function Game() {
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [reduceTimer, setReduceTimer] = useState(20);
  const [timer, setTimer] = useState(reduceTimer);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [userAchievement, setUserAchievement] = useState();
  const [isCorrect, setIsCorrect] = useState();
  const [openRating, setOpenRating] = useState();

  //Finishes the game when players lives ends
  useEffect(() => {
    if (lives === 0)
      axios
        .post("/finish", { score: score })
        .then((res) => setUserAchievement(res.data))
        .catch((err) => console.log(err.message));
    setTimer(0);
  }, [lives]);

  //pulls a new question for players in game's start
  useEffect(() => {
    getQuestion();
  }, []);

  // Resets timer total length on each half second
  useEffect(() => {
    const interval = setInterval(() => {
      timer === 0 ? clearInterval(interval) : setTimer((prev) => prev - 0.5);
    }, 500);
    return () => clearInterval(interval);
  }, [timer, question]);

  //Function for coloring the clicked answer by wrong/right and updating the lives accordingly
  const getAnswer = async (e) => {
    setOpenRating(true);
    try {
      let { data } = await axios.get("/answer");
      if (e.target.innerText === `${data.answer}`) {
        setIsCorrect("correct");
        console.log("correct");
        calculateScore();
      } else {
        setIsCorrect("wrong");
        console.log("wrong");
        setLives((lives) => lives - 1);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //Updating the rate of a question in the db on every players rate, and pulling new question
  const updateRate = async (newRating) => {
    if (!newRating) newRating = undefined;
    try {
      const update = await axios.put("/update", { rate: newRating });
    } catch (err) {
      console.log(err.message);
    }
    getQuestion();
  };

  //Function for reCalculating the players current score
  const calculateScore = () => {
    const currentScore = (1 - (reduceTimer - timer) / reduceTimer) * 70 + 30;
    setScore((score) => score + currentScore);
  };

  //Function for pulling a new question and reSetting the reduce timer
  const getQuestion = async () => {
    setOpenRating(false);
    try {
      const dbQuestion = await axios.get("/question");
      setQuestion(dbQuestion.data);
      reduceTimer > 5
        ? setReduceTimer((prev) => prev - 0.5)
        : setReduceTimer(5);
      setTimer(reduceTimer);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {openRating && (
        <Rate
          setRating={setRating}
          updateRate={updateRate}
          rating={rating}
          setOpenRating={setOpenRating}
          getQuestion={getQuestion}
        />
      )}
      {userAchievement ? (
        <PlayersSummery userAchievement={userAchievement} />
      ) : (
        <div>
          {timer}
          <LinearProgress variant="determinate" value={timer} />
          {question && (
            <>
              <Question question={question.question} />
              {question.options.map((option, i) => (
                <Options
                  key={`option-${i}`}
                  option={option}
                  setLives={setLives}
                  // getQuestion={getQuestion}
                  getAnswer={getAnswer}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
