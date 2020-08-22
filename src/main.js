import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "./style/reset.css"; //重置默认全局css样式
import "@/icons/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/protect";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
