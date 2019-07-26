import React, { Component } from "react";

class MovieItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.movie.title}</td>
        <td>{this.props.movie.genre.name}</td>
        <td>{this.props.movie.numberInStock}</td>
        <td>{this.props.movie.dailyRentalRate}</td>
        <td>
          <button
            onClick={() => this.props.onDelete(this.props.movie._id)}
            className="btn btn-sm btn-danger m-2"
          >
            <i className="fa fa-trash" />
          </button>
        </td>
      </tr>
    );
  }
}

export default MovieItem;
