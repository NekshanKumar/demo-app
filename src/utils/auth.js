import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export function setToken(token) {
  Cookies.set(TOKEN_KEY, token, { secure: false, sameSite: "strict" });
}

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}

export function isTokenValid() {
  return !!getToken();
}

export function issueStaticToken(username) {
  return btoa(JSON.stringify({ username, iat: Date.now() })) + ".tok";
}
