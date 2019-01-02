import Vue from 'vue';
import Vuex from 'vuex';

import testDemo from './modules/testDemo';

import global from './modules/global';
import globalUser from './modules/global-user';
import homeTop from './modules/home/home-top';

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
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
          top: homeTop
        }

      }

    }
  });
}
