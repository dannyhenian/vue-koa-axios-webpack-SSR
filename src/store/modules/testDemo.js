import Vue from 'vue';
const state = () => ({
  movie: {}
});

const actions = {
  fetchMovie ({ commit }, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id });
      }, 500);
    }).then(res => {
      commit('setMoive', { res });
    });
  }
};

const mutations = {
  setMoive (state, { res }) {
    Vue.set(state, 'movie', res);
  }
};

const getters = {
  getGlobal (state) {
    return state;
  }
};

export default {
  actions,
  state,
  mutations,
  getters
};
