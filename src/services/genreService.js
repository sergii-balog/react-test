import http from "./httpService";

export async function getGenres() {
  const result = await http.get("http://localhost:4546/api/genres");
  return result.data;
}
