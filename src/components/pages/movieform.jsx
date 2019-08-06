import React, { Component } from "react";

class MovieForm extends Component {
  render() {
    const { match, history } = this.props;
    return (
      <div className="p-5">
        <h5 className="text-center">Details for movie {match.params.id}</h5>
        <button
          className="btn btn-primary"
          onClick={() => history.push("/movies")}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
