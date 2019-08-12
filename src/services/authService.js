import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + config.authEndpoint;

export async function login(email, password) {
  const result = await http.post(apiEndpoint, {
    email,
    password
  });
  return result.data;
}
