// import axios from "@util/request.js";
import axios from "@/util/request";

export function GetSms(data) {
  return axios({
    method: "post",
    url: "/getSms/",
    data,
    //data:data   es6   同名可以写一个
  });
}
export function Login(data) {
  return axios({
    method: "post",
    url: "/login/",
    data,
  });
}
export function Register(data) {
  return axios({
    method: "post",
    url: "/register/",
    data,
  });
}
