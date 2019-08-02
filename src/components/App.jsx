import React, { Component } from "react";
import Movies from "./movies/movies";

class App extends Component {
  render() {
    return (
      <div className="container p-2">
        <div>Navigation</div>
        <Movies />
      </div>
    );
  }
}

export default App;
