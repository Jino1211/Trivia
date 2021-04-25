import React from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import CreateUser from "./CreateUser";
import Game from "./Game";
import Board from "./Board";
import GameSummery from "./GameSummery";

export default function Home() {
  return (
    <div>
      <BrowserRouter>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/game">
          Start New Game!
        </NavLink>
        <NavLink exact to="/board">
          Winners and losers Board
        </NavLink>

        <Switch>
          <Route exact path="/board" component={Board} />
          <Route exact path="/gamesummery" component={GameSummery} />
          <Route exact path="/game" component={Game} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
