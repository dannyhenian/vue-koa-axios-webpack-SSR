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

<script src="./Home.js">
</script>

<style type="text/scss" lang="scss" scoped>
@import "./Home.scss";
</style>
