import Cookie from "cookie_js";
import { GetSms, Login, Register } from "@/api/login.js";
import {
  setToken,
  setUsername,
  removeUsername,
  removeToken,
} from "@/util/app.js";

const state = {
  token: "",
  username: "",
};
const mutations = {
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },
};
const actions = {
  // 登录
  login(content, data) {
    return new Promise((resolve, reject) => {
      Login(data)
        .then((response) => {
          console.log("login -> response", response);
          let data = response.data.data;
          //登录后token 和username  存在cookie和vuex中
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUsername(data.username);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout(content) {
    return new Promise((resolve, reject) => {
      removeToken();
      removeUsername();
      content.commit("SET_TOKEN", "");
      content.commit("SET_USERNAME", "");
      resolve();
    });
  },
};

export default {
  namespaced: true, //命名空间
  state,
  mutations,
  actions,
};
