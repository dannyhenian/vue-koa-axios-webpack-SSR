<template>
  <div class="page-top" id="page-top">
    <Header>
      <div class="content header-content">
        <div class="logo" @click="skipindex()">{{websitName}}</div>
        <div style="display: inline-block;position:relative">
            <input type="text" name="searchInput" style="display:none"/>
            <Input
            name="searchInput"
            v-model.trim="value11"
            type="text"
             @on-keyup.enter="searchItem()"
            @on-focus="getShow"
            @on-blur="gethidden"
            placeholder="找书、找作者"/>
            <div v-if="showTIme" class="searchShow">
                <div style="font-size: 14px;color:#999;border-bottom: 1px solid #ddd;
                padding-bottom: 3px;line-height: 23px">大家都在看</div>
                <div class="menuList" v-for="(tmp,index) in arrayList" :key="index"
                     @click="showMenue(tmp.id)">
                    <i></i>  {{tmp.title | fromWorld(16)}}
                </div>
            </div>
            <span class="search1" @click="searchItem()">
              <img src="../assets/search.png" alt="">
            </span>
        </div>
        <div class="header-content-right">
          <!--<div class="third_login" v-show="!loginState">-->
            <!--<a :href="weiBoHref"><img src="../assets/weibo_big.png" alt=""></a>-->
            <!--<img src="../assets/weixin_big.png" alt="" @click="third_weixin">-->
          <!--</div>-->
          <div class="headportrait">
            <router-link to="/personalCenter" v-show="loginState">
                <img src="../assets/topphoto.png" alt=""
                v-if="userphoto==''">
                <img :src='userphoto' alt="" v-else>
            </router-link>
            <div class="user" v-show="loginState">
              <p class="username">{{username}}</p>
              <p @click="signOut" class="signout1">退出</p>
            </div>
            <div class="user login" v-show="!loginState">
              <span @click="login">
                <a  class="login1">
                  登录
                </a>
              </span>
              <span @click="register">
                <a  class="register1">
                  注册
                </a>
              </span>
            </div>
          </div>
          <ul class="user-item">
            <li>
              <span><img :src="his"></span>
              <span>
                <a   @click="skipHistory()" @mouseover="hoverchange1" @mouseout="hoverout1">历史</a>
              </span>
            </li>
            <li>
              <span><img :src="boo"></span>
              <span>
                <a   @click="skipFavorite()" @mouseover="hoverchange2" @mouseout="hoverout2">书架</a>
              </span>
            </li>
            <li class="message">
              <span><img :src="mes"></span>
              <span class="special">
                <span class="count" v-show="loginState"><em>{{messageNum}}</em></span>
                <a @click="skipMessage()" @mouseover="w_hoverchange" @mouseout="w_outchange" style="margin-right: 20px;">消息</a>
              </span>
            </li>
            <li v-show="loginState">
              <span><img :src="qian"></span>
              <span>
                <a   @click="skipSign()" @mouseover="hoverchange3" @mouseout="hoverout3">签到</a>
              </span>
            </li>
          </ul>

        </div>
        <div class="notice" v-if="list.length!=0">
          <div class="waim">
            <div class="wai1">
              <img src="../assets/laba.png" alt="">
            </div>
            <div class="nrwaim">
              <p class="kuang">
                <marquee class="ggcontent1" scrollAmount=5 >
                  <div v-if="list.length>1" v-for="(item,index) in list" :key="index" class="hhhh">
                    <div class="wai">
                      [系统公告]
                    </div>
                    :
                    {{item.content}}
                  </div>
                  <div  v-if="list.length==1"  class="hhhh">
                    <div class="wai">
                      [系统公告]
                    </div>
                    :
                    {{list[0].content}}
                  </div>
                </marquee>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Header>
    <div class="nav-menu">
      <div class="content nav-content">
         <Menu mode="horizontal" :theme="theme1" :active-name="activeItem">
           <!-- eslint-disable -->
          <MenuItem name="">
            <router-link to="/">首页</router-link>
          </MenuItem>
          <MenuItem name="ranking">
            <router-link to="/ranking/0">排行</router-link>
          </MenuItem>
          <MenuItem name="library">
            <router-link to="/library/1">书库</router-link>
          </MenuItem>
          <MenuItem name="recharge">
            <router-link to="/recharge">充值</router-link>
          </MenuItem>
          <MenuItem name="personalCenter">
            <router-link to="/personalCenter">个人中心</router-link>
          </MenuItem>
          <MenuItem name="welfare">
                 <router-link to="/welfare" target="_blank">作者福利</router-link>
           </MenuItem>
          <MenuItem name="manage" v-if="recodeCode === 0||recodeCode === 101" v-show="loginState">
            <router-link to="/manage/manage_book">管理</router-link>
          </MenuItem>
          <MenuItem name="endit" v-if="recodeCode === 101" v-show="loginState">
            <router-link to="/endit">编辑</router-link>
          </MenuItem>
           <!--eslint-enable-->
           <Dropdown style="margin-left: 20px;position: absolute;right:0;" trigger="click">
                <Button type="primary" @click="changePage()">
                  <Icon type="chevron-down"></Icon>
                    创建作品
                </Button>
            </Dropdown>
        </Menu>
        <div class="user-sign" v-if="isUserSign">
          <img src="../assets/personCenter/cha.png" alt="" class="cha"
          @click="closeSign">
          <div class="user-sign-left">
            <ul class="left-top">
              <li>日</li>
              <li>一</li>
              <li>二</li>
              <li>三</li>
              <li>四</li>
              <li>五</li>
              <li>六</li>
            </ul>
            <div class="left-center">
              <span @click="preMonth" v-if="isLeft">
                <img src="../assets/personCenter/zuo.png" alt="">
              </span>
              <span @click="lastMonth" v-if="isRight">
                <img src="../assets/personCenter/you.png" alt="">
              </span>
            </div>
            <ul class="left-content">
              <li v-for="(item, index) in dateList" :key="index"
              :class="{signed:item.isSinged}">{{item.day}}</li>
            </ul>
          </div>
          <div class="user-sign-right">
            <div class="right-head">
              <p class="date">{{rizi}}</p>
              <!-- <p class="date">2018年8月23日</p> -->
              <p class="btn" v-if="issiged==false" @click="signin1">立即签到</p>
              <p class="btn1" v-if="issiged==true">已签到</p>
            </div>
            <div class="right-info">
              <p class="infoTitle1">签到规则</p>
                <p>签到可获得推荐票1张，</p>
                <p>点数1.5连续签到7天，</p>
                <p>可额外获得5点以及10</p>
                <p>阅读币</p>
                <p class="infoTitle1">其他说明</p>
                <p>如中间断签，累计天数</p>
                <p>清零，重新计算</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import IO from 'socket.io-client'; */
