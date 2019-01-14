import { createApp } from './app';
import { api } from '~api';
const CircularJSON = require('circular-json');

export default context => {
  // 返回Promise 等待异步路由钩子函数或组件
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    // 设置服务端router的位置
    router.push(context.url);
    console.log('server cookie====' + JSON.stringify(context.cookies));

    // 等到 router 将可能的异步组件和钩子解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents(); // 返回目标位置或是当前路由匹配的组件数组

      matchedComponents.forEach((v, i) => { console.log('matchedComponents== ' + JSON.stringify(matchedComponents[i])); });

      //  如果匹配不到, 返回404
      if (!matchedComponents.length) {
        /* eslint-disable */
        return reject({ code: 404 })
      }

      // console.log('context.cookies===' + CircularJSON.stringify(context.cookies))
      // store.$api = store.state.$api = api(context.cookies)
      store.$api = store.state.$api = api(context.cookies)

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(
        ({ asyncData }) => asyncData && asyncData({
          store,
          route: router.currentRoute,
          cookies: context.cookies,
          isServer: true,
          isClient: false
        })
      )).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        // console.log('context.url== ' + context.url)
        console.log('context.state== ' + CircularJSON.stringify(context.state));
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
