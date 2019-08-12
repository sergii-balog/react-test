import React from "react";
import Joi from "joi-browser";
import FormBase from "../common/form";
import FormTitle from "../common/formTitle";
import { getMovie, saveMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";

class MovieForm extends FormBase {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRent: "",
      genreId: ""
    },
    errors: {},
    genres: []
  };
  async getGenres() {
    const genres = await getGenres();
    this.setState({ genres });
  }
  async getMovie() {
    try {
      const { params } = this.props.match;
      if (params.id === "new") return;

      const movie = await getMovie(params.id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.getGenres();
    await this.getMovie();
  }
  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRent: movie.dailyRentalRent
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
    dailyRentalRent: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate"),
    _id: Joi.string(),
    genreId: Joi.string()
      .required()
      .label("Genre")
  };

  doSubmit = async () => {
    // call the server
    await saveMovie(this.state.data);
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
            "dailyRentalRent",
            "Rate",
            "Rate",
            "Daily rental rate"
          )}
          <button
            onClick={this.handleCancel}
            className="btn btn-secondary mr-2"
          >
            Cancel
          </button>
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
