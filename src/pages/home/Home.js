
import Top from '~components/top/Top.vue';
import Bottom from '~components/bottom/Bottom.vue';

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
