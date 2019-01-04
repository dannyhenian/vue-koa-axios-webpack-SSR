import axios from 'axios';
// import qs from 'qs';
import config from './config-client';
import { throwErr } from '../js/utils/constant/throwErr'; // 捕捉服务端http状态码的方法
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
      // code: -404,
      code: '0',
      message: response.statusText,
      // data: '',
      data: [],
      success: false
    }
  };
};

function checkCode (res) {
  if (res.status === -500) {
    window.location.href = '/';
  } else if (res.status === -400) {
    window.location.href = '/';
  } else if (res.status !== 200) {
    // showMsg(res.data.message)
  }
  return res && res.data;
};

export default {
  async post (url, data) {
    console.log(`请求${url}`);
    return axios({
      method: 'post',
      url: config.api + url,
      // data: qs.stringify(data),
      data: JSON.stringify(data),
      timeout: config.timeout
    }).then(checkStatus)
      .then(checkCode);
  },
  async get (url, params) {
    return axios({
      method: 'get',
      url: config.api + url,
      params,
      timeout: config.timeout
    }).then(checkStatus)
      .then(checkCode);
  }
};
