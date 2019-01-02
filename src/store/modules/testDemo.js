import Vue from 'vue'
const state = () => ({
  movie: {},
  test: {}
})

const actions = {
  fetchMovie ({ commit }, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id })
      }, 500)
    }).then(res => {
      commit('setMoive', { res })
    })
  },
  fetchTest ({ commit }, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id })
      }, 500)
    }).then(res => {
      commit('setTest', { res })
    })
  }
}

const mutations = {
  setMoive (state, { res }) {
    Vue.set(state, 'movie', res)
  },
  setTest (state, { res }) {
    Vue.set(state, 'test', res)
  }

}

const getters = {
  getGlobal (state) {
    return state
  }
}

export default {
  actions,
  state,
  mutations,
  getters
}
