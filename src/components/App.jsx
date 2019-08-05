import React, { Component } from "react";
import Movies from "./movies/movies";
import { Route, Switch } from "react-router-dom";
import Products from "./products";
import NavBar from "./navbar";

class App extends Component {
  render() {
    return (
      <div className="container p-2">
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/products" component={Products} />
            <Route path="/" exact component={Movies} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
