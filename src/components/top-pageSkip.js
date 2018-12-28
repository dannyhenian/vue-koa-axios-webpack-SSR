import MyStore from '../js/utils/getData';

// 跳转到个人中心-》我的书架-》阅读历史
export const skipHistory = () => {
  if (MyStore.getStore('isLogin') === 'true') {
    this.$router.push('/personalCenter/myBookrack/readingHistory');
  } else {
    this.$router.push('/login');
  }
};

// 跳转到个人中心-》我的书架-》我的收藏
export const skipFavorite = () => {
  if (MyStore.getStore('isLogin') === 'true') {
    this.$router.push('/personalCenter/myBookrack');
  } else {
    this.$router.push('/login');
  }
};

// 跳转到个人中心-》我的消息
export const skipMessage = () => {
  if (MyStore.getStore('isLogin') === 'true') {
    this.$router.push('/personalCenter/myMessage');
  } else {
    this.$router.push('/login');
  }
};

// 跳转到首页 或 页面刷新
export const skipindex = () => {
  if (this.$route.path.split('/')[1]) {
    this.$router.push('/');
  } else {
    window.location.reload();
  }
};
