
export const urls = {
  userSet: '/novelapi/novelOAService/novel/userSet',
  recommend: '/novelapi/novelOAService/homepage/novel',
  crunchies: '/novelapi/novelOAService/novelList/getNovelList',
  rankMenu: '/novelapi/novelOAService/novelList/getList',
  allRank: '/novelapi/novelOAService/novelList/getAllList',
  fansRank: '/novelapi/novelOAService/novelList/getNovelFans',
  bookDetail: '/novelapi/novelOAService/novelFilter/getNovels',
  requiredParams: '/novelapi/novelOAService/novelType/getAllTypes',
  login: '/novelapi/novelUserService/user/login',
  register: '/novelapi/novelUserService/user/register',
  getCode: '/novelapi/novelUserService/user/sendCode',
  signOut: '/novelapi/novelUserService/user/logout',

  charge: '/novelapi/novelOAService/upayCenter/upayCenterRecharge',
  aliPay: '/novelapi/novelOAService/upayCenter/getAlipay',
  aliPayBack: '/novelapi/novelPayCenterService/aliPayCenter/returnUrl',
  wxPayBack: '/novelapi/novelOAService/upayCenter/queryTradeStatus',
  modifyPassword: '/novelapi/novelOAService/personalCenter/modifyPassword',
  modifyEmail: '/novelapi/novelOAService/personalCenter/modifyEmail',
  qqLogin: '/novelapi/novelUserService/qq/login',
  weiXinLogin: '/novelapi/novelUserService/wechat/WXLogin',
  afterWx: '/novelapi/novelUserService/wechat/afterWX',
  weiBoLogin: '/novelapi/novelUserService/weibo/weiboLogin',
  forget_getCode: '/novelapi/novelUserService/user/valiAccount',
  get_forgetPWD: '/novelapi/novelUserService/user/forgetPwd',
  chargeRecord: '/novelapi/novelOAService/upayCenter/queryUpayCenter',
  oderRecord: '/novelapi/novelOAService/novelDetail/getConsumeRecordList',
  getInfoByTradeNum: '/novelapi/novelOAService/upayCenter/getUserInfoBytradeNum',
  rewardRecord: '',
  queryBalance: '/novelapi/novelOAService/accountCenter/queryPersonAccount',
  userInfo: '/novelapi/novelOAService/personalCenter/getUserInfo',
  qqLoginBack: '/novelapi/novelUserService/qq/rebackQq',
  weiBoBack: '/novelapi/novelUserService/weibo/callBackWeibo',
  checkNickName: '/novelapi/novelUserService/user/checkNickName',
  checkEmail: '/novelapi/novelUserService/user/checkEmail',
  collect: '/novelapi/novelOAService/novelCollection/queryAllCollection',
  subscription: '/novelapi/novelOAService/novelSubscribe/querySubcribe',
  cancelCollection: '/novelapi/novelOAService/novelCollection/cancelCollection',
  cancelCollections: '/novelapi/novelOAService/novelCollection/cancelCollectionList',
  cancelSubscribe: '/novelapi/novelOAService/novelSubscribe/cancelSubscribe',
  cancelSubscribes: '/novelapi/novelOAService/novelSubscribe/cancelSubscribeList',
  history: '/novelapi/novelOAService/novelCollection/queryNovleHistory',
  deleteHistory: '/novelapi/novelOAService/novelCollection/emptyNovleHistory',
  deleteHistorys: '/novelapi/novelOAService/novelCollection/emptyNovleHistoryList',
  /* 个人中心 */

  /* 我的主页 */
  myHomePage: '/novelapi/novelOAService/personalCenter/myHomePage',
  editUserPhoto: '/novelapi/novelOAService/personalCenter/editUserPhoto',
  modifyNickName: '/novelapi/novelOAService/personalCenter/modifyNickName',
  modifyIntroduction: '/novelapi/novelOAService/personalCenter/modifyIntroduction',
  getMyNovelList: '/novelapi/novelOAService/myNovel/getMyNovelList',
  /* 小说详情 */
  novelDetails: '/novelapi/novelOAService/novel/openNovel',
  saveComment: '/novelapi/novelOAService/comment/saveComment',
  replyComment: '/novelapi/novelOAService/comment/saveReply',
  deletComment: '/novelapi/novelOAService/comment/deleteComment',
  deletReply: '/novelapi/novelOAService/comment/deleteReply',
  queryComment: '/novelapi/novelOAService/comment/findNovelComment',
  queryCommentPage: '/novelapi/novelOAService/comment/findReplyPage',
  readDetails: '/novelapi/novelOAService/novel/readNovel',
  saveScore: '/novelapi/novelOAService/novelDetail/myEvaluation',
  isCharge: '/novelapi/novelOAService/novelDetail/isChargeChapter',
  addConsumeRecord: '/novelapi/novelOAService/novelDetail/addConsumeRecord',
  addClickNum: '/novelapi/novelOAService/novel/clickNum',
  addConsumeRecords: '/novelapi/novelOAService/novelDetail/addConsumeRecords',
  giveRecommend: '/novelapi/novelOAService/reward/giveRecommend',
  giveDiamond: '/novelapi/novelOAService/reward/giveDiamond',
  giveMoney: '/novelapi/novelOAService/reward/giveMoney',
  getBoostRecommendRank: '/novelapi/novelOAService/reward/getBoostRecommendRank',
  getBoostDiamondBank: '/novelapi/novelOAService/reward/getBoostDiamondBank',
  getBoostMoneyBank: '/novelapi/novelOAService/reward/getBoostMoneyBank',
  newTrends: '/novelapi/novelOAService/reward/newTrends',
  getMonthRank: '/novelapi/novelOAService/reward/getBoostMonthRecommendBank',
  getAuthorOtherNovel: '/novelapi/novelOAService/author/getAuthorOtherNovel',
  getAuthorByUserId: '/novelapi/novelOAService/author/getAuthorByUserId',
  getAuthorSerialNovel: '/novelapi/novelOAService/author/getAuthorSerialNovel',
  getAuthorAllNovel: '/novelapi/novelOAService/author/getAuthorAllNovel',
  /* 小说修改 */
  updateNovel: '/novelapi/novelOAService/novel/updateNovel',
  uploadNovel: '/novelapi/novelOAService/novel/uploadNovel',
  publishNovel: '/novelapi/novelOAService/novel/publish',
  /* 小说类型 */
  getAllTypes: '/novelapi/novelOAService/novelType/getAllTypes',
  /* 分页查询章节 */
  chapterPage: '/novelapi/novelOAService/novel/chapterPage',
  /* 切换新书所属卷 */
  toNewVolume: '/novelapi/novelOAService/novel/changeVolume',
  /* 发布新章 */
  uploadNovelChapter: '/novelapi/novelOAService/novel/uploadNovelChapter',
  toPureNovel: '/novelapi/novelOAService/novel/changeIsHaveVolume',
  /* 验证密码 */
  checkPassword: '/novelapi/novelOAService/author/checkPassword',
  /* 我的作品 */
  myNovel: '/novelapi/novelOAService/personalCenter/getMyNovels',
  /* 批量修改章节 */
  updateChapters: '/novelapi/novelOAService/novel/updateChapters',
  /* 修改章节 */
  updateChapter: '/novelapi/novelOAService/novel/updateChapter',
  /* 确认修改章节 */
  confirmUpChapter: '/novelapi/novelOAService/novel/confirmUpdateChapter',
  /* 取消修改章节 */
  cancelUpChapter: '/novelapi/novelOAService/novel/cancelUpdateChapter',
  /* 删除章节 */
  deleteChapter: '/novelapi/novelOAService/novel/deleteChapter',
  /* 搜索小说 */
  searchBook: '/novelapi/novelOAService/homepage/searchNovel',
  /* 新增收藏 */
  saveCollection: '/novelapi/novelOAService/novelCollection/saveCollection',
  /* 添加订阅 */
  novelSubscribe: '/novelapi/novelOAService/novelSubscribe/saveSubscribe',
  /* 取消发布 */
  cancelPublish: '/novelapi/novelOAService/novel/cancelPublish',
  BoostConsume: '/novelapi/novelOAService/reward/queryBoostConsume',
  OtherConsume: '/novelapi/novelOAService/reward/getOtherConsumptionList',
  /* ------管理xjq_start------- */
  // 书籍
  manageList: '/novelapi/novelOAService/manage/novelList',
  managePublish: '/novelapi/novelOAService/manage/publishNovel',
  manageEdit: '/novelapi/novelOAService/manage/updateNovels',
  manageDel: '/novelapi/novelOAService/manage/deleteNovels',
  manageSingle: '/novelapi/novelOAService/novel/openNovel',
  manageCatalog: '/novelapi/novelOAService/catalogue/getCatalogue',
  manageCrete: '/novelapi/novelOAService/manage/createNovel',
  manageDelUpdate: '/novelapi/novelOAService/novel/changeIsHaveVolume',
  manageTitle: '/novelapi/novelOAService/manage/isExists',
  manageDelEver: '/novelapi/novelOAService/manage/getDelStatus',
  managePublishNo: '/novelapi/novelOAService/manage/updatePublishStatus',
  manageQueryBook: '/novelapi/novelOAService/novelModule/queryNovelByTitle',
  manageGetNew: '/novelapi/novelOAService/novel/getNewChapter',
  manageChapterInput: '/novelapi/novelOAService/manage/publishChapterContent',
  manageChapterFile: '/novelapi/novelOAService/manage/publishChapters',
  ChapterInput: '/novelapi/novelOAService/novelModule/publishChapterContent',
  ChapterFile: '/novelapi/novelOAService/novel/publish',
  chapterEditList: '/novelapi/novelOAService/novel/getCanEditNovel',
  chapterPublish: '/novelapi/novelOAService/novel/updateChaptersPublishStatus',
  chapterQuery: '/novelapi/novelOAService/novel/getChapterInfo',
  chapterSave: '/novelapi/novelOAService/novel/updateChapterOnline',
  // 作者
  writerList: '/novelapi/novelOAService/author/getAuthorList',
  writerQuery: '/novelapi/novelOAService/author/getAuthorByPenName',
  writerUpdate: '/novelapi/novelOAService/author/updateAuthor',
  writerPinyin: '/novelapi/novelOAService/author/getAuthorListByPinyin',
  writerAdd: '/novelapi/novelOAService/author/addAuthor',
  // 公告
  noticeList: '/novelapi/novelOAService/notice/queryAnnouncementManager',
  noticeDel: '/novelapi/novelOAService/notice/deleteAnnouncement',
  noticeAdd: '/novelapi/novelOAService/notice/insertAnnouncement',
  noticeEdit: '/novelapi/novelOAService/notice/updateAnnouncement',
  /* ---------xjq_end ------------------ */
  // 查询小说
  queryNovels: '/novelapi/novelOAService/configureManage/queryNovel',
  // 查询首页推荐小说列表
  getRecommendList: '/novelapi/novelOAService/advertisement/getRecommendHome',
  // 获取首页精选下拉列表
  queryLabelList: '/novelapi/novelOAService/configureManage/queryLabel',
  // 获取首页精选配置
  queryChoiceConfig: '/novelapi/novelOAService/configureManage/queryHomeChoiceConfig',
  // 新增首页精选配置
  saveHomeChoiceConfig: '/novelapi/novelOAService/configureManage/saveHomeChoiceConfig',
  // 首页推荐小说发布
  addRecommendHome: '/novelapi/novelOAService/advertisement/addRecommendHome',
  // 推广广告查询
  getAdvertisement: '/novelapi/novelOAService/advertisement/getAdvertisement',
  // 推广广告发布
  releaseAdvertisement: '/novelapi/novelOAService/advertisement/releaseAdvertisement',
  /* 查询作者信息 */
  writerInfo: '/novelapi/novelUserService/personal/getAuthorInfo',
  /* 查询用户等级 */
  userGrade: '/novelapi/novelUserService/personal/getUserLevel',
  /* 验证笔名是否存在 */
  checkPenName: '/novelapi/novelOAService/author/checkPenName',
  /* 申请成为作者 */
  applyWriter: '/novelapi/novelOAService/author/applyAuthor',
  /* 编辑作者信息 */
  updateAuthorInfo: '/novelapi/novelUserService/personal/updateAuthorInfo',
  /* 修改密码 */
  modifyAccountPwd: '/novelapi/novelUserService/personal/changePwd',
  /* 更新狂徒 */
  crazy: '/novelapi/novelOAService/novelSignReward/queryCurrentQuarterReward',
  crazyHistory: '/novelapi/novelOAService/novelSignReward/queryCurrentHistoryReward',
  /* 更新狂徒 */
  crazyCancel: '/novelapi/novelOAService/novelSignReward/disqualificationReward',
  /* ---------------个人中心，发布新书-------------- */
  /* 创建小说 */
  createNovel: '/novelapi/novelOAService/novelModule/createNovel',
  /* 上传文件 */
  /* 发布书籍 */
  publicBook: '/novelapi/novelOAService/novelModule/publishNovel',

  /* 我的消息 */
  queryMyMessage: '/novelapi/novelOAService/myMessage/queryMyMessage',
  /* ---------------编辑，书籍管理-------------- */
  /* 信息补录查询 */
  queryInformation: '/novelapi/novelOAService/novleSign/queryInformation',
  //  分成签约-> 全勤奖励
  GetFullAttendanceInfo: '/novelapi/novelOAService/novelSignReward/GetFullAttendanceInfo',
  // 分成签约-》降级
  lowerLevelSign: '/novelapi/novelOAService/novelSignReward/lowerLevelSign',
  // 分成签约-》取消资格
  CancelFull: '/novelapi/novelOAService/novelSignReward/CancelFull',
  // 分成签约-》扣除奖励
  deduction: '/novelapi/novelOAService/novelSignReward/deduction',
  // 分成签约-》完本奖励
  GetOverNovelInfo: '/novelapi/novelOAService/novelSignReward/GetOverNovelInfo',
  // 分成签约-》买断签约
  CancelAgreement: '/novelapi/novelOAService/novelSignReward/CancelAgreement',

  getAllTypeSignRewardInfo: '/novelapi/novelOAService/novelSignReward/getAllTypeSignRewardInfo',
  /* 付费上架查询 */
  queryPaidOn: '/novelapi/novelOAService/novleSign/queryPaidOn',
  /* 发布和驳回 */
  updateInformation: '/novelapi/novelOAService/novleSign/updateInformation',
  /* 付费上架 通过和驳回 */
  updatePaidOn: '/novelapi/novelOAService/novleSign/updatePaidOn',

  /* 作品数据 */
  getNovelDateList: '/novelapi/novelOAService/personalCenter/getNovelDateList',
  /* 作品数据详情 */
  getNovelDateByNovelId: '/novelapi/novelOAService/personalCenter/getNovelDateByNovelId',

  /* 验证作者邮箱 */
  checkAuthorEmail: '/novelapi/novelUserService/personal/checkAuthorEmail',
  /* 作者信息页找回密码发送邮箱验证码 */
  sendMailCode: '/novelapi/novelUserService/personal/sendMailCode',
  /* 验证验证码是否有效 */
  valiCodeIsWork: '/novelapi/novelUserService/personal/valiCodeIsWork',
  /* 作者信息页找回密码 */
  resetAuthorPwd: '/novelapi/novelUserService/personal/resetAuthorPwd',
  /* 主页更换邮箱验证邮箱唯一性 */
  checkEmail2: '/novelapi/novelUserService/personal/checkEmail',
  /* 更换用户邮箱 */
  changeUserEmail: '/novelapi/novelUserService/personal/changeUserEmail',
  /* 首页五本热门书籍 */
  hotNovels: '/novelapi/novelOAService/homepage/hotNovels',
  /* 编辑模块签约送礼查询签约列表 */
  getNovelSignGiftList: '/novelapi/novelOAService/novleSign/getNovelSignGiftList',
  /* 签约奖励发放 */
  grantReward: '/novelapi/novelOAService/novleSign/grantReward',
  /* 绑定邮箱 */
  bandEmail: '/novelapi/novelUserService/personal/bandEmail',
  /* 申请签约 */
  applySigning: '/novelapi/novelOAService/novleSign/applySigning',
  /* 申请付费上架 */
  applyPaidOn: '/novelapi/novelOAService/novleSign/applyPaidOn',
  /* 删除未发布作品 */
  deleteNovel: '/novelapi/novelOAService/novelModule/deleteNovel',
  /* 章节查询订阅 */
  queryChapterSubscription: '/novelapi/novelOAService/novelSubscribe/queryChapterSubscription',
  /* 我的作品页获取作品数量 */
  getMyNovelCount: '/novelapi/novelOAService/personalCenter/getMyNovelCount',
  /* 获取签到数据 */
  getSigin: '/novelapi/novelUserService/sign/getSigin',
  /* 签到 */
  signin: '/novelapi/novelUserService/sign/in',
  /* 首页大神专区 */
  getDSRegion: '/novelapi/novelOAService/homepage/getDSRegion',
  /* 首页免费推荐 */
  freeRecommend: '/novelapi/novelOAService/homepage/freeRecommend',
  /* 首页vip推荐 */
  vipRecommend: '/novelapi/novelOAService/homepage/vipRecommend',
  /* 首页最近更新 */
  queryUpdateNovel: '/novelapi/novelOAService/homepage/queryUpdateNovel',
  /* 首页专区配置查询 */
  queryHomeZoneConfig: '/novelapi/novelOAService/configureManage/queryHomeZoneConfig',
  /* 首页专区标题查询 */
  queryLabel: '/novelapi/novelOAService/configureManage/queryLabel',
  /* 首页专区搜索小说 */
  queryNovel: '/novelapi/novelOAService/configureManage/queryNovel',
  /* 首页专区保存小说 */
  saveHomeZoneConfig: '/novelapi/novelOAService/configureManage/saveHomeZoneConfig',

  getMAC: 'http://pv.sohu.com/cityjson',
  /* 添加渠道 */
  channelInsert: '/novelapi/novelOAService/channel/insert',
  /* 渠道信息查询 */
  channelQuery: '/novelapi/novelOAService/channel/select',
  /* 获取小说名列表 */
  novelNameList: '/novelapi/novelOAService/configureManage/queryNovel',
  /* 渠道按月查询 */
  chanelMonthList: ' /novelapi/novelOAService/novelChannelDay/getNovelChannelMonthList',
  /* 按范围查询及记录 */
  chanelRangeList: '/novelapi/novelOAService/novelChannelDay/getNovelChannelDayList',

  /* 首页专区推荐 */
  queryHomeZoneRecommend: '/novelapi/novelOAService/homeZone/queryHomeZoneRecommend',
  /* 首页精选推荐 */
  queryChoiceRecommend: '/novelapi/novelOAService/homeRecommend/queryChoiceRecommend',
  /* 首页小说最近更新 */
  queryRecentUpdateNovel: '/novelapi/novelOAService/homeZone/queryRecentUpdateNovel',
  /* 申请作者验证邮箱 */
  checkAuthorEmail2: '/novelapi/novelOAService/author/checkAuthorEmail',
  /* 稿费发放详情 */
  getWagesDistributionInfo: '/novelapi/novelOAService/wagesDistribution/getWagesDistributionInfo',
  /* 稿费发放列表 */
  getWagesDistribution: '/novelapi/novelOAService/wagesDistribution/getWagesDistribution',
  /* 稿费发放邮件 */
  wagesSendEmail: '/novelapi/novelOAService/wagesDistribution/wagesSendEmail',
  /* 获取小说分类 */
  getClassify: '/novelapi/novelOAService/classify/getClassify',
  /* 小说新增分类 */
  addClassify: '/novelapi/novelOAService/classify/addClassify',
  /* 删除小说分类 */
  deleteClassify: '/novelapi/novelOAService/classify/deleteClassify',
  /* 管理操作日志 */
  getOperationLogList: '/novelapi/novelOAService/operationLog/getOperationLogList',
  /* 作品广告 */
  getAddAd: '/novelapi/novelOAService/NovelAnnouncement/queryAnnouncement',
  getDelAd: '/novelapi/novelOAService/NovelAnnouncement/deleteAnnouncement',
  getNewAd: '/novelapi/novelOAService/NovelAnnouncement/insertAnnouncement',
  /* 移动章节 */
  moveCharpter: '/novelapi/novelOAService/catalogue/changeNovelCatalogue',

  /* 粉丝榜 */
  fansList: '/novelapi/novelOAService/level/list',
  /* 粉丝名称修改 */
  fansUpdate: '/novelapi/novelOAService/level/update',
  /* 我的消息  我的消息列表 */
  getNovelMessageList: '/novelapi/novelOAService/novelMessage/getNovelMessageList',
  /* 我的消息  修改我的消息的状态为已读 */
  updateMessageStatus: '/novelapi/novelOAService/novelMessage/updateMessageStatus',

  /* 章节评论 */
  queryAllChapterComment: '/novelapi/novelOAService/chapterComment/queryAllChapterCommentPage',

  /* 新增章节评论 */
  saveChapterComment: '/novelapi/novelOAService/chapterComment/saveChapterComment',
  /* 分页查询章节评论信息 */
  queryChapterCommentPage: '/novelapi/novelOAService/chapterComment/queryChapterCommentPage',
  /* 删除章节评论 */
  deleteChapterComment: '/novelapi/novelOAService/chapterComment/deleteChapterComment',
  /* 获取评论数 */
  queryChapterCommentCount: '/novelapi/novelOAService/chapterComment/queryChapterCommentCount',
  /* 投月票 */
  pollMonth: '/novelapi/novelOAService/reward/giveMonthRecommend'
};

// export default { urls };
