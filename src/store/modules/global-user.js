// import { urls } from '~js/api';
import MyStore from '~js/utils/getData';
import { userModule } from '~js/utils/constant/storeCode';

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
    if (process.env.VUE_ENV !== 'server') {
      MyStore.setSyncStore(userModule.userName, payload);
    }
    state.userName = payload;
  },
  receiveUserphoto (state, payload) {
    if (process.env.VUE_ENV !== 'server') {
      MyStore.setSyncStore(userModule.userphoto, payload);
    }
    state.userphoto = payload;
  },
  loginSuccess (state) {
    if (process.env.VUE_ENV !== 'server') {
      MyStore.setSyncStore(userModule.isLogin, true);
    }
    state.isLogin = true;
  },
  exitLogin (state) {
    if (process.env.VUE_ENV !== 'server') {
      MyStore.setSyncStore(userModule.isLogin, false);
    }
    state.isLogin = false;
  }
};

const getters = {
  getIsLogin (state) {
    return MyStore.getSyncStore(userModule.isLogin) || state.isLogin;
  },
  getUsername (state) {
    return MyStore.getSyncStore(userModule.userName) || state.userName;
  },
  getUserphoto (state) {
    return MyStore.getSyncStore(userModule.userphoto) || state.userphoto;
  }
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
};
