export default {
  name: 'App',
  data () {
    return {
      msg: '这是footer部分',
      /* eslint-disable global-require */
      ewm: require('../../assets/images/2wm.jpg')
      /* eslint-disable global-require */
    };
  },
  components: {
  }
};
