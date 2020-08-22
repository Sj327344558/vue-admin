import Cookie from "cookie_js";

//token
export function getToken() {
  return Cookie.get("admin_token");
}

export function setToken(val) {
  return Cookie.set("admin_token", val);
}

export function removeToken() {
  return Cookie.remove("admin_token");
}

//username
export function getUsername() {
  return Cookie.get("username");
}

export function setUsername(val) {
  return Cookie.set("username", val);
}

export function removeUsername() {
  return Cookie.remove("username");
}
