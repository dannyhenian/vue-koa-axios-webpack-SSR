import axios from 'axios';
// import qs from 'qs'
import config from './config-client';
import { throwErr } from '../utils/constant/throwErr'; // 捕捉服务端http状态码的方法
// import store from '@/store' // 引入vuex的相关操作
// import router from '@/router'

// 过滤请求
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response =>
    response,
  error => {
    if (error && error.response) {
      let res = {};
      res.code = error.response.status;
      res.message = throwErr(error.response.status, error.response); // throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
      return Promise.reject(res);
    }
    return Promise.reject(error);
  }
);

function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response;
  }
  return {
    data: {
      code: -404,
      message: response.statusText,
      data: ''
    }
  };
}

function checkCode (res) {
  if (res.data.code === -500) {
    window.location.href = '/backend';
  } else if (res.data.code === -400) {
    window.location.href = '/';
  } else if (res.data.code !== 200) {
    // showMsg(res.data.message)
  }
  return res && res.data;
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url: config.api + url,
      // data: qs.stringify(data),
      data: data,
      timeout: config.timeout,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(checkStatus)
      .then(checkCode);
  },
  get (url, params) {
    return axios({
      method: 'get',
      url: config.api + url,
      params,
      timeout: config.timeout,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    // .then(checkStatus)
    // .then(checkCode)
  }
};
