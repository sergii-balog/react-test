import React, { Component } from "react";
import Like from "../common/like";

class MovieItem extends Component {
  render() {
    const { movie, onDelete, onLikeClicked, likedMovies } = this.props;
    return (
      <tr>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td className="text-center">
          <Like
            id={movie._id}
            onClick={() => onLikeClicked(movie._id)}
            liked={likedMovies.some(x => x === movie._id)}
          />
        </td>
        <td className="text-center">
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
