import './polyfill' // 引入全局的语法，如Promise

import Vue from 'vue'
import api from '~api'

import { createApp } from './app'

Vue.mixin({
  // 当复用的路由组件参数发生变化时，例如/library/1 => /library/2
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// 如果有__INITIAL_STATE__变量，则将store的状态用它替换
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
  store.$api = store.state.$api = api
}

router.onReady(() => {
  // 通过路由勾子，执行拉取数据逻辑   注册一个全局守卫
  router.beforeResolve((to, from, next) => {
    // 找到增量组件，拉取数据
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if (!activated.length) {
      return next()
    }
    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({
          store,
          route: to,
          isServer: false,
          isClient: true
        })
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
  })
  app.$mount('#app')
})
