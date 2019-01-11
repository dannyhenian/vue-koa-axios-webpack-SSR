<template>
  <div class="userModule">
    <!--class-name="login-content user_module"-->
    <Modal
      v-model="LoginShow"
      :class-name="myClass"
      visible="true"
      :closable="false"
      :mask-closable="false"
      :scrollable="true">
      <div slot="header">
        <img :src="closeHref" alt="" @click="modalClose">
      </div>
      <div class="login_main">
        <div class="top-wrap">
          <ul>
            <li @click="toggleLogin(1)"><span :class="{active:toggle==true}">登录</span></li>
            <li @click="toggleLogin(2)"><span :class="{active:toggle==false}">注册</span></li>
          </ul>
        </div>
        <div class="content-wrap">
          <div class="content-login" v-show="toggle===true">
            <div class="middle">
              <div class="container">
                <img :src="usernameHref" alt="" class="pre">
                <Input
                        v-model.trim="log_user"
                        type="text"
                        placeholder="用户邮箱"
                        @on-blur="log_m_user"
                        style="width: 100%"/>
                <p class="warm" ref="user"></p>
              </div>
              <div class="container">
                <img :src="passwordHref" alt="" class="pre">
                <Input
                        v-model.trim="log_PWD"
                        type="password"
                        placeholder="用户密码"
                        style="width: 100%"
                        @on-blur="log_m_PWD"
                        @on-keyup.enter="sign_in"
                />
                <p class="warm" ref="pwd"></p>
              </div>
              <div class="signIn" :disabled="useLogin" @click="sign_in">登录</div>
              <p class="forget"><span  @click="goToForget">忘记密码</span></p>
              <div class="thirdLogin">
                <span>第三方账号登录：</span>
                <a :href="qqHref">
                  <img :src="qqImg" alt="">
                </a>
                <!--<a :href="">-->
                  <img :src="weiXinImg" alt="" @click="toWechartLogin">
                <!--</a>-->
                <a :href="weiBoHref">
                  <img :src="weiBoImg" alt="">
                </a>
              </div>
            </div>
          </div>
          <div class="content-register" v-show="toggle===false">
            <div class="container">
              <img :src="usernameHref" alt="" class="pre">
              <Input
                      v-model.trim="reg_userName"
                      type="text"
                      placeholder="请输入昵称"
                      @on-blur="reg_m_userName"
                      style="width: 100%"/>
              <img :src="rightImg" alt="" v-show="isNickOk" class="next">
              <img :src="errorImg" alt="" v-show="isNickError" class="next">
              <p class="warm" ref="userName"
                 :class="{warmActive:reg_username_warm}">1-20位英文、中文或数字组成</p>
            </div>
            <div class="container">
              <span class="require">*</span>
              <img :src="emailHref" alt="" class="pre">
              <Input
                      v-model.trim="reg_email"
                      type="text"
                      placeholder="请输入邮箱地址"
                      style="width: 100%"
                      @on-blur="reg_m_email"
              />
              <img :src="rightImg" alt="" v-show="isEmailOk" class="next">
              <img :src="errorImg" alt="" v-show="isEmailError" class="next">
              <p class="warm" ref="reg_emailAdd"></p>
            </div>
            <div class="container">
              <span class="require">*</span>
              <img :src="passwordHref" alt="" class="pre">
              <Input
                      v-model.trim="reg_pwd"
                      type="password"
                      placeholder="请设置登录密码"
                      style="width: 100%"
                      @on-blur="reg_m_pwd"
              />
              <img :src="rightImg" alt="" v-show="isPWDOk" class="next">
              <img :src="errorImg" alt="" v-show="isPWDError" class="next">
              <p class="warm" ref="passWD" :class="{warmActive:reg_pwd_warm}">
                6-12位英文、数字或者特殊字符组成</p>
            </div>
            <div class="container">
              <span class="require">*</span>
              <img :src="passwordHref" alt="" class="pre">
              <Input
                      v-model.trim="reg_rePWD"
                      type="password"
                      placeholder="请重复输入密码"
                      style="width: 100%"
                      @on-blur="reg_m_confirmPWD"
              />
              <img :src="rightImg" alt="" v-show="isRePWDOk" class="next">
              <img :src="errorImg" alt="" v-show="isRePWDError" class="next">
              <p class="warm" ref="re_PWD"></p>
            </div>
            <div class="container code">
              <img :src="codeHref" alt="" class="pre">
              <Input
                      v-model.trim="reg_code"
                      type="text"
                      placeholder="输入邮箱验证码"
                      @on-blur="reg_m_code"
              />
              <button :class="{active:isActive}"
                      @click="reg_sendCode"
                      ref="account"
                      style="color: #fff;"
                      :disabled="reg_noUse"
              >发送验证码</button>
              <p class="warm" ref="code"></p>
            </div>
            <div class="protocol" style="padding: 10px 0;">
              <Checkbox v-model="single">
                <span>我已阅读并同意</span>
                <router-link tag="a" style="color: #0596e9;"
                             target="_blank"
                             :to="{path:'/regards',query:{params:'user_protocol'}}">
                  《用户注册协议》</router-link>
              </Checkbox>
            </div>
            <div class="login-btn">
              <div @click="reg_confirm" >注册</div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>

    <Modal
            v-model="forget"
            class-name="forget user_module"
            :closable="false"
            :mask-closable="false"
    >
      <div slot="header">
        <img :src="closeHref" alt="" @click="isForgetPWD">
      </div>
      <div class="my_header">
        忘记密码
      </div>
      <div class="content-wrap">
        <div class="container">
          <span class="require">*</span>
          <img :src="emailHref" alt="" class="pre">
          <Input
                  v-model="forget_email"
                  type="text"
                  placeholder="请输入邮箱地址"
                  @on-blur="for_m_user"
                  style="width: 100%"/>
          <img :src="rightImg" alt="" v-show="for_isEmailOk" class="next">
          <img :src="errorImg" alt="" v-show="for_isEmailError" class="next">
          <p class="warm" ref="forget_mail" :class="{warmActive:for_email_warm}">6-12位英文、中文或数字组成</p>
        </div>
        <div class="container code">
          <img :src="codeHref" alt="" class="pre">
          <Input
                  v-model="forget_code_con"
                  type="text"
                  placeholder="请输入6位验证码"
                  @on-blur="forget_m_code"
          />
          <button :class="{active:forget_isActive}"
                  @click="forget_sendCode"
                  style="color: #fff;"
                  ref="forget_account" :disabled="forget_noUse">发送验证码</button>
          <p class="warm" ref="forget_code"></p>
        </div>
        <div class="container">
          <span class="require">*</span>
          <img :src="passwordHref" alt="" class="pre">
          <Input
                  v-model="forget_pwd"
                  type="password"
                  :disabled="for_input"
                  placeholder="请输入新密码"
                  @on-blur="forget_m_pwd"
                  style="width: 100%"/>
          <img :src="rightImg" alt="" v-show="for_isPWDOk" class="next">
          <img :src="errorImg" alt="" v-show="for_isPWDError" class="next">
          <p class="warm" ref="forget_pwd_warm"
             :class="{warmActive:for_pwd_warm}">6-12位英文、数字或特殊字符组成</p>
        </div>
        <div class="container">
          <span class="require">*</span>
          <img :src="passwordHref" alt="" class="pre">
          <Input
                  v-model="forget_re_pwd"
                  type="password"
                  :disabled="for_input"
                  placeholder="请重复输入密码"
                  @on-blur="forget_m_re_pwd"
                  style="width: 100%"/>
          <img :src="rightImg" alt="" v-show="for_isRePWDOk" class="next">
          <img :src="errorImg" alt="" v-show="for_isRePWDError" class="next">
          <p class="warm" ref="forget_re_pwd_warm"></p>
        </div>
        <div class="login-btn2">
          <div class="reset" @click="modify">重置</div>
          <div class="cancel" @click="isForgetPWD">关闭</div>
        </div>
      </div>
      <div slot="footer">

      </div>
    </Modal>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import md5 from 'js-md5';
