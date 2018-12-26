const LRU = require('lru-cache');
// const CircularJSON = require('circular-json')

let api;
// const cached = false
const cached = true;
// 缓存
const lruCache = new LRU({
  max: 1000, // 最大緩存数
  maxAge: 1000 * 60 * 15 // 重要提示：条目在 15 分钟后过期。
});

if (process.__API__) {
  api = process.__API__; // 定义全局变量 process.__API__
} else {
  api = process.__API__ = {
    api: 'http://localhost:8080/api/',
    port: 8080,
    timeout: 30000,
    isCached: cached,
    cached: lruCache,
    cachedItem: {}
  };
}

// console.log(JSON.stringify(api))
// console.log(CircularJSON.stringify(process))
// console.log(CircularJSON.stringify(process.__API__))

module.exports = api;