import { mapState, mapMutations, mapActions } from 'vuex';
/* import IO from '../js/utils/socket.io'; */
/* import {connectMsgNum} from '../js/utils/socket.io'; */
import MyStore from '../js/utils/getData';
import changWorld from '../js/utils/changeWorld';
import { SignOut, weiXinLogin, getSigin, signin, hotNovels, noticeList, myHomePage } from '../js/api';
// import { UsrInfo } from '../js/utils/getData';
export default {
  name: 'top',
  data () {
    return {
      messageNum: 0,
      hehe: '1',
      arrayList: [],
      showTIme: false,
      t1: null,
      t2: null,
      weiBoHref: 'http://59.110.124.41/novelapi/novelUserService/weibo/weiboLogin',
      message: 'this is header',
      value11: '',
      websitName: '云纵文学官网',
      theme1: 'dark',
      username: '',
      userphoto: '',
      loginState: false,
      activeItem: this.$route.path.split('/')[1],
      recodeCode: null, // 0超管
      can_layout: true,
      value2: 0,
      iszs: null,
      speed: 10000,
      list: [],
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
      his: require('../assets/history.png'),
      boo: require('../assets/booklist.png'),
      qian: require('../assets/qiandao.png'),
      mes: require('../assets/mes.png'),
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
  /* sockets:{
    connect(){
      this.id = this.$socket.id;
      console.log('==========',this.id);
    },
    client(data){ //监听message事件，方法是后台定义和提供的
      console.log(data); // eslint-disable-line
    },

  }, */
  created () {
    this.recodeCode = localStorage.personInfo === undefined ? null : JSON.parse(localStorage.personInfo).recodeCode; // eslint-disable-line
    const user = JSON.parse(window.localStorage.getItem('personInfo')); // eslint-disable-line
    noticeList({
      fuzzyQuery: '',
      pageNum: '0',
      pageSize: '0'
    }).then((res) => {
      if (res.data.success) {
        if (res.data.data.list.length != 0) {// eslint-disable-line
          const costime = res.data.data.list[0].sysTime;
          res.data.data.list.forEach((item) => {
            if (item.status == 1) {// eslint-disable-line
              this.list.push(item);
            } else {
              const date1 = new Date(item.overTime);
              const over = date1.getTime();
              const he = over - costime;
              if (he > 0) {
                this.list.push(item);
              }
            }
          });
        } else {
          this.list = [];
        }
      }
    });
    /* if (user) {
      this.t1 = setInterval(() => {
        this.loginCheck();
      }, 5000);
    } */
    this.topInit();
    this.isactive(this.$route);
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.rizi = `${date.getFullYear()}年${1 * (date.getMonth() + 1)}月${date.getDate()}日`;
  },
  computed: {
    ...mapState({
      count: state => state.count,
      countAlias: 'count', // 别名 `count` 等价于 state => state.count
      name: 'name',
      ismodalLoginShow: 'modalLogin',
      isLogin: 'isLogin',
      userInfoChange: 'userInfoChange',
      searchItem1: 'searchitem'

      // username: 'username',
      // userphoto: 'userphoto',
    }),
    currentGoods () {
        return this.list.filter((goods,index) => index == this.currentType - 1);// eslint-disable-line
    }
    /* username: {
      get() {
        return this.$store.state.username;
      },
      set(val) {
        this.$store.commit('changeUsername', val);
      },
    },
    userphoto: {
      get() {
        return this.$store.state.userphoto;
      },
      set(val) {
        this.$store.commit('changeUserphoto', val);
      },
    }, */
  },
  methods: {
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
      this.his = require('../assets/history2.png');
    },
    hoverout1 () {
      this.his = require('../assets/history.png');
    },
    hoverchange2 () {
      this.boo = require('../assets/booklist2.png');
    },
    w_hoverchange () {
      this.mes = require('../assets/messageActive.png');
    },
    w_outchange () {
      this.mes = require('../assets/mes.png');
    },
    hoverout2 () {
      this.boo = require('../assets/booklist.png');
    },
    hoverchange3 () {
      this.qian = require('../assets/qiandao2.png');
    },
    hoverout3 () {
      this.qian = require('../assets/qiandao.png');
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
    showMenue (val) {
      // this.value11 = val;
      this.$router.push({ path: `/detailsInfo/${val}` });
    },
    getShow () {
      this.showTIme = true;
      hotNovels({}).then((res) => {
        for (let i = 0; i < res.data.data.hotNovels.length; i += 1) {
          this.arrayList.push(res.data.data.hotNovels[i]);
        }
        // console.log(this.arrayList); // eslint-disable-line
      });
    },
    gethidden () {
      setTimeout(() => {
        this.showTIme = false;
      }, 200);
    },
    // 同步
    ...mapMutations([
      'changeUsername',
      'changeUserphoto',
      'increment', // map `this.increment()` to `this.$store.commit('increment')`
      'loginModalShow',
      'changeLoginState',
      'changeSearchitem',
      // `mapMutations` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
    }),
    // 异步
    ...mapActions([
      'incrementAsync', // map `this.increment()` to `this.$store.dispatch('increment')`

      // `mapActions` also supports payloads:
      'incrementAsync' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      asyncadd: 'incrementAsync' // map `this.add()` to `this.$store.dispatch('increment')`
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
          location.href = url;
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
            this.username = list.userNickName;
            this.userphoto = list.userPhoto;
            console.log(this.isLogin) // eslint-disable-line
            // window.location.replace('http://web.ngrok.zc2422.top:8081/novel/index.html?#/');
            this.changeLoginState();
            console.log(this.isLogin) // eslint-disable-line
          } else {
            this.username = list.userNickName;
            this.userphoto = list.userPhoto;
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
    login () {
      /* const tmp = this.$route.query.channelId;
      localStorage.setItem('channelId', tmp); */
      this.$router.push({ path: '/login', query: { state: 0, redirect: this.$route.fullPath } });
    },
    register () {
      /* const tmp = this.$route.query.channelId;
      localStorage.setItem('channelId', tmp); */

      this.$router.push({ path: '/login', query: { state: 1, redirect: this.$route.fullPath } });
    },
    signOut () {
      if (!this.can_layout) {
        return;
      }
      this.can_layout = false;
      SignOut().then(
        (res) => {
          this.can_layout = true;
          if (res.data.code === '1') {
            MyStore.deleteCookie('sessionid');
            MyStore.removeStore('sessionid');
            MyStore.removeStore('personInfo');
            MyStore.removeStore('loginWay');
            this.changeLoginState();
            MyStore.setStore('isLogin', false);
            console.log('退出成功');  //eslint-disable-line
            this.topInit();
            // console.log(this.$route);
            const tmpRoute = this.$route.path;
            if (tmpRoute === '/charge' || tmpRoute === '/library' || tmpRoute === '/ranking' || tmpRoute === '/') {
              this.$router.push({ path: tmpRoute });
            } else if (/personalCenter/.test(tmpRoute)) {
              this.$router.push({ path: '/personalCenter/' });
            }
          } else {
            this.$router.push({ path: '/' });
          }
        }
      ).catch(
        (err) => {
          console.log(err);  //eslint-disable-line
        }
      );
    },
    searchItem () {
      const searchValue = this.value11;
      const item = this.$route.params.item;
      console.log(item);//eslint-disable-line
      this.changeSearchitem(searchValue);
      console.log(searchValue);//eslint-disable-line
      if (searchValue !== '') {
        if (item === '0') {
          this.$router.push('/search/1');
        } else {
          this.$router.push('/search/0');
        }
      }
      this.showTIme = false;
    },
    changePage () {
      if (MyStore.getStore('isLogin') === 'true') {
        myHomePage().then((res) => {
          if (res.data.success) {
            const tmp = res.data.data.userInfo;
            if (tmp.beWriter === 'true') {
              this.$router.push('/personalCenter/newBook');
              scrollTo(0, 0);
            } else if (tmp.beWriter === 'false') {
              this.$router.push('/bewriter');
              scrollTo(0, 0);
            } else if (tmp.beWriter === 'prohibit') {
              this.$Message.error({
                content: '对不起，您还不是作者身份！',
                duration: 2
              });
            } else {
              this.$Message.error({
                content: '对不起，您还不是作者身份！',
                duration: 2
              });
            }
          } else {
            this.$Message.error({
              content: '获取用户权限失败',
              duration: 2
            });
          }
        });
      } else {
        this.$router.push('/login');
        scrollTo(0, 0);
      }
    },
    skipHistory () {
      if (MyStore.getStore('isLogin') === 'true') {
        this.$router.push('/personalCenter/myBookrack/readingHistory');
      } else {
        this.$router.push('/login');
      }
    },
    skipFavorite () {
      if (MyStore.getStore('isLogin') === 'true') {
        this.$router.push('/personalCenter/myBookrack');
      } else {
        this.$router.push('/login');
      }
    },
    skipMessage () {
      if (MyStore.getStore('isLogin') === 'true') {
        this.$router.push('/personalCenter/myMessage');
      } else {
        this.$router.push('/login');
      }
    },
    skipindex () {
      if (this.$route.path.split('/')[1]) {
        this.$router.push('/');
      } else {
        location.reload();
      }
    },
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
    skipSign () {
      this.isUserSign = true;
      this.riLi(this.year, this.month);
    },
    riLi (year, month) {
      const firstDay = this.getDate1(year, month);
      console.log(firstDay); // eslint-disable-line
      const lastDay = this.getDay1(year, month);
      this.dateList = [];
      for (let i = 1; i <= lastDay; i++) { // eslint-disable-line
        const data = {
          day: '',
          isSinged: false
        };
        data.day = i;
        this.dateList.push(data);
      }
      for (let i = 0; i < firstDay; i += 1) {
        const data = {
          day: '',
          isSinged: false
        };
        this.dateList.unshift(data);
      }
      const rq = month >= 10 ? JSON.stringify(year) + JSON.stringify(month) : JSON.stringify(year) + JSON.stringify(0) + JSON.stringify(month);
      getSigin({ signMonth: rq }).then((res) => {
        console.log(res);// eslint-disable-line
        this.w_can_sign_click = true;
        if (res.data.success) {
          res.data.data.forEach((item) => {
            const date1 = this.timestampToTime(item.signTime).split('-')[2];
            if(date1==this.day){// eslint-disable-line
              this.issiged = true;
            }
            this.dateList.forEach((item1) => {
              if(item1.day== date1){// eslint-disable-line
                item1.isSinged = true;// eslint-disable-line
              }
            });
          });
        }
      });
      console.log(this.dateList);// eslint-disable-line
    },
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
      signin({ userId: JSON.parse(localStorage.personInfo).userId }).then((res) => {
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
    isLogin () {
      this.topInit();
    },
    userInfoChange () {
      this.topInit();
    },
    $route (val) {
      if(val.name!='search'){ //eslint-disable-line
        this.value11 = '';
      }
      this.activeItem = val.path.split('/')[1];
      this.isactive(val);
    }
  },
  mounted () {
    console.log('==========','123');  // eslint-disable-line
    this.initIO();
    /* this.$socket.emit('connect',MyStore.getCookie('sessionid'));
    this.$socket.emit('client',MyStore.getCookie('sessionid')); */
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" lang="scss" scoped>
#page-top{
    .ivu-menu-dark{
        background-color: rgba(0,0,0,0)!important;
    }
    .nav-menu{
        user-select: none;
        width: 100%;
        background-color: #ff6032;
        height: 54px;
        .nav-content{
          position: relative;
          li{
            width: 119px;
            text-align: center;
            a{
              color: #ffffff;
              font-size: 16px;
            }

          }
          button{
            background-color: white;
            color: #ff5267;
            border: 0;
            border-radius: 16px;
            width: 126px;
            height: 32px;
            font-size: 14px;
          }
          button:hover{
            background-color: #ffe7e7;
          }
          .user-sign{
          width: 544px;
          height: 388px;
          background-image:url("../assets/personCenter/signbackground.png");
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 999;
          .cha{
            position: absolute;
            right: -10px;
            top: -10px;
            cursor: pointer;
          }
          .user-sign-left{
            float: left;
            width: 326px;
            height: 388px;
            margin-left: 8px;
            margin-right: 23px;
            .left-top{
              width: 100%;
              height: 38px;
              li{
                float: left;
                width: 46px;
                height: 38px;
                line-height: 38px;
                color: #fff;
                font-size: 12px;
                text-align: center;
              }
            }
            .left-center{
              width: 100%;
              height: 37px;
              text-align: center;
              span{
                display: inline-block;
                width: 23px;
                height: 23px;
                cursor: pointer;
                margin-top: 13px;
                img{
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
                }
              }
            }
            .left-content{
              width: 100%;
              height: 296px;
              li{
                float: left;
                width: 40px;
                height: 46px;
                line-height: 46px;
                color: #b86b2e;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 6px !important;
                margin-right: 6px;
              }
              .signed{
                background-image: url('../assets/personCenter/circle.png');
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
              }
            }
          }
          .user-sign-right{
            float: left;
            width: 167px;
            height: 374px;
            margin-top: 7px;
            background-image:url("../assets/personCenter/sign.png");
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center;
            .right-head{
              width: 100%;
              height: 112px;
              padding-top: 33px;
              .date{
                font-size: 12px;
                color: #f08300;
                margin-left: 13px;
                line-height: 12px;
                margin-bottom: 4px;
              }
              .btn{
                width: 119px;
                height: 45px;
                line-height: 39px;
                text-align: center;
                background-image: url("../assets/personCenter/signicon1.png");
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
                margin-left: 30px;
                font-size: 14px;
                font-weight: bold;
                color:#d46c06;
                cursor: pointer;
              }
              .btn1{
                width: 119px;
                height: 45px;
                line-height: 39px;
                text-align: center;
                background-image: url("../assets/personCenter/signicon2.png");
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
                margin-left: 30px;
                font-size: 14px;
                font-weight: bold;
                color:#308701;
              }
            }
            .right-info{
              width: 100%;
              height: 259px;
              padding-top: 29px;
              padding-left: 24px;
              padding-right: 15px;
              p{
                margin-bottom: 16px;
                font-size: 12px;
                color:#fc9b32;
                line-height: 12px;
              }
              .infoTitle1{
                font-size: 12px;
                font-weight: bold;
              }
            }
          }
        }
        }
    }
    .ivu-layout-header{
        padding: 0;
        background-color: #f6f6f6;
        height: 127px;
        line-height: 90px;

        .header-content{
            position: relative;
            .logo{
                display: inline-block;
                width: 191px;
                height: 50px;
                line-height: 50px;
                background: url('../assets/logo2.png') no-repeat center;
                background-size: 100%;
                text-indent: -99999px;
                cursor: pointer;
            }
            .search1{
              display: inline-block;
              width: 17px;
              height: 16px;
              position: absolute;
              right: 15px;
              top: 37px;
              cursor: pointer;
              img{
                width: 100%;
                height: 100%;
                vertical-align: top;
              }
            }
            .ivu-input-wrapper {
              width: 285px!important;
            }
            .header-content-right{
              position: relative;
                float: right;
                .third_login{
                  float: left;
                  margin-top: 5px;
                  img{
                    cursor: pointer;
                  }
                }
                .headportrait{
                  font-size: 14px;
                  color:#999999;
                  float: left;
                  margin-top: 25px;
                  margin-right: 15px;
                  img{
                    width: 40px;
                    height: 40px;
                    margin-right: 8px;
                    vertical-align: middle;
                    float: left;
                    border-radius: 50%;
                  }
                  .user{
                      float: right;
                      &.login{
                         width:100px;
                         height: 90px;
                         display:table;
                         font-size:16px;
                         color: #505050;
                         position:relative;
                       top:-25px;
                       right:-15px;
                          span{
                            display: table-cell;
                            width:50px;
                            height:90px;
                            line-height:90px;
                            text-align: center;
                            cursor: pointer;
                          }
                       }
                      p{
                        line-height: 14px;
                        cursor: pointer;
                      }
                      .username{
                        font-size: 16px;
                        line-height: 16px;
                        color: #fa165b;
                        margin-bottom: 7px;
                        cursor: auto;
                      }
                      .login1:hover{
                        color: #eb4a4d;
                      }
                      .register1:hover{
                        color: #eb4a4d;
                      }
                      .signout1:hover{
                        color: #eb4a4d;
                      }
                  }
                }
                .user-item{
                    float: right;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    font-size: 16px;
                    color: #505050;
                    li{
                        &.message{
                          position: relative;
                        }
                      .special{
                        position: relative;
                        .count{
                          position: absolute;
                          top: -14px;
                          right: 2px;
                          em{
                            color: #fff;
                            font-size: 12px;
                            font-style: normal;
                            background-color:red;
                            padding: 2px;
                            border-radius: 50%;
                          }
                        }
                      }
                        display: inline-block;
                        margin-right: 20px;
                        span{
                          display:inline-block;
                          font-size: 16px;
                          color: #505050;
                          cursor: pointer;
                          img{
                            width: 100%;
                            height: 100%;
                            vertical-align:middle;
                          }
                        }
                    }
                    li:nth-child(3){
                      margin-right: 0;
                    }
                }

            }
            .notice{
              position: absolute;
              bottom: 7px;
              width: 1123px;
              font-size: 16px;
              line-height: 44px;
              height: 44px;
              left: 82px;
              padding-left: 30px;
              background-image:url("../assets/gonggao.png");
              background-size: 100%;
              background-repeat: no-repeat;
              background-position: center;
              .waim{
                width: 100%;
                height: 100%;
                .wai1{
                  float: left;
                  width: 28px;
                  height: 27px;
                  margin-top: 8px;
                  margin-right: 12px;
                  img{
                    width: 100%;
                    height: 100%;
                    vertical-align: top
                  }
                }

                .nrwaim{
                  float: left;
                  width: 1040px;
                  .kuang{
                    .hhhh{
                      display: inline-block;
                      margin-right: 30px;
                      .wai{
                       display: inline-block;
                        color: #ff6032;
                      }
                    }
                    .hhhh:last-child{
                      margin-right: 0;
                    }
                  }
                }
              }
            }
            .searchShow{
                background-color: #fafafa;
                width:285px;
                height:204px;
                padding: 12px;
                box-sizing: border-box;
                position: absolute;
                top:68px;
                z-index: 30000;
                border: 1px solid #ddd;
                overflow: hidden;
                .menuList{
                    width:256px;
                    border:1px solid transparent;
                    overflow:hidden;
                    margin-top:2px;
                    line-height: 28px;
                    z-index: 30000;
                    cursor: pointer;
                    font-size: 14px;
                    color:#666;
                    &:hover{
                        background-color: #e3f1ff;
                    }
                    i{
                        display: inline-block;
                        width:9px;
                        height:9px;
                        border-radius: 50%;
                        background-color:#ff9678 ;
                        margin-right: 3px;
                    }
                }

            }
        }
    }
}
</style>
