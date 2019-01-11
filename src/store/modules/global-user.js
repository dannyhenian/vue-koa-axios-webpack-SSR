
const state = () => ({
  isLogin: false,
  loginState: false,
  userName: '', // 登录用户名
  userphoto: '', // 登录用户头像地址
  userRole: '',
  cookies: '',
  sessionId: ''
});

const actions = {
};

const mutations = {
  receiveUsername (state, payload) {
    state.username = payload;
  },
  receiveUserphoto (state, payload) {
    state.userphoto = payload;
  },
  loginSuccess (state) {
    state.isLogin = true;
  },
  exitLogin (state) {
    state.isLogin = false;
  }
};

const getters = {
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
};
