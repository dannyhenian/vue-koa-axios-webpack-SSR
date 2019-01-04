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

<script src="./Bottom.js">
</script>

<style type="text/scss" lang="scss" scoped>
@import "./Bottom.scss";
</style>
