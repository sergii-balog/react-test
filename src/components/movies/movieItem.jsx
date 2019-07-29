import React, { Component } from "react";

class MovieItem extends Component {
  render() {
    const { movie, onDelete } = this.props;
    return (
      <tr>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button
            onClick={() => onDelete(movie._id)}
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
