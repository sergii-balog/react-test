import React from "react";
import Joi from "joi-browser";
import FormBase from "../common/form";
import FormTitle from "../common/formTitle";
import { getMovie, saveMovie } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";

class MovieForm extends FormBase {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: ""
    },
    errors: {},
    genres: []
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const { params } = this.props.match;
    if (params.id === "new") return;
    const movie = getMovie(params.id);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };
  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate"),
    _id: Joi.string(),
    genreId: Joi.string()
      .required()
      .label("Genre")
  };

  doSubmit = () => {
    // call the server
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  handleCancel = e => {
    e.preventDefault();
    this.props.history.push("/movies");
  };
  render() {
    const { match } = this.props;
    return (
      <div className="container">
        <FormTitle
          title={
            match.params.id === "new"
              ? "New Movie"
              : `Movie [${this.state.data.title || ""}]`
          }
        />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "Movie title", "Movie title")}
          {this.renderInput(
            "genreId",
            "Genre",
            "",
            "",
            "select",
            this.state.genres
          )}
          {this.renderInput(
            "numberInStock",
            "Number in Stock",
            "Number in Stock"
          )}
          {this.renderInput(
            "dailyRentalRate",
            "Rate",
            "Rate",
            "Daily rental rate"
          )}
          <button onClick={this.handleCancel} className="btn btn-secondary m-2">
            Cancel
          </button>
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
