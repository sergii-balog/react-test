import React, { Component } from "react";
import Like from "../common/like";
import { Link } from "react-router-dom";
class MovieItem extends Component {
  render() {
    const { movie, onDelete, onLikeClicked, likedMovies } = this.props;
    return (
      <tr>
        <td>
          {this.props.user ? (
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          ) : (
            <span>{movie.title}</span>
          )}
        </td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRent}</td>
        <td className="text-center">
          <Like
            id={movie._id}
            onClick={() => onLikeClicked(movie._id)}
            liked={likedMovies.some(x => x === movie._id)}
          />
        </td>
        <td className="text-center">
          {this.props.user && this.props.user.isAdmin && (
            <button
              onClick={() => onDelete(movie._id)}
              className="btn btn-sm btn-danger m-2"
            >
              <i className="fa fa-trash" />
            </button>
          )}
        </td>
      </tr>
    );
  }
}

export default MovieItem;
