function getTitle (vm) {
  // 组件可以提供一个 `title` 选项
  // 此选项可以是一个字符串或函数
  const { metaInfo } = vm.$options;
  if (metaInfo) {
    return typeof metaInfo === 'function' ? metaInfo.call(vm) : metaInfo;
  } else {
    return '云纵文学_免费小说网|最新最好看的小说网';
  }
}

// 服务器端mixin
const serverTitleMixin = {
  created () {
    console.log('开始获取meta');
    const meta = getTitle(this);
    console.log('meta===' + JSON.stringify(meta));
    if (meta) {
      this.$ssrContext.title = meta.title || meta;
      // this.$ssrContext.description = meta.desc || meta;
      this.$ssrContext.meta = meta.meta || '';
    }
  }
};

// 客户端mixin
const clientTitleMixin = {
  mounted () {
  }
};

// 可以通过 `webpack.DefinePlugin` 注入 `VUE_ENV`
export default process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin;
