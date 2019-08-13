import React, { Component } from "react";
import MovieItem from "./movieItem";

class MoviesTable extends Component {
  render() {
    const {
      movies,
      liked,
      onDelete,
      onLikeClicked,
      onSort,
      sortBy
    } = this.props;
    const columns = [
      { title: "Title", path: "title" },
      { title: "Genre", path: "genre.name" },
      { title: "In Stock", path: "numberInStock" },
      { title: "Rate", path: "dailyRentalRent" }
    ];
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {columns.map(item => (
                <th key={item.path}>
                  {item.title}
                  <i
                    className={
                      sortBy.column === item.path
                        ? "fa fa-sort m-2 text-info"
                        : "fa fa-sort m-2"
                    }
                    onClick={() => onSort(item.path)}
                    style={{ cursor: "pointer" }}
                  />
                </th>
              ))}
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
