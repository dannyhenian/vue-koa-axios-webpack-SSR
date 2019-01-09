
import Top from '~components/top/Top.vue';
import Bottom from '~components/bottom/Bottom.vue';
import metaMixin from '~mixins/title-mixins';

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
  mixins: [metaMixin],
  components: {
    Bottom,
    Top
  },
  metaInfo () {
    const title = '云纵文学_免费小说网|最新最好看的小说网【官网】';
    const des = '云纵文学网，最好看的小说网站，精彩小说尽在云纵文学网，提供灵异小说，言情小说，青春小说，古言小说，穿越小说，民国小说，妖怪小说等等，更有大量免费小说提供，每日最快更新，页面整洁，给你不一样的阅读体验！';
    const keyDes = '云纵,云纵文学,云纵文学网,小说,免费小说';
    return {
      title,
      meta: [
        { vmid: 'description', name: 'description', content: des },
        { vmid: 'keywords', name: 'keywords', content: keyDes }
      ]
    };
  },
  // created () {
  //   window.sessionStorage.setItem('formOther', 0);
  // },
  methods: {

  }
};
