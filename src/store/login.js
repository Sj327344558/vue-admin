import Cookie from "cookie_js";
import { GetSms, Login, Register } from "@/api/login.js";

const login = {
  state: {
    // isCollapse: Cookie.get("isCollapse") || false,
    isCollapse: false,
  },
  mutations: {
    SET_isCollapse(state, value) {
      state.isCollapse = value;
      // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
    },
  },
  actions: {
    setMenustatus({ state, getters, commit }, value) {
      console.log("异步action");
      console.log(value);
      // commit("SET_isCollapse")
    },

    login(content, data) {
      return new Promise((resolve, reject) => {
        //接口
        Login(data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default login;
