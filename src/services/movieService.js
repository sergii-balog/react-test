import http from "./httpService";
import config from "../config.json";

const moviesEndpoint = config.apiUrl + config.moviesEndpoint;

function movieUrl(id) {
  return `${moviesEndpoint}/${id}`;
}
export async function getMovies() {
  const result = await http.get(moviesEndpoint);
  return result.data;
}

export async function getMovie(id) {
  const result = await http.get(movieUrl(id));
  return result.data;
}

export async function saveMovie(movie) {
  let result;
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    result = await http.put(movieUrl(movie._id), body);
  } else {
    result = await http.post(moviesEndpoint, movie);
  }
  return result.data;
}

export async function deleteMovie(movie) {
  const body = { ...movie };
  body.genreId = movie.genre._id;
  delete body.genre;
  delete body._id;
  delete body.__v;
  const result = await http.delete(movieUrl(movie._id), { data: body });
  return result.data;
}
