import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import MovieItem from "./movieItem";
import MovieHeader from "./moviesHeader";

class MoviesList extends Component {
  state = {
    movies: getMovies(),
    liked: []
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
  handleLikedClicked = movieId => {
    if (this.state.liked.filter(x => x === movieId).length === 0) {
      const newLiked = [...this.state.liked];
      newLiked.push(movieId);
      this.setState({ liked: newLiked });
    } else {
      const newLiked = this.state.liked.filter(x => x !== movieId);
      this.setState({ liked: newLiked });
    }
  };
  render() {
    return (
      <main role="main" className="container p-2">
        <MovieHeader
          numberOfItems={this.state.movies.length}
          numberOfLiked={this.state.liked.length}
        />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>In Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <MovieItem
                  key={movie._id}
                  likedMovies={this.state.liked}
                  movie={movie}
                  onDelete={this.haldleDelete}
                  onLikeClicked={this.handleLikedClicked}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}

export default MoviesList;
