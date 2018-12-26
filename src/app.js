import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import { createRouter } from './router';
import { createStore } from './store';

import App from './App.vue';
import * as filters from './filters';
import TitleMixin from './mixins/title-mixins';

Vue.use(iView);
Vue.mixin(TitleMixin);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// createApp工厂方法
export function createApp (context) {
  // 创建 router 和 store 实例
  const router = createRouter();
  const store = createStore();

  // 同步路由状态(route state)到 store
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
    // ...App
  });

  return { app, router, store };
}
