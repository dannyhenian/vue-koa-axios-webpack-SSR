import axios from 'axios';
// import qs from 'qs' //格式化数据
// import md5 from 'md5';
import md5 from 'js-md5';
import config from './config-server';

export default {};

export const api = (cookies = {}) => {
  return {
    cookies,
    api: axios.create({
      baseURL: config.api,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        'sessionId': cookies.sessionid
      },
      timeout: config.timeout
    }),
    post (url, data) {
      // console.log('post cookie===' + JSON.stringify(cookies));
      // console.log('post cookie===' + (typeof cookies));
      // console.log('cookies.sessionId1===' + cookies.sessionid || null);
      // console.log('cookies.sessionId===' + cookies.sessionid);
      // const cookies = this.getCookes() || {}
      // const username = cookies.username || ''
      // const key = md5(url + JSON.stringify(data) + username)
      const key = md5(url + JSON.stringify(data));
      if (config.isCached && data.cache && config.cached.has(key)) {
        const res = config.cached.get(key);
        return Promise.resolve(res && res.data);
      }
      return this.api({
        method: 'post',
        url,
        // data: qs.stringify(data),
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then(res => {
        if (config.isCached && data.cache) config.cached.set(key, res);
        return res && res.data;
      });
    },
    async get (url, params) {
      const key = md5(url + JSON.stringify(params));
      // console.log('config.cached=== ' + config.cached)
      // console.log('config===  ' + JSON.stringify(config))

      if (config.isCached && params.cache && config.cached.has(key)) {
        const res = config.cached.get(key);
        // console.log('res==== ' + res)
        return Promise.resolve(res && res.data);
      }
      return this.api({
        method: 'get',
        url,
        params
      }).then(res => {
        if (config.isCached && params.cache) config.cached.set(key, res);
        return res && res.data;
      });
    }
  };
};
