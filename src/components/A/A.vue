<template>
  <div>
    <h1>This is page A</h1>
    <h3>{{ this.movie }}</h3>
    <demo></demo>
  </div>
</template>

<script>
import demo from './demo-a.vue'

export default {
  // mixins: [titleMixin],
  title () {
    return 'A页面'
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('demo/fetchMovie', 54321)
  },

  computed: {
    movie () {
      return this.$store.state.demo.movie
    }
  },
  components: {
    demo
  }
}
</script>
