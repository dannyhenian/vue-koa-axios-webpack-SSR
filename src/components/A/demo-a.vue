<template>
  <div>
  <h1>This is page AT</h1>
  <h3>{{ this.test }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'a-t',
    asyncData ({ store, route }) {
      // 触发 action 后，会返回 Promise
      return store.dispatch('demo/fetchTest', 123456)
    },
    computed: {
      test () {
        return this.$store.state.demo.test
      }
    }
  }
</script>

<style scoped>

</style>
