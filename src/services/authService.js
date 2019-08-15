import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + config.authEndpoint;
const tokenKey = "token";

http.setJwt(getToken());

export async function login(email, password) {
  const result = await http.post(apiEndpoint, {
    email,
    password
  });
  localStorage.setItem(tokenKey, result.data.token);
  return result.data;
}
export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    console.error(error);
    return null;
  }
}
export function getToken() {
  return localStorage.getItem(tokenKey);
}
