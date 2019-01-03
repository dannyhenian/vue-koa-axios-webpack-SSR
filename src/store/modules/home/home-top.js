import { urls } from '~js/api';

const state = () => ({
  searchBookList: [], // 搜索框 展示书籍列表
  searchItem: '', // 搜索框 小说名
  noticeList: [] // 系统公告

});

const actions = {
  async fetchNoticeList (
    {
      commit,
      state,
      rootState: { $api }
    },
    config
  ) {
    console.log('开始获取系统公告');
    if (state.noticeList.length > 0) return; // 数据已经缓存，直接返回
    const { success, data } = await $api.post(urls.noticeList, { ...config, cache: true });
    if (success) {
      if (data.list && data.list.length > 0) {
        console.log('系统公告：' + JSON.stringify(data));
        let noticeLists = [];
        const costime = data.list[0].sysTime;
        data.list.forEach((item) => {
          if (item.status === '1') {
            console.log('公告的状态==' + item.status);
            noticeLists.push(item);
          } else {
            const date1 = new Date(item.overTime);
            const over = date1.getTime();
            const he = over - costime;
            if (he > 0) {
              noticeLists.push(item);
            }
          }
        });
        commit('receiveNoticList', noticeLists);
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
  namespaced: true,
  actions,
  state,
  mutations,
  getters
};
