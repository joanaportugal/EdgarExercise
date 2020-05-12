import React, { Component } from "react";
import "./Styles/style.less";
import Navigation from "./Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import Home from "./Pages/Home";
import Exercise from "./Pages/Exercise";
import Exercise2 from "./Pages/Exercise2";
import Exercise4 from "./Pages/Exercise4";
import FetchExercise from "./Pages/FetchExercise";
import ReduxExercise from "./Pages/ReduxExercise.js";
import PokemonFilter from "./Pages/PokemonFilter.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Navigation selected="home" />
            <Home />
          </Route>{" "}
          <Route path="/exercise">
            <Navigation selected="exercise" />
            <Exercise />
          </Route>{" "}
          <Route path="/exercise2">
            <Navigation selected="exercise2" />
            <Exercise2 />
          </Route>{" "}
          <Route path="/exercise4">
            <Navigation selected="exercise4" />
            <Exercise4 />
          </Route>{" "}
          <Route path="/fetchexercise">
            <Navigation selected="fetchexercise" />
            <FetchExercise />
          </Route>{" "}
          <Route path="/reduxexercise/:id">
            <Navigation selected="reduxexercise" />
            <ReduxExercise />
          </Route>{" "}
          <Route path="/pokemonfilter">
            <Navigation selected="pokemonfilter" />
            <PokemonFilter startId={20} endId={60} />{" "}
          </Route>{" "}
        </Switch>{" "}
      </Router>
    );
  }
}

export default hot(module)(App);