/* import QRCode from '../../js/utils/qrcode'; */
import MyStore from '~js/utils/getData';
import { urls } from '~js/api';
// import QRCode from 'jqcodejs2 ';  // eslint-disable-line
// import { Login, Register, GetCode, ForgetGetCode,
//   GetForgetPWD, CheckEmail, CheckNickName, QQLoginBack, WeiBoLoginBack,
//   weiXinLogin } from '../../js/api';
import { domainURL } from '~js/utils/domainName';
import metaMixin from '~mixins/title-mixins';

export default{
  data () {
    return {
      domainURL,
      channelId: '',
      qrCode: false,
      /* 测试环境用 */
      /* qqHref: `http://59.110.124.41/novelapi/novelUserService/qq/login?state=ok_${this.channelId}`, */
      /* weiBoHref: `http://59.110.124.41/novelapi/novelUserService/weibo/weiboLogin?state=register_${this.channelId}`, */
      /* 生产环境用 */
      // qqHref: `http://47.98.104.8/novelapi/novelUserService/qq/login?state=ok_${this.channelId}`,
      // weiBoHref: `http://47.98.104.8/novelapi/novelUserService/weibo/weiboLogin?state=register_${this.channelId}`,
      /* eslint-disable global-require */
      qqImg: require('../../assets/images/qqIcon.png'),
      weiXinImg: require('../../assets/images/weChatIcon.png'),
      weiBoImg: require('../../assets/images/weiboIcon.png'),
      closeHref: require('../../assets/images/closeIcon.png'),
      usernameHref: require('../../assets/images/usernameIcon.png'),
      passwordHref: require('../../assets/images/passwordIcon.png'),
      emailHref: require('../../assets/images/email.png'),
      codeHref: require('../../assets/images/code.png'),
      rightImg: require('../../assets/images/rightIcon.png'),
      errorImg: require('../../assets/images/errorIcon.png'),
      /* eslint-enable global-require */
      tmpUR: '',

      /* 登录和注册 */
      // LoginShow: false,
      LoginShow: true,
      toggle: true,
      warmActive: true,

      /* 登录 */
      log_user: '',
      log_PWD: '',
      useLogin: false,

      /* 注册 */
      single: true,
      isNickOk: false,
      isNickError: false,
      isEmailOk: false,
      isEmailError: false,
      isPWDOk: false,
      isPWDError: false,
      isRePWDOk: false,
      isRePWDError: false,
      reg_username_warm: true,
      reg_pwd_warm: true,
      time: 180,
      reg_userName: '',
      reg_email: '',
      reg_pwd: '',
      reg_rePWD: '',
      reg_code: '',
      noUse: false,
      isActive: false,
      canClick: false,
      reg_noUse: false,
      canUse: true,
      reg_timer: null, // 定时器

      /* 忘记密码 */
      for_input: true,
      for_timer: null, // 定时器
      for_isEmailOk: false,
      for_isEmailError: false,
      for_isPWDOk: false,
      for_isPWDError: false,
      for_isRePWDOk: false,
      for_isRePWDError: false,
      for_email_warm: true,
      for_pwd_warm: true,
      // for_re_pwd_warm: true,
      forget_time: 180,
      forget: false,
      for_user: '',
      forget_noUse: false,
      forget_isActive: false,
      forget_email: '',
      forget_pwd: '',
      forget_code_con: '',
      forget_re_pwd: ''
    };
  },
  // created () {
  //   console.log('666'); // eslint-disable-line
  //   this.channelId = window.localStorage.getItem('channelId');
  //   if (!this.channelId) {
  //     this.channelId = -1;
  //   }
  //   const code = this.$route.query.code;
  //   const state = this.$route.query.state ? this.$route.query.state : 0;
  //   /* if (!this.channelId || this.channelId === 'undefined') {
  //     this.channelId = '';
  //   } */
  //   /* if(state.indexOf('ok_')){
  //     console.log('qqq');
  //   }
  //   if(state.indexOf('ok_')) */
  //   this.LoginShow = true;
  //   // 0 表示登录  1表示注册
  //   if (state === 1) {
  //     this.toggle = false;
  //   }
  //   if (state === 0) {
  //     this.toggle = true;
  //   }
  //
  //   /* qq登录 */
  //   if (code && state.indexOf('ok_') !== -1) {
  //     QQLoginBack({
  //       code,
  //       state,
  //       loginType: 'pc'
  //     }).then(
  //       (res) => {
  //         this.LoginShow = !this.LoginShow;
  //         window.localStorage.setItem('sessionid', res.data.data.sessionId);
  //         MyStore.addCookie('sessionid', res.data.data.sessionId, 7);
  //         MyStore.setStore('personInfo', res.data.data);
  //         this.changeUsername(res.data.data.userNickName);
  //         this.changeUserphoto(res.data.data.userPhoto);
  //         this.$store.commit('changeLoginState');
  //         MyStore.setStore('isLogin', true);
  //         // const arr = state.split('_');
  //         // if (arr[2] === 'wap') {
  //         //   const url = 'http://59.110.124.41:8000/home';
  //         //   location.href = url;
  //         //   return;
  //         // }
  //         this.$router.push({ path: '/' });
  //       }
  //     ).catch(
  //       (err) => {
  //         console.log(err);  // eslint-disable-line
  //       }
  //     );
  //   }
  //   /* 微博登录 */
  //   if (code && state.indexOf('register_') !== -1) {
  //     console.log('=====weibo'); // eslint-disable-line
  //     WeiBoLoginBack({
  //       code,
  //       state,
  //       loginType: 'pc'
  //     }).then(
  //       (res) => {
  //         console.log(res); // eslint-disable-line
  //         console.log('weibo'); // eslint-disable-line
  //         this.LoginShow = !this.LoginShow;
  //         window.localStorage.setItem('sessionid', res.data.data.sessionId);
  //         MyStore.addCookie('sessionid', res.data.data.sessionId, 7);
  //         MyStore.setStore('personInfo', res.data.data);
  //         console.log(this.$store.state.isLogin); // eslint-disable-line
  //         this.changeUsername(res.data.data.userNickName);
  //         this.changeUserphoto(res.data.data.userPhoto);
  //         console.log(this.$store.state.isLogin); // eslint-disable-line
  //         this.$store.commit('changeLoginState');
  //         console.log(this.$store.state.isLogin); // eslint-disable-line
  //         MyStore.setStore('isLogin', true);
  //         this.$router.push({ path: '/' });
  //       }
  //     ).catch(
  //       (err) => {
  //         console.log(err);  // eslint-disable-line
  //       }
  //     );
  //   }
  // },
  mixins: [metaMixin],
  computed: {
    myClass () {
      if (this.toggle) {
        return 'login-content user_module';
      }
      return 'login-content user_module two';
    },
    qqHref () {
      return `${this.domainURL}/novelapi/novelUserService/qq/login?state=ok_${this.channelId}&loginType=pc`;
    },
    weiBoHref () {
      return `${this.domainURL}/novelapi/novelUserService/weibo/weiboLogin?state=register_${this.channelId}&loginType=pc`;
    }

  },
  beforeRouteLeave (to, from, next) {
    window.localStorage.removeItem('ReadAndDetail');
    window.localStorage.removeItem('userNovelId');
    next();
  },
  beforeRouteEnter (to, from, next) {
    if (/(reading)|(detailsInfo)/.test(from.path)) {
      window.localStorage.setItem('ReadAndDetail', from.path);
      window.localStorage.setItem('userNovelId', from.params.id);
    }
    next();
  },
  methods: {
    ...mapMutations({
      'changeUsername': 'global/user/receiveUsername',
      'changeUserphoto': 'global/user/receiveUserphoto'
    }),

    // 微信登录
    toWechartLogin () {
      // this.$router.replace(this.$route.query.redirect || '/');
      // console.log(this.$route.query.redirect); // eslint-disable-line
      // weiXinLogin({
      //   state: `${this.$route.query.redirect}`
      // }).then((res) => {
      //   if (res.data.success) {
      //     console.log(res.data.data); // eslint-disable-line
      //     const url = res.data.data;
      //     window.location.href = url;
      //   } else {
      //     this.$Message.error({
      //       content: res.data.message,
      //       duration: 2
      //     });
      //   }
      // });
    },

    /* 登录和注册 */
    modalClose () {
      if (Number(this.$route.query.state) === 5) {
        this.$router.push({ path: '/' });
        return;
      }
      this.LoginShow = !this.LoginShow;
      this.log_user = '';
      this.log_PWD = '';
      this.$refs.user.innerHTML = '';
      this.$refs.pwd.innerHTML = '';

      this.reg_userName = '';
      this.reg_email = '';
      this.reg_pwd = '';
      this.reg_rePWD = '';
      this.reg_code = '';
      this.$refs.userName.innerHTML = '1-20位英文、中文或数字组成';
      this.$refs.reg_emailAdd.innerHTML = '';
      this.$refs.passWD.innerHTML = '6-12位英文、数字或特殊字符组成';
      this.$refs.re_PWD.innerHTML = '';
      this.$refs.code.innerHTML = '';
      this.isNickOk = false;
      this.isNickError = false;
      this.isEmailOk = false;
      this.isEmailError = false;
      this.isPWDOk = false;
      this.isPWDError = false;
      this.isRePWDOk = false;
      this.isRePWDError = false;
      this.reg_username_warm = true;
      this.reg_pwd_warm = true;

      if (window.sessionStorage.getItem('formOther') === '0') {
        window.history.back();
      } else {
        this.$router.push({ path: '/' });
      }
    },
    toggleLogin (index) {
      if (index === 2) {
        this.toggle = false;
        this.log_user = '';
        this.log_PWD = '';
        this.$refs.user.innerHTML = '';
        this.$refs.pwd.innerHTML = '';
        this.reg_userName = '';
        this.reg_email = '';
        this.reg_pwd = '';
        this.reg_rePWD = '';
        this.reg_code = '';
        this.$refs.userName.innerHTML = '1-20位英文、中文或数字组成';
        this.$refs.reg_emailAdd.innerHTML = '';
        this.$refs.passWD.innerHTML = '6-12位英文、数字或特殊字符组成';
        this.$refs.re_PWD.innerHTML = '';
        this.$refs.code.innerHTML = '';
        this.isNickOk = false;
        this.isNickError = false;
        this.isEmailOk = false;
        this.isEmailError = false;
        this.isPWDOk = false;
        this.isPWDError = false;
        this.isRePWDOk = false;
        this.isRePWDError = false;
        this.reg_username_warm = true;
        this.reg_pwd_warm = true;
      } else if (index === 1) {
        this.toggle = true;
        this.reg_userName = '';
        this.reg_email = '';
        this.reg_pwd = '';
        this.reg_rePWD = '';
        this.reg_code = '';
        this.$refs.userName.innerHTML = '1-20位英文、中文或数字组成';
        this.$refs.reg_emailAdd.innerHTML = '';
        this.$refs.passWD.innerHTML = '6-12位英文、数字或特殊字符组成';
        this.$refs.re_PWD.innerHTML = '';
        this.$refs.code.innerHTML = '';
        this.isNickOk = false;
        this.isNickError = false;
        this.isEmailOk = false;
        this.isEmailError = false;
        this.isPWDOk = false;
        this.isPWDError = false;
        this.isRePWDOk = false;
        this.isRePWDError = false;
        this.reg_username_warm = true;
        this.reg_pwd_warm = true;
      }
    },

    goToForget () {
      this.LoginShow = false;
      this.forget = true;
    },
    isEmail (data) {
      const reg = /^([\x21-\x7e]{4,})@(([a-z0-9/]{2,20})(\.[a-z]{2,3}){1,2})$/;
      if (reg.test(data)) {
        return true;
      }
      return false;
    },
    isPassword (data) {
      const reg = /^[\x21-\x7e]{6,12}$/;
      if (!reg.test(data)) {
        return false;
      }
      return true;
    },

    /* 登录 */
    log_m_user () {
      this.$refs.user.innerHTML = '';
      if (this.log_user === '') {
        this.$refs.user.innerHTML = '邮箱不能为空';
        return;
      }
      if (!this.isEmail(this.log_user)) {
        this.$refs.user.innerHTML = '邮箱格式不正确';
      }
      if (this.$refs.pwd.innerHTML) {
        this.$refs.pwd.innerHTML = '';
      }
    },
    log_m_PWD () {
      this.$refs.pwd.innerHTML = '';
      if (this.log_PWD === '') {
        this.$refs.pwd.innerHTML = '密码不能为空';
        return;
      }
      if (!this.isPassword(this.log_PWD)) {
        this.$refs.pwd.innerHTML = '密码格式不正确';
      }
    },
    async sign_in () {
      if (this.$refs.user.innerHTML || this.$refs.pwd.innerHTML) {
        this.useLogin = false;
        return;
      }
      this.useLogin = true;
      this.$refs.pwd.innerHTML = '';
      if (this.log_user === '' || this.log_PWD === '') {
        this.$refs.pwd.innerHTML = '用户名或密码不能为空';
      }
      const { code, message, data } = await this.$store.$api.post(urls.login, { keyword: this.log_user, userPassword: md5(this.log_PWD) });
      this.useLogin = false;
      if (code === '0') {
        this.$refs.pwd.innerHTML = message;
      }
      if (code === '1') {
        this.LoginShow = !this.LoginShow;
        // window.localStorage.setItem('sessionid', data.sessionId);
        if (MyStore.getCookie('sessionid')) {
          MyStore.removeStore('sessionid');
        }
        window.localStorage.setItem('sessionid', data.sessionId);
        MyStore.addCookie('sessionid', data.sessionId, 7);
        MyStore.setStore('personInfo', data);
        // this.$store.commit('changeLoginState');
        this.$store.commit('global/user/loginSuccess');
        this.changeUsername(data.userNickName);
        this.changeUserphoto(data.userPhoto);
        this.log_user = '';
        this.log_PWD = '';
        MyStore.setStore('isLogin', true);
        const ReadAndDetail = window.localStorage.getItem('ReadAndDetail');
        if (/(detailsInfo)/.test(ReadAndDetail)) {
          const tmp = window.localStorage.getItem('userNovelId');
          this.$router.push({ path: `/detailsInfo/${tmp}` });
        } else {
          this.$router.replace(this.$route.query.redirect || '/');
        }
      }
    },

    /* 注册 */
    reg_m_userName () {
      this.isNickOk = false;
      this.isNickError = false;
      this.reg_username_warm = false;
      this.$refs.userName.innerHTML = '';
      if (this.reg_userName === '') {
        this.isNickError = true;
        this.$refs.userName.innerHTML = '昵称不能为空';
        return;
      }
      const reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,20}$/;
      if (!reg.test(this.reg_userName)) {
        this.$refs.userName.innerHTML = '昵称格式不正确';
        this.isNickError = true;
      }
      // CheckNickName({
      //   nickName: this.reg_userName
      // })
      //   .then(
      //     (res) => {
      //       if (res.data.code === '1') {
      //         this.isNickOk = true;
      //       } else {
      //         this.isNickError = true;
      //         this.$refs.userName.innerHTML = '昵称已被注册';
      //       }
      //       this.reg_username_warm = true;
      //     })
      //   .catch(
      //     (err) => {
      //       console.log(err); // eslint-disable-line
      //     }
      //   );
    },
    reg_m_email () {
      this.isEmailOk = false;
      this.isEmailError = false;
      this.$refs.reg_emailAdd.innerHTML = '';
      if (this.reg_email === '') {
        this.$refs.reg_emailAdd.innerHTML = '邮箱不能为空';
        this.isEmailError = true;
        return;
      }
      if (!this.isEmail(this.reg_email)) {
        this.$refs.reg_emailAdd.innerHTML = '邮箱格式不正确';
        this.isEmailError = true;
      }
      // CheckEmail({
      //   userEmail: this.reg_email
      // })
      //   .then(
      //     (res) => {
      //       console.log(res); // eslint-disable-line
      //       if (res.data.code === '1') {
      //         this.isEmailError = true;
      //         this.$refs.reg_emailAdd.innerHTML = '邮箱已被注册';
      //       } else {
      //         this.isEmailOk = true;
      //       }
      //     }
      //   )
      //   .catch(
      //     (err) => {
      //       console.log(err); // eslint-disable-line
      //     }
      //   );
    },
    reg_m_pwd () {
      this.isPWDOk = false;
      this.isPWDError = false;
      this.reg_pwd_warm = false;
      this.$refs.passWD.innerHTML = '';
      if (this.reg_pwd === '') {
        this.isPWDError = true;
        this.$refs.passWD.innerHTML = '密码不能为空';
        return;
      }
      if (!this.isPassword(this.reg_pwd)) {
        this.isPWDError = true;
        this.$refs.passWD.innerHTML = '密码格式不正确';
        return;
      }
      this.isPWDOk = true;
      this.reg_pwd_warm = true;
    },
    reg_m_confirmPWD () {
      this.isRePWDOk = false;
      this.isRePWDError = false;
      this.$refs.re_PWD.innerHTML = '';
      if (this.reg_rePWD === '') {
        this.$refs.re_PWD.innerHTML = '密码不能为空';
        this.isRePWDError = true;
        return;
      }
      if (!this.isPassword(this.reg_rePWD)) {
        this.$refs.re_PWD.innerHTML = '密码格式不正确';
        this.isRePWDError = true;
        return;
      }
      if (this.reg_pwd !== this.reg_rePWD) {
        this.$refs.re_PWD.innerHTML = '密码不一致';
        this.isRePWDError = true;
        return;
      }
      this.isRePWDOk = true;
    },
    reg_m_code () {
      this.$refs.code.innerHTML = '';
      if (this.reg_code === '') {
        this.$refs.code.innerHTML = '请输入验证码';
        return;
      }
      const reg = /^\d{6}$/;
      if (!reg.test(this.reg_code)) {
        this.$refs.code.innerHTML = '验证码格式错误';
      }
    },
    reg_sendCode () {
      if (this.reg_email === '' || this.reg_pwd === '' || this.reg_rePWD === '') return;
      if (this.$refs.userName.innerHTML || this.$refs.reg_emailAdd.innerHTML ||
        this.$refs.passWD.innerHTML || this.$refs.re_PWD.innerHTML) {
        return;
      }
      this.reg_noUse = true;
      this.isActive = true;
      this.$refs.account.innerHTML = '180s';
      this.reg_timer = setInterval(() => {
        this.time -= 1;
        this.$refs.account.innerHTML = `${this.time}s`;
        if (this.time <= 0) {
          clearInterval(this.reg_timer);
          this.isActive = false;
          this.$refs.code.innerHTML = '请重新获取验证码';
          this.reg_noUse = false;
          this.time = 180;
          this.$refs.account.innerHTML = '发送验证码';
        }
      }, 1000);
      // GetCode({ keyword: this.reg_email })
      //   .then(
      //     (res) => {
      //       if (res.data.code === '1') {
      //         this.$refs.code.innerHTML = '请输入验证码';
      //       } else if (res.data.message === 'undefined') {
      //         this.$refs.code.innerHTML = '请输入验证码';
      //       } else {
      //         this.$refs.code.innerHTML = res.data.message;
      //       }
      //     }
      //   ).catch(
      //     (err) => {
      //     console.log(err); // eslint-disable-line
      //     }
      //   );
    },
    reg_confirm () {
      // this.reg_userName = '';  eslint-disable-line
      if (this.reg_email === '' || this.reg_pwd === '' ||
        this.reg_rePWD === '' || this.reg_code === '') {
        this.$refs.code.innerHTML = '请填写完整信息';
        return;
      }
      if (!this.single) {
        this.$Message.error({
          content: '请阅读注册协议',
          duration: 2
        });
      }
      // Register({
      //   nickName: this.reg_userName,
      //   keyword: this.reg_email,
      //   userPassword: md5(this.reg_pwd),
      //   code: this.reg_code,
      //   channelId: Number(this.channelId) })
      //   .then(
      //     (res) => {
      //       console.log(res.data); // eslint-disable-line
      //       this.isActive = false;
      //       this.reg_noUse = false;
      //       this.$refs.account.innerHTML = '发送验证码';
      //       clearInterval(this.reg_timer);
      //       /* 注册成功 */
      //       if (res.data.code === '1') {
      //         /* this.isActive = false;
      //         this.reg_noUse = false;
      //         this.$refs.account.innerHTML = '发送验证码';
      //         clearInterval(this.reg_timer); */
      //         this.$Message.info({
      //           content: '注册成功',
      //           duration: 2
      //         });
      //         this.toggle = true;
      //       }
      //       if (res.data.code === '0') {
      //         this.$refs.code.innerHTML = res.data.message;
      //       }
      //     }
      //   ).catch(
      //     (err) => {
      //     console.log(err); // eslint-disable-line
      //     }
      //   );
    },

    /* 忘记密码 */
    isForgetPWD () {
      this.forget = !this.forget;

      this.forget_email = '';
      this.forget_pwd = '';
      this.forget_code_con = '';
      this.forget_re_pwd = '';
      this.$refs.forget_mail.innerHTML = '';
      this.$refs.forget_code.innerHTML = '';
      this.$refs.forget_pwd_warm.innerHTML = '';
      this.$refs.forget_re_pwd_warm.innerHTML = '';

      window.history.back();
    },
    for_m_user () {
      this.for_isEmailOk = false;
      this.for_isEmailError = false;
      this.for_email_warm = false;
      this.$refs.forget_mail.innerHTML = '';
      if (this.forget_email === '') {
        this.for_isEmailError = true;
        this.$refs.forget_mail.innerHTML = '邮箱不能为空';
        return;
      }
      if (!this.isEmail(this.forget_email)) {
        this.for_isEmailError = true;
        this.$refs.forget_mail.innerHTML = '邮箱格式不正确';
        return;
      }
      this.for_isEmailOk = true;
      this.for_email_warm = true;
    },
    forget_m_code () {
      this.$refs.forget_code.innerHTML = '';
      if (this.forget_code_con === '') {
        this.$refs.forget_code.innerHTML = '验证码不能为空';
        return;
      }
      const reg = /[0-9]{6}/;
      if (!reg.test(this.forget_code_con)) {
        this.$refs.forget_code.innerHTML = '验证码格式错误';
        return;
      }
      this.for_input = false;
    },
    forget_sendCode () {
      if (this.forget_email === '') return;
      if (this.$refs.forget_mail.innerHTML) {
        return;
      }
      this.forget_noUse = true;
      this.forget_isActive = true;
      this.$refs.forget_account.innerHTML = '180s';
      this.for_timer = setInterval(() => {
        this.forget_time -= 1;
        this.$refs.forget_account.innerHTML = `${this.forget_time}s`;
        if (this.forget_time <= 0) {
          clearInterval(this.for_timer);
          this.forget_isActive = false;
          console.log(this.$refs.forget_code); // eslint-disable-line
          this.$refs.forget_code.innerHTML = '请重新获取验证码';
          this.forget_noUse = false;
          this.forget_time = 180;
          this.$refs.forget_account.innerHTML = '发送验证码';
        }
      }, 1000);
      // ForgetGetCode({ keyword: this.forget_email })
      //   .then(
      //     (res) => {
      //       // console.log(res.data); // eslint-disable-line
      //       if (res.data.code === '1') {
      //         this.$refs.forget_code.innerHTML = '请输入验证码';
      //       } else {
      //         this.forget_isActive = false;
      //         this.forget_noUse = false;
      //         clearInterval(this.for_timer);
      //         this.$refs.forget_account.innerHTML = '发送验证码';
      //         this.$refs.forget_code.innerHTML = res.data.message;
      //       }
      //     }
      //   ).catch(
      //     (err) => {
      //         console.log(err); // eslint-disable-line
      //     }
      //   );
    },
    forget_m_pwd () {
      this.for_isPWDOk = false;
      this.for_isPWDError = false;
      this.for_pwd_warm = false;
      this.$refs.forget_pwd_warm.innerHTML = '';
      if (this.forget_pwd === '') {
        this.for_isPWDError = true;
        this.$refs.forget_pwd_warm.innerHTML = '请输入新密码';
        return;
      }
      if (!this.isPassword(this.forget_pwd)) {
        this.for_isPWDError = true;
        this.$refs.forget_pwd_warm.innerHTML = '密码格式不正确';
        return;
      }
      this.for_isPWDOk = true;
      this.for_pwd_warm = true;
    },
    forget_m_re_pwd () {
      this.for_isRePWDOk = false;
      this.for_isRePWDError = false;
      this.for_re_pwd_wram = false;
      this.$refs.forget_re_pwd_warm.innerHTML = '';
      if (this.forget_re_pwd === '') {
        this.for_isRePWDError = true;
        this.$refs.forget_re_pwd_warm.innerHTML = '密码不能为空';
        return;
      }
      if (!this.isPassword(this.forget_re_pwd)) {
        this.for_isRePWDError = true;
        this.$refs.forget_re_pwd_warm.innerHTML = '密码格式不正确';
        return;
      }
      if (this.forget_pwd !== this.forget_re_pwd) {
        this.for_isRePWDError = true;
        this.$refs.forget_re_pwd_warm.innerHTML = '密码不一致';
        return;
      }
      this.for_isRePWDOk = true;
      this.for_re_pwd_wram = true;
    },
    modify () {
      if (this.forget_email === '' || this.forget_pwd === '' || this.forget_code_con === '' || this.forget_re_pwd === '') {
        this.$refs.forget_re_pwd_warm.innerHTML = '请输入必填信息';
        return;
      }
      /* if (this.$refs.forget_mail.innerHTML || this.$refs.forget_code.innerHTML
      || this.$refs.forget_pwd_warm.innerHTML || this.$refs.forget_re_pwd_warm.innerHTML) */
      if (this.$refs.forget_mail.innerHTML) {
        this.$refs.forget_re_pwd_warm.innerHTML = this.$refs.forget_mail.innerHTML;
        return;
      }
      if (this.$refs.forget_code.innerHTML) {
        this.$refs.forget_re_pwd_warm.innerHTML = this.$refs.forget_code.innerHTML;
        return;
      }
      if (this.$refs.forget_pwd_warm.innerHTML) {
        this.$refs.forget_re_pwd_warm.innerHTML = this.$refs.forget_pwd_warm.innerHTML;
        return;
      }
      if (this.$refs.forget_re_pwd_warm.innerHTML) {
        return;
      }
      this.$refs.forget_re_pwd_warm.innerHTML = '';
      // GetForgetPWD({
      //   userEmail: this.forget_email,
      //   userPassword: md5(this.forget_pwd),
      //   code: this.forget_code_con
      // })
      //   .then(
      //     (res) => {
      //       console.log(res); // eslint-disable-line
      //       clearInterval(this.for_timer);
      //       this.forget_isActive = false;
      //       this.forget_noUse = false;
      //       this.$refs.forget_account.innerHTML = '发送验证码';
      //       if (res.data.code === '0') {
      //         this.$refs.forget_re_pwd_warm.innerHTML = res.data.message;
      //       }
      //       if (res.data.code === '1') {
      //         this.forget = !this.forget;
      //         this.LoginShow = !this.LoginShow;
      //         this.forget_email = '';
      //         this.forget_pwd = '';
      //         this.forget_code_con = '';
      //         this.forget_re_pwd = '';
      //         this.$refs.forget_mail.innerHTML = '';
      //         this.$refs.forget_code.innerHTML = '';
      //         this.$refs.forget_pwd_warm.innerHTML = '';
      //         this.$refs.forget_re_pwd_warm.innerHTML = '';
      //       }
      //     }
      //   )
      //   .catch(
      //     (err) => {
      //       console.log(err); // eslint-disable-line
      //     }
      //   );
    }
  },
  metaInfo () {
    const title = '登录_云纵文学网';
    const des = '云纵文学网，最好看的小说网站，精彩小说尽在云纵文学网，提供灵异小说，言情小说，青春小说，古言小说，穿越小说，民国小说，妖怪小说等等，更有大量免费小说提供，每日最快更新，页面整洁，给你不一样的阅读体验！';
    const keyDes = '云纵,云纵文学,云纵文学网,小说,免费小说';
    return {
      title,
      meta: [
        { name: 'description', content: des },
        { name: 'keywords', content: keyDes }
      ]
    };
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
  .userModule{
    user-select: none;
  }
  ::-moz-placeholder{color:#999;opacity:1;}
  :-moz-placeholder{color:#999;}
  ::-webkit-input-placeholder{color:#999;}
  :-ms-input-placeholder{color:#999 !important;}

  .signIn{
    width: 300px;
    line-height:45px;
    text-align: center;
    background-color: #ee4848;
    margin:36px 0 20px;
    font-size:16px;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
  }
  .forget{
    text-align: right;
    color: #eb4a4d;
    font-size:14px;
    cursor: pointer;
    user-select: none;
  }
  .thirdLogin{
    text-align: center;
    padding:40px 0 0;
    user-select: none;
    span{
      font-size:12px;
      color: #666;
    }
    img{
      vertical-align: top;
      margin-right:7px;
      cursor: pointer;
    }
  }
  .login-btn{
    div{
      user-select: none;
      width:100%;
      line-height:45px;
      text-align: center;
      background-color: #eb4a4d;
      border-radius: 4px ;
      font-size:16px;
      color: #fff;
      cursor: pointer;
    }
  }
  .login-btn2{
    user-select: none;
    margin-top:25px;
    text-align: right;
  div{
    user-select: none;
    display: inline-block;
    width:102px;
    line-height:36px;
    border-radius: 4px;
    text-align: center;
    font-size:16px;
    cursor: pointer;
    &.reset{
       background-color: #EB4A4D;
       margin-right:30px;
       color: #fff;
     }
    &.cancel{
       border:1px solid #666;
     }
  }
  }
  .my_header{
    width:100%;
    line-height:18px;
    text-align: center;
    font-size:18px;
    color: #666;
    border-bottom:1px solid #f1f1f1;
    padding-bottom:15px;
  }
  .qr{
    width:450px;
    height:450px;
    padding-top:200px;
  }
</style>
