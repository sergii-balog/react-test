import * as genresAPI from "./genreService";
import http from "./httpService";

export async function getMovies() {
  const result = await http.get("http://localhost:4546/api/movies");
  return result.data;
}

export async function getMovie(id) {
  const result = await http.get("http://localhost:4546/api/movies/" + id);
  return result.data;
}

export async function saveMovie(movie) {
  const result = await http.post("http://localhost:4546/api/movies/", movie);
  return result.data;
}

export async function deleteMovie(id) {
  const result = await http.delete("http://localhost:4546/api/movies/" + id);
  return result.data;
}
