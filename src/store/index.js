import Vue from 'vue';
import Vuex from 'vuex';

import testDemo from './modules/testDemo';
import global from './modules/global';
import globalUser from './modules/global-user';

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
          category: globalUser
        }
      }

    }
  });
}
