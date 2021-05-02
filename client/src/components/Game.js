import React, { useState, useEffect } from "react";
// import Options from "./Options";
import Question from "./Question";
import LandingPage from "./LandingPage";
import GameSummery from "./GameSummery";
import Home from "./Home";
import Board from "./Board";
import axios from "axios";
import RatingPanel from "./RatingPanel";
import { Avatar } from "@material-ui/core";
// import { LinearProgress, Link } from "@material-ui/core";

import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Register from "./Register";

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
  const [active, setActive] = useState(false);
  const [difficulty, setDifficulty] = useState();
  const [board, setBoard] = useState();
  /////

  useEffect(() => {
    setProgress(100 / (reduceTimer / timer));
  }, [timer]);

  useEffect(() => {
    if (active) {
      const interval = setInterval(async () => {
        if (timer <= 0) {
          clearInterval(interval);

          if (question) {
            const correct = await getCorrectAnswer();
            setCorrectAnswer(correct);
          }
          setIsRight(false);
        } else {
          timer ? setTimer((prev) => prev - 0.5) : clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [active, timer, reduceTimer]);

  useEffect(() => {
    if (lives === 0) {
      finishGame();
      setIsAlive(false);
    }
  }, [lives]);

  useEffect(async () => {
    if (user) {
      const { data } = await axios.get(`api/question/${difficulty}`);
      setQuestion(data);
    }
  }, [active]);

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
      setTimer();
    } catch (err) {
      console.log(err.message);
    }
  };

  const compareAnswers = (chosen, correct) => {
    setIsRight(chosen === `${correct}`);

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
    } catch (err) {
      console.log(err.message);
    }
  };

  const getQuestion = async () => {
    try {
      const { data } = await axios.get(`api/question/${difficulty}`);
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
    setActive(false);
    setDifficulty();
    setBoard();
  };
  const logOut = async () => {
    await axios.post("/users/logout");
    resetGame();
    setUser();
  };

  return (
    <BrowserRouter>
      <div className="game">
        {user && (
          <div className="nav-bar">
            <section className="logout">
              <NavLink
                className="logout-btn nav-link"
                onClick={logOut}
                exact
                to="/"
              >
                log out
              </NavLink>
              <Avatar className="avatar">{user.name.slice(0, 1)}</Avatar>
            </section>
            <NavLink className="nav-link" exact to="/" onClick={resetGame}>
              Home
            </NavLink>{" "}
            <NavLink
              exact
              to="/board"
              className="nav-link"
              onClick={() => {
                setBoard("display");
                console.log(board);
              }}
            >
              Winners and losers Board
            </NavLink>
            <Switch>
              <Route exact path="/board" component={Board} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/gamesummery" component={GameSummery} />
            </Switch>
          </div>
        )}
        {!board && (
          <>
            {!isAlive ? (
              <GameSummery user={user} score={score} />
            ) : !user ? (
              <LandingPage setUser={setUser} setTimer={setTimer} />
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
            ) : !active ? (
              <Home
                logOut={logOut}
                setActive={setActive}
                setTimer={setTimer}
                setDifficulty={setDifficulty}
                difficulty={difficulty}
                user={user}
              />
            ) : (
              question && (
                <Question
                  lives={lives}
                  timer={timer}
                  progress={progress}
                  question={question}
                  setChosen={setChosen}
                  score={score}
                />
              )
            )}
          </>
        )}
      </div>
    </BrowserRouter>
  );
}
