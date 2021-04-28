import React, { useState, useEffect } from "react";
// import Options from "./Options";
import Question from "./Question";
import CreateUser from "./CreateUser";
import GameSummery from "./GameSummery";
import Board from "./Board";
import axios from "axios";
import RatingPanel from "./RatingPanel";
// import { LinearProgress, Link } from "@material-ui/core";

import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

export default function Game() {
  const [user, setUser] = useState();
  const [question, setQuestion] = useState();
  const [chosenAnswer, setChosenAnswer] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [isRight, setIsRight] = useState();
  const [score, setScore] = useState(0);
  const [reduceTimer, setReduceTimer] = useState(20);
  const [timer, setTimer] = useState(reduceTimer);
  const [progress, setProgress] = useState(100);
  const [lives, setLives] = useState(3);
  const [isAlive, setIsAlive] = useState(true);

  /////

  useEffect(() => {
    setProgress(100 / (reduceTimer / timer));
  }, [timer]);

  useEffect(() => {
    if (user) {
      const interval = setInterval(async () => {
        if (timer === 0) {
          clearInterval(interval);

          if (question) {
            const correct = await getCorrectAnswer();
            setCorrectAnswer(correct);
          }
          setIsRight(false);
        } else {
          setTimer((prev) => prev - 0.5);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [user, timer, reduceTimer]);

  useEffect(() => {
    if (lives === 0) {
      finishGame();
      setIsAlive(false);
    }
  }, [lives]);

  useEffect(async () => {
    if (!user) {
      console.log("use Effect user");
      const { data } = await axios.get("api/question");
      setQuestion(data);
    }
  }, [user]);

  const getCorrectAnswer = async () => {
    const { data } = await axios.get("api/answer");
    const correct = data.answer;
    return correct;
  };

  const setChosen = async (e) => {
    try {
      const correct = await getCorrectAnswer();
      const chosen = e.target.innerText;
      compareAnswers(chosen, correct);
      setChosenAnswer(chosen);
      setCorrectAnswer(correct);
      setTimer(undefined);
    } catch (err) {
      console.log(err.message);
    }
    console.log("timer");
    console.log(timer);
    console.log("reduceTimer");
    console.log(reduceTimer);
  };

  const compareAnswers = (chosen, correct) => {
    setIsRight(chosen === `${correct}`);
    console.log(chosen);
    console.log(typeof chosen);

    console.log(correct);
    console.log(chosen === `${correct}`);

    if (chosen === `${correct}`) {
      const currentScore = (1 - (reduceTimer - timer) / reduceTimer) * 70 + 30;
      setScore((score) => score + currentScore);
    } else {
      console.log(lives);
    }
  };

  const finishGame = async () => {
    try {
      const done = await axios.post("api/finish", { score: score });
      console.log(done);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getQuestion = async () => {
    try {
      const { data } = await axios.get("api/question");
      setQuestion(data);
      reduceTimer > 5.5
        ? setReduceTimer((prev) => prev - 0.5)
        : setReduceTimer(5.5);
      setTimer(reduceTimer - 0.5);
    } catch (err) {
      console.log(err.message);
    }
  };

  const resetGame = () => {
    setIsAlive(true);
    setTimer(undefined);
    setReduceTimer(20);
    setQuestion();
    setLives(3);
    setCorrectAnswer();
    setUser();
  };

  return (
    <div>
      <nav>
        <BrowserRouter>
          <NavLink exact to="/" onClick={resetGame}>
            New Game
          </NavLink>{" "}
          <NavLink exact to="/board">
            Winners and losers Board
          </NavLink>
          <Switch>
            <Route exact path="/board" component={Board} />
            <Route exact path="/gamesummery" component={GameSummery} />
          </Switch>
        </BrowserRouter>
      </nav>
      {!isAlive ? (
        <GameSummery user={user} score={score} />
      ) : !user ? (
        <CreateUser setUser={setUser} setTimer={setTimer} />
      ) : correctAnswer ? (
        <RatingPanel
          isRight={isRight}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          getQuestion={getQuestion}
          lives={lives}
          finishGame={finishGame}
          setLives={setLives}
        />
      ) : (
        <Question
          lives={lives}
          timer={timer}
          progress={progress}
          question={question}
          setChosen={setChosen}
          score={score}
        />
      )}
    </div>
  );
}
