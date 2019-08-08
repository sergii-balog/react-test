import React, { Component } from "react";
import { getMovies, deleteMovie } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import MovieHeader from "./moviesHeader";
import Paging from "../common/paging";
import { paginate } from "../../utils/paginate";
import Filter from "../common/filter";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    liked: [],
    selectedPage: 1,
    pageSize: 3,
    selectedFilterIndex: 0,
    sortBy: { column: "title", type: "asc" }
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }
  handleDelete = movieId => {
    const { movies } = this.state;
    if (
      window.confirm(
        "Are you sure you want to delete '" +
          movies.filter(x => x._id === movieId)[0].title +
          "'?"
      )
    ) {
      deleteMovie(movieId);
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
  handleSort = path => {
    const sort = this.state.sortBy.type === "asc" ? "desc" : "asc";
    this.setState({ sortBy: { column: path, type: sort } });
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
      selectedFilterIndex,
      sortBy
    } = this.state;

    const filteredMovies =
      selectedFilterIndex === 0
        ? movies
        : movies.filter(
            x => x.genre.name === genres[selectedFilterIndex - 1].name
          );
    const sorted = _.orderBy(filteredMovies, [sortBy.column], [sortBy.type]);

    return (
      <main role="main" className="container p-2">
        <div className="row">
          <div className="col-3">
            <Filter
              options={genres.map(x => x.name)}
              selectedIndex={selectedFilterIndex}
              onFilterSelected={this.handleFilterSelected}
            />
          </div>
          <div className="col">
            <Link to="/movies/new" className="btn btn-primary btn-sm m-2">
              Add movie
            </Link>
            <MovieHeader
              numberOfItems={filteredMovies.length}
              numberOfLiked={
                liked.filter(value => filteredMovies.some(x => x._id === value))
                  .length
              }
            />
            <MoviesTable
              movies={paginate(sorted, selectedPage, pageSize)}
              liked={liked}
              onDelete={this.handleDelete}
              onLikeClicked={this.handleLikedClicked}
              onSort={this.handleSort}
              sortBy={sortBy}
            />
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

export default Movies;
