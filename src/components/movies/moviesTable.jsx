import React, { Component } from "react";
import MovieItem from "./movieItem";

class MoviesTable extends Component {
  render() {
    const { movies, liked, onDelete, onLikeClicked, onSort } = this.props;
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th onClick={() => onSort("title")}>Title</th>
              <th onClick={() => onSort("genre.name")}>Genre</th>
              <th onClick={() => onSort("numberInStock")}>In Stock</th>
              <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <MovieItem
                key={movie._id}
                likedMovies={liked}
                movie={movie}
                onDelete={onDelete}
                onLikeClicked={onLikeClicked}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MoviesTable;
