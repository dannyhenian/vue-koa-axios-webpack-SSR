
import { mapGetters, mapActions, mapMutations } from 'vuex';
// import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import MyStore from '~js/utils/getData';
import changWorld from '~js/utils/changeWorld';
// import { urls } from '~js/api';
/* eslint-disable*/
import { skipHistory, skipFavorite, skipMessage, skipindex } from './utils/top-pageSkip';

export default {
  name: 'top',
  data () {
    return {
      messageNum: 0,
      hehe: '1',
      showTIme: false, // 是否显示大家都在看的书
      t1: null,
      t2: null,
      weiBoHref: 'http://59.110.124.41/novelapi/novelUserService/weibo/weiboLogin',
      message: 'this is header',
      searchBookValve: '', // 书籍搜索框 用户输入值
      websitName: '云纵文学官网',
      theme1: 'dark',
      // loginState: false,
      activeItem: this.$route.path.split('/')[1],
      recodeCode: null, // 0超管
      can_layout: true,
      value2: 0,
      iszs: null,
      speed: 10000,
      isUserSign: false,
      issiged: false,
      isLeft: true,
      isRight: false,
      dateList: [],
      year: '',
      month: '',
      rizi: '',
      currentType: '1',
      index: 0,
      timer: null,
      trans: 0,
      w_can_sign_click: true,
      /* eslint-disable global-require */
      his: require('../../assets/images/history.png'),
      boo: require('../../assets/images/booklist.png'),
      qian: require('../../assets/images/qiandao.png'),
      mes: require('../../assets/images/mes.png'),
      /* eslint-disable global-require */
      id: '',
      tmp: [
        {
          selection: '22',
          applyNumber: 12,
          applyTime: '1234234231',
          project: 'aSDfa',
          deviceType: 'M',
          imei: 'aefdz',
          brand: 'asd',
          model: 'asdf',
          revertTime: 'asdf',
          status: 'sdf'
        }
      ]
    };
  },

  // created () {
  //   this.recodeCode = localStorage.personInfo === undefined ? null : JSON.parse(localStorage.personInfo).recodeCode; // eslint-disable-line
  //   const user = JSON.parse(window.localStorage.getItem('personInfo')); // eslint-disable-line
  //
  //   this.topInit();
  //   this.isactive(this.$route);
  //   const date = new Date();
  //   this.year = date.getFullYear();
  //   this.month = date.getMonth() + 1;
  //   this.day = date.getDate();
  //   this.rizi = `${date.getFullYear()}年${1 * (date.getMonth() + 1)}月${date.getDate()}日`;
  // },

  computed: {
    ...mapGetters({
      searchBookList: 'home/top/getSearchBookList', // 搜索框 展示书籍列表
      noticeList: 'home/top/getNoticeList', // 系统公告
      isLogin: 'global/user/getIsLogin', // 是否登录
      username: 'global/user/getUsername', // 登录用户名
      userphoto: 'global/user/getUserphoto', // 登录用户头像
    }),
    loginState () {
      return this.isLogin;
    },

    // ...mapState({
    //   count: state => state.count,
    //   countAlias: 'count', // 别名 `count` 等价于 state => state.count
    //   name: 'name',
    //   ismodalLoginShow: 'modalLogin',
    //   isLogin: 'isLogin',
    //   userInfoChange: 'userInfoChange',
    //   searchItem1: 'searchitem'
    //
    //   // username: 'username',
    //   // userphoto: 'userphoto',
    // }),
    currentGoods () {
      return this.noticeList.filter((goods,index) => index == this.currentType - 1);// eslint-disable-line
    }
  },
  methods: {
    // 跳转到个人中心-》我的书架-》阅读历史
    _skipHistory () {
      skipHistory();
    },
    // 跳转到个人中心-》我的书架-》我的收藏
    _skipFavorite () {
      skipFavorite();
    } ,
    // 跳转到个人中心-》我的消息
    _skipMessage () {
      skipMessage();
    },
    // 跳转到首页 或 页面刷新
    _skipindex () {
      skipindex();
    },
    initIO () {
      // const socket = IO.connect('http://192.168.0.194:9998/MyMessageNum'); // eslint-disable-line
      // const socket = require('socket.io-client');
      const that = this;
      let socket = null;
      // console.log(io.connect);
      socket = io.connect('http://59.110.124.41:9998/MyMessageNum')  // eslint-disable-line
      // 发送初始参数（无参数就不需要加）
      socket.on('client', () => {
        console.log('建立链接')  // eslint-disable-line
      });
      socket.emit('client', MyStore.getCookie('sessionid'));
      socket.on('server', (data) => {
        console.log('=====',data)  // eslint-disable-line
        that.messageNum = JSON.parse(data).novelMessageCount;
      });
    },

    hoverchange1 () {
      this.his = require('../../assets/images/history2.png');
    },
    hoverout1 () {
      this.his = require('../../assets/images/history.png');
    },
    hoverchange2 () {
      this.boo = require('../../assets/images/booklist2.png');
    },
    w_hoverchange () {
      this.mes = require('../../assets/images/messageActive.png');
    },
    w_outchange () {
      this.mes = require('../../assets/images/mes.png');
    },
    hoverout2 () {
      this.boo = require('../../assets/images/booklist.png');
    },
    hoverchange3 () {
      this.qian = require('../../assets/images/qiandao2.png');
    },
    hoverout3 () {
      this.qian = require('../../assets/images/qiandao.png');
    },
    // animate() {
    //   clearInterval(this.timer);
    //   this.timer = setInterval(() => {
    //     if (this.index === this.list.length) {
    //       this.index = 0;
    //     }
    //     this.setIndex(this.index);
    //     this.index += 1;
    //   }, 10000);
    // },
    // setIndex(currentIndex) {
    //   this.list.forEach((category, index) => {
    //     if (index != currentIndex) {// eslint-disable-line
    //       /* eslint-disable no-param-reassign */
    //       this.currentType = currentIndex + 1;
    //       this.value1 = currentIndex;
    //     }
    //   });
    // },

    // 跳转到小说的书籍详情页
    showMenue (val) {
      this.$router.push({ path: `/detailsInfo/${val}` });
    },
    // 获取搜索推荐书籍列表
    async getShow () {
      console.log('isLogin==='+this.isLogin);
      console.log('username===' + this.username);
      console.log('userphoto==='+ this.userphoto);
      this.showTIme = true;
      if (this.searchBookList.length > 0) return; // 避免聚焦就请求接口
      // const demo = await this.$store.$api.get('/novelapi/novelOAService/mobile/homepage', {});
      // const { success, data } = await this.$store.$api.post(urls.hotNovels, {});
      const { success, data } = await this.fetchHotNovels({});
      if (success === true) {
        let bookList = [];
        for (let i = 0; i < data.hotNovels.length; i += 1) {
          bookList.push(data.hotNovels[i]);
        }
        this.$store.commit('home/top/receiveSearchBookList', bookList);
      }
      // console.log('searchBookList=====' + JSON.stringify(this.searchBookList));
    },
    // 隐藏搜索框推荐列表
    getHidden () {
      setTimeout(() => {
        this.showTIme = false;
      }, 200);
    },
    // 同步
    ...mapMutations({
      'changeUsername': 'global/user/receiveUsername',
      'changeUserphoto': 'global/user/receiveUserphoto'
    }),

    // ...mapMutations([
    //   'changeUsername',
    //   'changeUserphoto',
    //   'increment', // map `this.increment()` to `this.$store.commit('increment')`
    //   'loginModalShow',
    //   'changeLoginState',
    //   'changeSearchitem',
    //   // `mapMutations` also supports payloads:
    //   'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    // ]),
    // ...mapMutations({
    //   add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
    // }),
    // // 异步
    // ...mapActions([
    //   'incrementAsync', // map `this.increment()` to `this.$store.dispatch('increment')`
    //
    //   // `mapActions` also supports payloads:
    //   'incrementAsync' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    // ]),
    ...mapActions({
      fetchHotNovels: 'home/top/fetchHotNovels' // map `this.add()` to `this.$store.dispatch('increment')`
    }),

    loginCheck () {
      const user = JSON.parse(window.localStorage.getItem('personInfo'));
      const tmp = MyStore.getCookie('sessionid');
      if (user === null || tmp === null) {
        this.signOut();
        clearInterval(this.t1);
      }
    },
    third_weixin () {
      weiXinLogin({
        state: this.$route.fullPath
      }).then((res) => {
        if (res.data.success) {
          console.log(res.data.data); // eslint-disable-line
          const url = res.data.data;
          window.location.href = url;
        } else {
          this.$Message.error({
            content: res.data.message,
            duration: 2
          });
        }
      });
    },
    third_weibo () {},
    topInit () {
      const hasLogin = MyStore.getStore('isLogin');
      console.log(typeof(hasLogin)); // eslint-disable-line
      console.log(hasLogin); // eslint-disable-line
      if (hasLogin === 'true' && (MyStore.getCookie('sessionid') !== 'null' && MyStore.getCookie('sessionid'))) {
        this.loginState = true;
        const list = JSON.parse(MyStore.getStore('personInfo'));
        if (list && list !== 'null') {
          if (MyStore.getStore('loginWay') === 'WB') {
            console.log('qqqqqqqqqqqqqqqqqq');  // eslint-disable-line
            MyStore.addCookie('sessionid', list.sessionId, 7);
            MyStore.setStore('sessionid', list.sessionId);
            this.changeUsername(list.userNickName);
            this.changeUserphoto(list.userPhoto);
            MyStore.removeStore('loginWay');
            // this.username = list.userNickName;
            // this.userphoto = list.userPhoto;
            console.log(this.isLogin) // eslint-disable-line
          } else {
            // this.username = list.userNickName;
            // this.userphoto = list.userPhoto;
          }
        }
      } else {
        this.loginState = false;
        // this.signOut();
      }
    },
    handler () {
      this.asyncadd();
    },
    // 跳转登录页
    login () {
      /* const tmp = this.$route.query.channelId;
      localStorage.setItem('channelId', tmp); */
      this.$router.push({ path: '/login', query: { state: 0, redirect: this.$route.fullPath } });
    },
    // 跳转注册页
    register () {
      /* const tmp = this.$route.query.channelId;
      localStorage.setItem('channelId', tmp); */
      this.$router.push({ path: '/login', query: { state: 1, redirect: this.$route.fullPath } });
    },

    // 退出登录
    // signOut () {
    //   if (!this.can_layout) {
    //     return;
    //   }
    //   this.can_layout = false;
    //   SignOut().then(
    //     (res) => {
    //       this.can_layout = true;
    //       if (res.data.code === '1') {
    //         MyStore.deleteCookie('sessionid');
    //         MyStore.removeStore('sessionid');
    //         MyStore.removeStore('personInfo');
    //         MyStore.removeStore('loginWay');
    //         this.changeLoginState();
    //         MyStore.setStore('isLogin', false);
    //         console.log('退出成功');  //eslint-disable-line
    //         this.topInit();
    //         // console.log(this.$route);
    //         const tmpRoute = this.$route.path;
    //         if (tmpRoute === '/charge' || tmpRoute === '/library' || tmpRoute === '/ranking' || tmpRoute === '/') {
    //           this.$router.push({ path: tmpRoute });
    //         } else if (/personalCenter/.test(tmpRoute)) {
    //           this.$router.push({ path: '/personalCenter/' });
    //         }
    //       } else {
    //         this.$router.push({ path: '/' });
    //       }
    //     }
    //   ).catch(
    //     (err) => {
    //       console.log(err);  //eslint-disable-line
    //     }
    //   );
    // },
    // 根据书名或作者搜索
    searchItemHandle () {
      const searchValue = this.searchBookValve;
      const item = this.$route.params.item;
      console.log(item);//eslint-disable-line
      this.$store.commit('home/top/receiveSearchItem', searchValue);
      // console.log(searchValue);//eslint-disable-line
      if (searchValue !== '') {
        if (item === '0') {
          this.$router.push('/search/1');
        } else {
          this.$router.push('/search/0');
        }
      }
      this.showTIme = false;
    },
    // changePage () {
    //   if (MyStore.getStore('isLogin') === 'true') {
    //     myHomePage().then((res) => {
    //       if (res.data.success) {
    //         const tmp = res.data.data.userInfo;
    //         if (tmp.beWriter === 'true') {
    //           this.$router.push('/personalCenter/newBook');
    //           window.scrollTo(0, 0);
    //         } else if (tmp.beWriter === 'false') {
    //           this.$router.push('/bewriter');
    //           window.scrollTo(0, 0);
    //         } else if (tmp.beWriter === 'prohibit') {
    //           this.$Message.error({
    //             content: '对不起，您还不是作者身份！',
    //             duration: 2
    //           });
    //         } else {
    //           this.$Message.error({
    //             content: '对不起，您还不是作者身份！',
    //             duration: 2
    //           });
    //         }
    //       } else {
    //         this.$Message.error({
    //           content: '获取用户权限失败',
    //           duration: 2
    //         });
    //       }
    //     });
    //   } else {
    //     this.$router.push('/login');
    //     window.scrollTo(0, 0);
    //   }
    // },

    isactive (val) {
      const list = ['ALL', 'CLICK', 'SUBANDCOL', 'FINISH', 'UPDATE', 'NEW', 'DIAMOND', 'READING'];
      const list2 = ['bewriter'];
      this.checkPath(val, list, 'ranking');
      this.checkPath1(val, list2, 'personalCenter');
    },
    /* val 为路由，list为匹配数组, activeItem 需要高亮的menu名字 */
    checkPath (val, list, activeItem) {
      list.forEach((item) => {
        if (val.path.split('/')[2]) {
          if (val.path.split('/')[2] === item) {
            this.activeItem = activeItem || item;
          }
        }
      });
    },
    checkPath1 (val, list, activeItem) {
      list.forEach((item) => {
        if (val.path.split('/')[1]) {
          if (val.path.split('/')[1] === item) {
            this.activeItem = activeItem || item;
          }
        }
      });
    },
    /* 签到 */
    // skipSign () {
    //   this.isUserSign = true;
    //   this.riLi(this.year, this.month);
    // },
    // riLi (year, month) {
    //   const firstDay = this.getDate1(year, month);
    //   console.log(firstDay); // eslint-disable-line
    //   const lastDay = this.getDay1(year, month);
    //   this.dateList = [];
    //   for (let i = 1; i <= lastDay; i++) { // eslint-disable-line
    //     const data = {
    //       day: '',
    //       isSinged: false
    //     };
    //     data.day = i;
    //     this.dateList.push(data);
    //   }
    //   for (let i = 0; i < firstDay; i += 1) {
    //     const data = {
    //       day: '',
    //       isSinged: false
    //     };
    //     this.dateList.unshift(data);
    //   }
    //   const rq = month >= 10 ? JSON.stringify(year) + JSON.stringify(month) : JSON.stringify(year) + JSON.stringify(0) + JSON.stringify(month);
    //   getSigin({ signMonth: rq }).then((res) => {
    //     console.log(res);// eslint-disable-line
    //     this.w_can_sign_click = true;
    //     if (res.data.success) {
    //       res.data.data.forEach((item) => {
    //         const date1 = this.timestampToTime(item.signTime).split('-')[2];
    //         if(date1==this.day){// eslint-disable-line
    //           this.issiged = true;
    //         }
    //         this.dateList.forEach((item1) => {
    //           if(item1.day== date1){// eslint-disable-line
    //             item1.isSinged = true;// eslint-disable-line
    //           }
    //         });
    //       });
    //     }
    //   });
    //   console.log(this.dateList);// eslint-disable-line
    // },
    // 本月有多少天
    getDay1 (year, month) {
      const date = new Date(year, month, 0);
      return date.getDate();
    },
    // 本月的第一天是星期几
    getDate1 (year, month) {
      const date = new Date(year, month - 1, 1);
      return date.getDay();
    },
    // 上一个月
    preMonth () {
      this.month--;// eslint-disable-line
      if (this.month == 0) {// eslint-disable-line
        this.year--;// eslint-disable-line
        this.month = 12;
      }
      this.riLi(this.year, this.month);
      this.isLeft = false;
      this.isRight = true;
    },
    // 下一个月
    lastMonth () {
      this.month++;// eslint-disable-line
      if (this.month == 13) {// eslint-disable-line
        this.year++;// eslint-disable-line
        this.month = 1;
      }
      this.riLi(this.year, this.month);
      this.isLeft = true;
      this.isRight = false;
    },
    // 转换时间戳
    timestampToTime (timestamp) {
      const date = new Date(timestamp);
      const Y = `${date.getFullYear()}-`;
      const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
      const D = `${date.getDate()} `;
      return Y + M + D;
    },
    signin1 () {
      if (!this.w_can_sign_click) {
        return;
      }
      this.w_can_sign_click = false;
      signin({ userId: JSON.parse(window.localStorage.personInfo).userId }).then((res) => {
        if (res.data.success) {
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          this.riLi(year, month);
        }
      });
    },
    // 关闭签到框
    closeSign () {
      this.isUserSign = false;
      this.dateList = [];
      this.isLeft = true;
      this.isRight = false;
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
    }

  },
  components: {
  },
  filters: {
    fromWorld (val, params) {
      return changWorld(val, params);
    }
  },
  watch: {
    // isLogin () {
    //   this.topInit();
    // },
    userInfoChange () {
      this.topInit();
    },
    $route (val) {
      if(val.name!='search'){ //eslint-disable-line
        this.searchBookValve = '';
      }
      this.activeItem = val.path.split('/')[1];
      this.isactive(val);
    }
  },
  mounted () {
    // console.log('==========','123');  // eslint-disable-line
    // this.initIO();
  }
};
