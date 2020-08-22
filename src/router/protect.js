import router from "./index";
import store from "@/store/index";

import { getToken, removeToken, removeUsername } from "@/util/app";

const whiteRouter = ["/login"];

//路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path == "/login") {
      //去登录页面默认退出 清除信息
      removeToken();
      removeUsername();
      store.commit("login/SET_TOKEN", "");
      store.commit("login/SET_USERNAME", "");
      next();
    } else {
      next();
    }
  } else {
    if (whiteRouter.indexOf(to.path) != -1) {
      next();
    } else {
      next("/login");
    }
  }

  // next(); //to
});
