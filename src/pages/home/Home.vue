<template>
    <Layout>
        <Top></Top>
        <!--<Content>-->
            <!--<div class="content body-content">-->
                <!--&lt;!&ndash;<router-view/>&ndash;&gt;-->
              <!--<keep-alive>-->
                <!--<router-view v-if="this.$route.meta.keepAlive"></router-view>-->
              <!--</keep-alive>-->

              <!--<router-view v-if="!this.$route.meta.keepAlive"></router-view>-->
            <!--</div>-->
        <!--</Content>-->
        <Bottom></Bottom>
    </Layout>

</template>

<script>

import Top from '~components/Top';
import Bottom from '~components/Bottom';

export default {
  name: 'App',
  data () {
    return {
      msg: ''
    };
  },
  async asyncData ({ store, route }, config = {}) {
    const condition = {
      fuzzyQuery: '',
      pageNum: '0',
      pageSize: '0'
    };
    await Promise.all([
      // store.dispatch('demo/fetchMovie', '123456'), // 测试接口
      store.dispatch('home/top/fetchNoticeList', condition) // 获取系统公告
    ]);
  },
  components: {
    Bottom,
    Top
  },
  // created () {
  //   window.sessionStorage.setItem('formOther', 0);
  // },
  methods: {

  }
};
</script>

<style type="text/scss" lang="scss" scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        font-size: 16px;
        background-color: #f6f6f6;
        .ivu-layout-footer{
            padding: 0;
            height: 240px;
            background-color: #e7e7e7;
        }
        .body-content{
          min-height:300px;
        }
    }
</style>
