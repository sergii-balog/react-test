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
      numberInStock: 0,
      dailyRentalRate: 0,
      _id: "0",
      genre: { _id: "0", name: "-" }
    },
    errors: {},
    genres: []
  };

  componentDidMount() {
    const { params } = this.props.match;
    let data = {
      title: "",
      numberInStock: 0,
      dailyRentalRate: 0,
      _id: "0",
      genre: { _id: "0", name: "-" }
    };
    if (params.id !== "new") {
      data = { ...getMovie(params.id) };
    }
    const genres = getGenres();
    this.setState({ data, genres });
  }
  genreSchema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string()
  });
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
      .min(1)
      .max(10)
      .label("Rate"),
    _id: Joi.string(),
    genre: this.genreSchema
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
            "genre",
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
