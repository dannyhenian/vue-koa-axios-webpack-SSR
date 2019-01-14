import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

import testDemo from './modules/testDemo';

import global from './modules/global';
import globalUser from './modules/global-user';
import homeTop from './modules/home/home-top';
import homeRecommend from './modules/home/home-recommend';

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    // plugins: (process.env.VUE_ENV !== 'server') ? [createPersistedState({
    //   storage: window.sessionStorage
    // })] : [],
    modules: {
      demo: {
        namespaced: true,
        ...testDemo
      },
      global: {
        namespaced: true,
        ...global,
        modules: {
          user: globalUser
        }
      },
      home: {
        namespaced: true,
        modules: {
          top: homeTop,
          recommend: homeRecommend
        }

      }

    }
  });
}
