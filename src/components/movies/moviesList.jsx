import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import MovieItem from "./movieItem";
import MovieHeader from "./moviesHeader";
import Paging from "../common/paging";
import { paginate } from "../../utils/paginate";
import Filter from "../common/filter";

class MoviesList extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    liked: [],
    selectedPage: 1,
    pageSize: 3,
    selectedFilterIndex: 0
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
  handleFilterSelected = filterIndex => {
    this.setState({ selectedFilterIndex: filterIndex, selectedPage: 1 });
  };
  render() {
    const {
      movies,
      liked,
      selectedPage,
      pageSize,
      genres,
      selectedFilterIndex
    } = this.state;
    const filteredMovies =
      selectedFilterIndex === 0
        ? movies
        : movies.filter(
            x => x.genre.name === genres[selectedFilterIndex - 1].name
          );
    return (
      <main role="main" className="container p-2">
        <div className="row">
          <div className="col-2">
            <Filter
              options={genres.map(x => x.name)}
              selectedIndex={selectedFilterIndex}
              onFilterSelected={this.handleFilterSelected}
            />
          </div>
          <div className="col">
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
                  {paginate(filteredMovies, selectedPage, pageSize).map(
                    movie => (
                      <MovieItem
                        key={movie._id}
                        likedMovies={liked}
                        movie={movie}
                        onDelete={this.handleDelete}
                        onLikeClicked={this.handleLikedClicked}
                      />
                    )
                  )}
                </tbody>
              </table>
            </div>
            <Paging
              totalItems={filteredMovies.length}
              pageSize={pageSize}
              onPageSelected={this.handlePageSelected}
              selectedPage={selectedPage}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default MoviesList;
