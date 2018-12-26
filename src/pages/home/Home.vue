<template>
    <Layout>
        <Top></Top>
        <Content>
            <div class="content body-content">
                <!--<router-view/>-->
              <keep-alive>
                <router-view v-if="this.$route.meta.keepAlive"></router-view>
              </keep-alive>

              <router-view v-if="!this.$route.meta.keepAlive"></router-view>
            </div>
        </Content>
        <Bottom></Bottom>
    </Layout>
</template>

<script>
// import '../css/common.scss';
import Top from './Top';
import Bottom from './Bottom';

export default {
  name: 'App',
  data () {
    return {
      msg: '111111111111111111'
    };
  },
  components: {
    Bottom,
    Top
  },
  created () {
    sessionStorage.setItem('formOther', 0);
  },
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
