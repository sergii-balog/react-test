import React, { Component } from "react";
import { getMovies, deleteMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import MovieHeader from "./moviesHeader";
import Paging from "../common/paging";
import { paginate } from "../../utils/paginate";
import Filter from "../common/filter";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "../common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    liked: [],
    selectedPage: 1,
    pageSize: 3,
    selectedFilterIndex: 0,
    sortBy: { column: "title", type: "asc" },
    searchQuery: ""
  };

  async componentDidMount() {
    const genres = await getGenres();
    const movies = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async movieId => {
    const { movies: originalMovies } = this.state;
    const title = originalMovies.filter(x => x._id === movieId)[0].title;
    if (window.confirm("Are you sure you want to delete '" + title + "'?")) {
      const movies = originalMovies.filter(x => x._id !== movieId);
      this.setState({ movies });
      try {
        await deleteMovie(originalMovies.filter(x => x._id === movieId)[0]);
        toast.success(`'${title}' movie deleted successfully.`);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          toast.error("This movie has already been deleted");
        }
        if (ex.response && ex.response.status === 400) {
          toast.error("Bad request : " + ex.response.data);
        }
        if (ex.response && ex.response.status === 403) {
          toast.error("Forbidden : " + ex.response.data);
        }
        this.setState({ movies: originalMovies });
      }
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
    this.setState({
      selectedFilterIndex: filterIndex,
      searchQuery: "",
      selectedPage: 1
    });
  };
  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedFilterIndex: 0,
      selectedPage: 1
    });
  };
  render() {
    const {
      movies,
      liked,
      selectedPage,
      pageSize,
      genres,
      selectedFilterIndex,
      sortBy,
      searchQuery
    } = this.state;

    let filteredMovies =
      selectedFilterIndex === 0
        ? movies
        : movies.filter(
            x => x.genre.name === genres[selectedFilterIndex - 1].name
          );
    filteredMovies =
      searchQuery === ""
        ? filteredMovies
        : filteredMovies.filter(
            x =>
              x.title.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) >
              -1
          );
    const sorted = _.orderBy(filteredMovies, [sortBy.column], [sortBy.type]);
    const { user } = this.props;
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
            {user && (
              <Link to="/movies/new" className="btn btn-primary btn-sm my-2">
                Add movie
              </Link>
            )}
            <MovieHeader
              numberOfItems={filteredMovies.length}
              numberOfLiked={
                liked.filter(value => filteredMovies.some(x => x._id === value))
                  .length
              }
            />
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={paginate(sorted, selectedPage, pageSize)}
              liked={liked}
              onDelete={this.handleDelete}
              onLikeClicked={this.handleLikedClicked}
              onSort={this.handleSort}
              sortBy={sortBy}
              user={this.props.user}
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
