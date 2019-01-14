import { urls } from '~js/api';

const state = () => ({
  recommendImageLists: [], // 首页编辑推荐5本书，以轮播图展示
  recommendNovelLists: [], // 首页精选推荐
  freeCrunchies: [] // 首页-免费榜
});

const actions = {
  async fetchRecommendImageLists (
    {
      commit,
      state,
      rootState: { $api }
    },
    config
  ) {
    if (state.recommendImageLists.length > 0) return; // 数据已经缓存，直接返回
    const { success, data } = await $api.get(urls.getRecommendList, { ...config, cache: true });
    // console.log('轮播图=====' + JSON.stringify(data));
    if (success) {
      data.forEach((item, index) => {
        if (index === 0) {
          item.isActive = true;// eslint-disable-line
        } else {
          item.isActive = false;// eslint-disable-line
        }
      });
      commit('receiveRecommendImageLists', data);
    }
  },
  async fetchRecommendNovelLists (
    {
      commit,
      state,
      rootState: { $api }
    },
    config
  ) {
    if (state.recommendNovelLists.length > 0) return; // 数据已经缓存，直接返回
    const { success, data } = await $api.post(urls.queryChoiceRecommend, { ...config, cache: true });
    // console.log('精品推荐========' + JSON.stringify(data));
    if (success) {
      if (data && data.length > 0) {
        commit('receiveRecommendNovelLists', data);
      }
    }
  },
  async fetchFreeCrunchies (
    {
      commit,
      state,
      rootState: { $api }
    },
    config
  ) {
    if (state.freeCrunchies.length > 0) return; // 数据已经缓存，直接返回
    const { success, data } = await $api.post(urls.crunchies, { ...config, cache: true });
    // console.log('免费榜========' + JSON.stringify(data));
    if (success) {
      if (data && data.WEEK.length > 0) {
        commit('receiveFreeCrunchies', data.WEEK);
      }
    }
  }

};

const mutations = {
  receiveRecommendImageLists (state, list) {
    state.recommendImageLists = list;
  },
  receiveRecommendNovelLists (state, list) {
    state.recommendNovelLists = list;
  },
  receiveFreeCrunchies (state, list) {
    state.freeCrunchies = list;
  }

};

const getters = {
  getRecommendImageLists (state) {
    return state.recommendImageLists;
  },
  getRecommendNovelLists (state) {
    return state.recommendNovelLists;
  },
  // 首页 免费榜
  getFreeRank (state) {
    return state.freeCrunchies;
  },
  getFreeRankList (state) {
    let rankList = [];
    if (state.freeCrunchies.length > 0) {
      rankList = state.freeCrunchies.slice(1, 10);
    }
    return rankList;
  },
  getFreeOneList (state) {
    let oneList = [];
    if (state.freeCrunchies.length > 0) {
      oneList = [state.freeCrunchies[0]];
    }
    return oneList;
  }
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
};
