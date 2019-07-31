import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import MovieItem from "./movieItem";
import MovieHeader from "./moviesHeader";
import Paging from "../common/paging";
import { paginate } from "../../utils/paginate";

class MoviesList extends Component {
  state = {
    movies: getMovies(),
    liked: [],
    selectedPage: 1,
    pageSize: 3
  };

  handleDelete = movieId => {
    const { movies } = this.state;
    if (
      window.confirm(
        "Are you sure you want to delete '" +
          movies.filter(x => x._id === movieId)[0].title +
          "'?"
      )
    ) {
      this.setState({
        movies: movies.filter(x => x._id !== movieId)
      });
    }
  };
  handleLikedClicked = movieId => {
    const { liked } = this.state;
    if (liked.filter(x => x === movieId).length === 0) {
      const newLiked = [...liked];
      newLiked.push(movieId);
      this.setState({ liked: newLiked });
    } else {
      const newLiked = liked.filter(x => x !== movieId);
      this.setState({ liked: newLiked });
    }
  };
  handlePageSelected = pageNumber => {
    this.setState({ selectedPage: pageNumber });
  };
  render() {
    const { movies, liked, selectedPage, pageSize } = this.state;
    return (
      <main role="main" className="container p-2">
        <MovieHeader
          numberOfItems={movies.length}
          numberOfLiked={liked.length}
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
              {paginate(movies, selectedPage, pageSize).map(movie => (
                <MovieItem
                  key={movie._id}
                  likedMovies={liked}
                  movie={movie}
                  onDelete={this.handleDelete}
                  onLikeClicked={this.handleLikedClicked}
                />
              ))}
            </tbody>
          </table>
        </div>
        <Paging
          totalItems={movies.length}
          pageSize={pageSize}
          onPageSelected={this.handlePageSelected}
          selectedPage={selectedPage}
        />
      </main>
    );
  }
}

export default MoviesList;
