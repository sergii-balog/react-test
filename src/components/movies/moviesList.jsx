import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import MovieItem from "./movieItem";
import MovieHeader from "./moviesHeader";

class MoviesList extends Component {
  state = {
    movies: getMovies()
  };

  haldleDelete = movieId => {
    if (
      window.confirm(
        "Are you sure you want to delete '" +
          this.state.movies.filter(x => x._id === movieId)[0].title +
          "'?"
      )
    ) {
      this.setState({
        movies: this.state.movies.filter(x => x._id !== movieId)
      });
    }
  };
  render() {
    return (
      <main role="main" class="container p-2">
        <MovieHeader numberOfItems={this.state.movies.length} />
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>In Stock</th>
                <th>Rate</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <MovieItem movie={movie} onDelete={this.haldleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}

export default MoviesList;
