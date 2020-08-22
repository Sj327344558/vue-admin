import Cookie from "cookie_js";
import { GetSms, Login, Register } from "@/api/login.js";

const state = {
  // isCollapse: Cookie.get("isCollapse") || false,
  isCollapse: false,
};
const mutations = {
  SET_isCollapse(state, value) {
    console.log("app");
    state.isCollapse = value;
    // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
  },
};
const actions = {
  setMenustatus({ state, getters, commit }, value) {
    console.log("异步action");
    console.log(value);
    // commit("SET_isCollapse")
  },
};

export default {
  namespaced: true, //命名空间
  state,
  mutations,
  actions,
};
