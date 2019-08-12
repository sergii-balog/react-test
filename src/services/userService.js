import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + config.usersEndpoint;

export async function register(user) {
  const result = await http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
  return result.data;
}
