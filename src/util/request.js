import axios from "axios";
import { Message } from "element-ui";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";
const instance = axios.create({
  baseURL: BASEURL,
  timeout: 20000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.data.resCode != 0) {
      Message.error(response.data.message);
      return Promise.reject(response);
    } else {
      return response;
    }

    og;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default instance;
