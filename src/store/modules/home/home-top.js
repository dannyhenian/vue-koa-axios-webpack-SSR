import { urls } from '~js/api';

const state = () => ({
  searchBookList: [], // 搜索框 展示书籍列表
  searchItem: '', // 搜索框 小说名
  noticeList: [] // 系统公告

});

const actions = {
  async getNoticeList (
    {
      commit,
      state,
      rootState: { $api }
    },
    config
  ) {
    if (state.noticeList.length > 0) return; // 数据已经缓存，直接返回
    const { success, data } = await $api.post(urls.noticeList, { ...config, cache: true });
    if (success) {
      if (data.list && data.list.length > 0) {
        let list = [];
        const costime = data.list[0].sysTime;
        data.list.forEach((item) => {
          if (item.status == 1) {// eslint-disable-line
            this.list.push(item);
          } else {
            const date1 = new Date(item.overTime);
            const over = date1.getTime();
            const he = over - costime;
            if (he > 0) {
              list.push(item);
            }
          }
        });
        commit('receiveNoticList', list);
      }
    }
  }
};

const mutations = {
  receiveSearchBookList (state, bookList) {
    state.searchBookList = bookList;
  },
  receiveSearchItem (state, searchValue) {
    state.searchItem = searchValue;
  },
  receiveNoticList (state, list) {
    state.noticeList = list;
  }

};

const getters = {
  getSearchBookList (state) {
    return state.searchBookList;
  },
  getSearchItem (state) {
    return state.searchItem;
  },
  getNoticeList (state) {
    return state.noticeList;
  }
};

export default {
  actions,
  state,
  mutations,
  getters
};