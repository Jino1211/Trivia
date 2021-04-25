import React from "react";
import Game from "./Game";
import ScoreBoard from "./ScoreBoard";
import CreateUser from "./CreateUser";
import PlayersSummery from "./PlayersSummery";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <BrowserRouter>
        <NavLink exact to="/">
          Home
        </NavLink>{" "}
        <NavLink exact to="/createuser">
          New Game
        </NavLink>{" "}
        {""}
        <NavLink exact to="/scoreboard">
          Go to Winners board
        </NavLink>
        <h1>Welcome to trivia!</h1>
        {/* <Game /> */}
        <Switch>
          <Route exact path="/createuser" component={CreateUser} />
          <Route exact path="/playerssummery" component={PlayersSummery} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/scoreboard" component={ScoreBoard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
