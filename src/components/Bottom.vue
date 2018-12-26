<template>
    <Footer >
        <div class="content">
            <div class="footer-section footer-one">
                <div class="footer-logo"></div>
                <div class="footer-font">
                  <div class="zero">
                    <div class="title">友情链接：</div>
                    <div class="wz">
                      <a target="_blank" :href="'http://www.sifangbook.com/'">四方中文网</a>
                      <a target="_blank" :href="'http://www.qczww.cn/'">起创中文网</a>
                      <a target="_blank" :href="'http://book.juyoutongcheng.com/'">聚优阅读网</a>
                      <a target="_blank" :href="'http://www.huoshenwx.com/'">火神文学</a>
                      <a target="_blank" :href="'https://www.doulook.com/'">网文在线</a>
                      <a target="_blank" :href="'https://www.amwxw.com/'">爱麦文学网</a>
                      <a target="_blank" :href="'https://www.bsxiaoshuo.com/'">笔尚文学</a>
                    </div>
                  </div>
                  <div class="one">
                    <router-link :to="{path:'/regards',query:{params:'about_us'}}"
                                 target="_blank" class="zi">关于云纵</router-link>
                    <span class="shu">|</span>
                    <router-link to="/welfare" target="_blank" class="zi">奖励计划</router-link>
                    <span class="shu">|</span>
                    <router-link :to="{path:'/regards',query:{params:'contact_us'}}"
                                 target="_blank" class="zi">联系我们</router-link>
                  </div>
                  <div class="two">
                    <span>浙ICP备18032308号-1</span>
                    <span>Copyright &copy; 2018 Yunzongwx.com All rights reserved</span>
                  </div>
                  <div class="three">
                    <span>客服邮箱:2486946201@qq.com</span>
                    <span>电话:0571-85061617</span>
                    <span>QQ:2486946201</span>
                  </div>
                  <div class="four">
                    <span>地址:浙江杭州滨江区江汉路1785号双城大厦1幢705室</span>
                  </div>
                </div>
                <div class="gzh">
                  <p>官方公众号</p>
                  <img :src="ewm" alt="">
                </div>
            </div>
        </div>
    </Footer>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: '这是footer部分',
      /* eslint-disable global-require */
      ewm: require('../assets/images/2wm.jpg')
      /* eslint-disable global-require */
    };
  },
  components: {
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
    .ivu-layout-footer{
        padding: 0;
        height: 170px;
        background-color: #292d35;
    }
    .content{
        .footer-section{

            height: 100%;
            font-size: 16px;
            line-height: 16px;
            .h3{
                margin-bottom: 40px;
            }
        }
        .footer-one{
            width:100%;
            .footer-logo{
                width: 191px;
                height: 50px;
                line-height: 50px;
                background: url('../assets/images/logo2.png') no-repeat center ;
                background-size: 100%;
                background-position:0;
                float: left;
                margin-right: 100px;
                margin-top: 60px;
            }
            .footer-font{
              float: left;
              font-size: 18px;
              color: #333;
              margin-top: 50px;
              .zero{
                margin-bottom: 37px;
                height: 16px;
                 .title{
                    color: #173b4e;
                    float: left;
                    line-height: 16px;
                    margin-right: 30px;
                  }
                  .wz{
                    float: left;
                    line-height: 16px;
                    color: #39362a;
                    width: 473px;
                    font-size: 16px;
                    a{
                      line-height: 16px;
                      display: inline-block;
                      margin: 0 15px 10px 0;
                    }
                  }
              }
              .one{
                margin-bottom: 15px;
                a{
                  margin-right: 12px;
                }
                span{
                  display: inline-block;
                  line-height: 18px;
                  margin-right: 12px;
                }
                .shu{
                  color: #868686;
                }
                .zi:hover{
                  cursor: pointer;
                  color: #eb4a4d;
                }
              }
              .two{
                margin-bottom: 15px;
                span{
                  display: inline-block;
                  line-height: 18px;
                  margin-right: 25px;
                }
              }
              .three{
                margin-bottom: 15px;
                span{
                  display: inline-block;
                  line-height: 18px;
                  margin-right: 26px;
                }
              }
              .four{
                span{
                  display: inline-block;
                  line-height: 18px;
                  margin-right: 26px;
                }
              }
            }
            .gzh{
              float: right;
              margin-top: 50px;
              p{
                margin-bottom: 15px;
                font-size: 25px;
                text-align: center;
              }
              img{
                width: 130px;
                height: 130px;
              }
            }
        }
    }
</style>
