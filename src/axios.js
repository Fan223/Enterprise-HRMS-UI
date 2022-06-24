import axios from "axios";
import ElementUI from "element-ui";
import router from "./router";

const request = axios.create({
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(config => {
  if (localStorage.getItem("jwt")) {
    // 请求头带上 token
    config.headers.Authorization = localStorage.getItem("jwt");
  }
  return config;
});

request.interceptors.response.use(response => {
  let res = response.data;

  if (res.code === 200) {
    return response;
  } else {
    ElementUI.Message.error(res.message ? res.message : '系统异常');
    return Promise.reject(res.meassage);
  }
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        ElementUI.Message.error("请求异常");
        break;
      case 401:
        localStorage.removeItem('jwt');
        ElementUI.Message.error('Token 失效，请重新登录');
        router.push("/login");
        break;
      case 403:
        ElementUI.Message.error("拒绝访问");
        break;
      case 404:
        ElementUI.Message.error("请求错误,未找到该资源");
        break;
      case 500:
        ElementUI.Message.error("服务器出错");
        break;
      default:
        ElementUI.Message.error("未知错误");
    }
  }
  return Promise.reject(error);
});

export default request