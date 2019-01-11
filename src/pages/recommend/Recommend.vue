<template>
  <div class="hello">
    <one :list='recommendImageLists' :newslist='recommendNovelLists' :hotItem='hotItem' :oneList='oneList' :rankList='rankList'></one>
    <!--<div class="two">
      <div class="hello-left">
        <generalize :AdPositionId1='AdPositionId1' v-if="AdPositionId1"></generalize>
        <div class="manito" v-if="booklist.length!=0">
          <div class="manito-header">
            <p>大神专区</p>
            <p @click="manitoChange()">
              <span>
                <img :src="change1" alt="">
              </span>
              换一批
            </p>
          </div>
          <div class="manito-content">
            <div class="show">
              <div class="show-one" v-for="(item,index) in booklist" :key="index">
                <router-link class="bookpic"
                tag="div" :to="'/detailsInfo/'+item.novelId">
                  <img :src='item.photoContent' alt="">
                </router-link>
                <router-link class="bookclass"
                tag="p" :to="'/detailsInfo/'+item.novelId"
                :title="item.novelTile">
                  {{item.novelTile|limitWorld(7)}}
                </router-link>
                <p class="author">
                  <router-link tag="span" :to="'/authorHomePage/'+item.authorUserId">
                    {{item.authorPenName}}
                  </router-link>
                &#12288;著</p>
              </div>
            </div>
          </div>
        </div>
        <generalize :AdPositionId1='AdPositionId2' v-if="AdPositionId2"></generalize>
        <div class="timefree" v-if="timefreelist.length!=0">
          <div class="timefree-header">
            <p>限时限免</p>
            <p class="djs">
              <span>{{weekend}}</span>
              <span>|</span>
              <span>还剩:</span>
              <span>{{daoJs}}</span>
            </p>
            <p @click="timefreeChange()">
              <span>
                <img :src="change1" alt="">
              </span>
              换一批
            </p>
          </div>
          <div class="timefree-content">
              <div class="show">
                <div class="show-one" v-for="(item,index) in timefreelist" :key="index">
                  <router-link class="bookpic" tag="div"
                  :to="'/detailsInfo/'+item.novelId">
                    <img :src='item.photoContent' alt="">
                    <div>
                      <span>限时限免</span>
                    </div>
                  </router-link>
                  <div class="bookdetails">
                    <router-link class="bookname"
                    tag="div"
                    :to="'/detailsInfo/'+item.novelId">
                      {{item.novelTile|limitWorld(10)}}
                    </router-link>
                    <div class="contentdetails" :title="item.novelDescribe">{{item.novelDescribe|limitWorld(60)}}</div>
                    <div class="writer">
                      <router-link tag="span" :to="'/authorHomePage/'+item.authorUserId">
                        {{item.authorPenName}}
                      </router-link>
                    &#12288;著</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <hotlist :list="newlist2" prefecture="免费推荐" @changefree='changerecommed'></hotlist>
        <generalize :AdPositionId1='AdPositionId3' v-if="AdPositionId3"></generalize>
        <hotlist :list="newlist3" prefecture="VIP推荐" @changefree='changerecommed'></hotlist>
        <hotlist :list="newlist4" prefecture="精品推荐" @changefree='changerecommed'></hotlist>
        <generalize :AdPositionId1='AdPositionId4' v-if="AdPositionId4"></generalize>
        <div class="recentUpdates" id="update">
          <div class="recentUpdates-header">
            <p>最近更新</p>
            <router-link tag="p" :to="'/library/1'">更多精品小说>></router-link>
          </div>
          <div class="recentUpdates-listtitle">
              <li class="a">分类</li>
              <li class="b">书名</li>
              <li class="c">最新章节</li>
              <li class="d">作者</li>
              <li class="e">更新时间</li>
          </div>
          <div class="recentUpdates-listcontent" v-if="updatelist2.length>0" v-for="(item,index) in updatelist2" :key="index">
              <li class="a">
                <span>{{item.novelTypeName}}</span>
                <img :src="vip" alt="" v-if="item.isFree==1">
              </li>
              <li class="b ming">
                <router-link tag="span" :to="'/detailsInfo/'+item.novelId" :title="item.novelTitle">{{item.novelTitle|limitWorld(7)}}</router-link>
              </li>
              <li class="c">
                <p  @click="readNewChaper(item)" :title="'第'+tozh(item.chapter)+'章'+' '+item.chapterTitle">
                  <span>第{{tozh(item.chapter)}}章</span>
                  &#12288;
                  <span>{{item.chapterTitle|limitWorld(10)}}</span>
                </p>
              </li>
              <li class="d">
                <router-link tag="span"
                :to="'/authorHomePage/'+item.authorUserId">
                  {{item.penName}}
                </router-link>
              </li>
              <li class="e">{{item.updateTime}}</li>
          </div>
          <div class="emptyDiv" v-else>
              <div class="tupian"><img :src='kongSrc' alt=""></div>
              <div class="wenzi">
                暂无最近更新
              </div>
          </div>
          <Page :total="this.pagecount" :page-size="20"
            @getPage="getPage" v-if="this.pagecount>20"></Page>
        </div>
        <Modal
          v-model="modal1"
          title="Common Modal dialog box title"
          class-name="remind_module">
          <div class="close">
            <img :src="close" alt="" @click="closeModal">
          </div>
          <h3 v-if="noMoney === 2">
            <span v-if="modelVolume !== 0">第<span>{{tozh(modelVolume)}}</span>卷 | </span>
            <span>{{tozh(readChapter)}}.</span><span>{{readTitle}}</span>
          </h3>
          <h3 v-else>这是VIP章节 需要订阅后才能阅读</h3>
          <p class="chaTitle" v-if="noMoney === 2">您的余额不足，请先充值</p>
          <p class="chaTitle" v-else>
            <span v-if="modelVolume !== 0">第<span>{{tozh(modelVolume)}}</span>卷 | </span>
            <span>{{tozh(readChapter)}}.</span><span>{{readTitle}}</span>
          </p>
          <div class="subscriber" v-if="noMoney === 0">
            <div class="subThis">
              <h3>订阅本章</h3>
              <p><span>{{readExpense}}</span>阅读币</p>
            </div>
            <div class="autoSub">
              <h3>自动订阅</h3>
              <p>不再显示订阅提醒</p>
              <p>自动订阅下一章</p>
            </div>
          </div>
          <div class="subscriber" v-if="userId === null">
            <div class="subThis noLogin">
              <h3>订阅本章</h3>
              <p><span>{{readExpense}}</span>阅读币</p>
            </div>
            <div class="autoSub noLogin">
              <h3>自动订阅</h3>
              <p>不再显示订阅提醒</p>
              <p>自动订阅下一章</p>
            </div>
          </div>
          <div class="subscriber" v-if="noMoney === 1">
            <div class="subThis noMoney_sub" @click="toReading();">
              <h3>订阅本章</h3>
              <p><span>{{readExpense}}</span>阅读币</p>
            </div>
            <div class="autoSub noMoney_aut" @click="motion()">
              <h3>自动订阅</h3>
              <p>不再显示订阅提醒</p>
              <p>自动订阅下一章</p>
            </div>
          </div>
          <div class="subscriber" v-if="noMoney === 2">
            <div class="subThis noMoney_sub single">
              <h3>订阅本章</h3>
              <p><span>{{readExpense}}</span>阅读币</p>
            </div>
          </div>
          <router-link class="balance toLogin"
                      tag="p"
                      :to="{path:'/login',query:{state:0}}"
                      v-if="userId === null">
                      还未登录,请先登录&gt;&gt;
          </router-link>
          <p class="balance" v-else>您的账户余额：{{balances}}阅读币&#12288;
            <span @click="toRecharge">去充值&gt;&gt;</span>
            &lt;!&ndash; <router-link tag="span"
                        to="/recharge">
              去充值&gt;&gt;</router-link> &ndash;&gt;
          </p>
        </Modal>
      </div>
      <div class="hello-right">
        <oneright v-if="clicklist.length>1"
            :rankinglist='clicklist'
            :onelist='clickonelist' title="点击榜"
            :Zyz='Zyz' :Qbbd='Qbbd'
            luyou="/Ranking/CLICK" >
        </oneright>
        <oneright  v-if="updatelist.length>1"
            :rankinglist='updatelist'
            :onelist='updateonelist' title="连载榜"
            :Zyz='Zyz' :Qbbd='Qbbd'
            luyou="/Ranking/UPDATE">
        </oneright>
        <oneright  v-if="newbooklist.length>1"
            :rankinglist='newbooklist'
            :onelist='newbookonelist' title="新书榜"
            :Zyz='Zyz' :Qbbd='Qbbd'
            luyou="/Ranking/NEW">
        </oneright>
        <oneright v-if="subandcollist.length>1"
            :rankinglist='subandcollist'
            :onelist='subandcolonelist' title="订阅榜"
            :Zyz='Zyz' :Qbbd='Qbbd'
            luyou="/Ranking/SUBANDCOL">
        </oneright>
        <oneright v-if="finishlist.length>1"
            :rankinglist='finishlist'
            :onelist='finishonelist' title="完结榜"
            :Zyz='Zyz' :Qbbd='Qbbd'
            luyou="/Ranking/FINISH">
        </oneright>
        <div class="relation">
          <div class="relation-header">
            <span></span>
            <h3>联系编辑</h3>
            <router-link :to="{path:'/regards',query:{params:'contact_us'}}" target="_blank">更多>></router-link>
          </div>
          <div class="relation-content">
            <ul>
              <li>总经理:</li>
              <li>QQ:</li>
              <li>总编:</li>
              <li>QQ:</li>
              <li>男频责编:</li>
              <li>QQ:</li>
              <li>男频责编:</li>
              <li>QQ:</li>
              <li>女频主编:</li>
              <li>QQ:</li>
              <li>女频责编:</li>
              <li>QQ:</li>
              <li>女频责编:</li>
              <li>QQ:</li>
            </ul>
            <ul>
              <li>火炎</li>
              <li>2420437400</li>
              <li>汪坤</li>
              <li>21387949</li>
              <li>星剑</li>
              <li>2967869285</li>
              <li>蚂蚁</li>
              <li>413074075</li>
              <li>汪坤</li>
              <li>21387949</li>
              <li>蓝蝶</li>
              <li>1282278794</li>
              <li>清水</li>
              <li>3260702959</li>
            </ul>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import one from '~components/recommend/one/One';
// import oneright from '~components/recommend/oneRight/OneRight'; // eslint-disable-line
// import hotlist from '~components/recommend/hotList/HotList'; // eslint-disable-line
// import generalize from '~components/recommend/generaLize/GeneraLize'; // eslint-disable-line

import { mapGetters } from 'vuex';
// import { mapState, mapMutations, mapActions } from 'vuex';
// import '../css/common.scss';
// import { urls } from '~js/api';
import changWorld from '~js/utils/changeWorld';
// import Page from '../components/Page';

import metaMixin from '~mixins/title-mixins';

export default {
  data () {
    return {
      /* eslint-disable global-require */
      hotItem: true
    };
  },
  async asyncData ({ store, route }, config = {}) {
    // 查询免费榜参数
    const freeCrunchiesArgs = {
      boardsEnumCode: 'FREE',
      listType: 1,
      pageNum: 1,
      pageSize: 10
    };
    await Promise.all([
      store.dispatch('home/recommend/fetchRecommendImageLists'), // 获取首页轮播图
      store.dispatch('home/recommend/fetchRecommendNovelLists'), // 获取首页精选推荐
      store.dispatch('home/recommend/fetchFreeCrunchies', { ...freeCrunchiesArgs }) // 获取首页 免费榜
    ]);
  },
  mixins: [metaMixin],
  computed: {
    ...mapGetters({
      recommendImageLists: 'home/recommend/getRecommendImageLists', // 首页编辑推荐5本书，以轮播图展示
      recommendNovelLists: 'home/recommend/getRecommendNovelLists', // 首页精选推荐
      rankList: 'home/recommend/getFreeRankList', // 首页 免费榜
      oneList: 'home/recommend/getFreeOneList', // 首页 免费榜
      freeCrunchies: 'home/recommend/getFreeRank' // 首页 免费榜
    })
  },
  methods: {
  },
  filters: {
    limitWorld (val, params) {
      return changWorld(val, params);
    }
  },
  mounted () {
    // console.log('首页freeCrunchies===' + JSON.stringify(this.freeCrunchies));
    // console.log('首页rankList===' + JSON.stringify(this.rankList));
    // console.log('首页oneList===' + JSON.stringify(this.oneList));
  },
  components: {
    one
    // oneright,
    // hotlist,
    // // Page,
    // generalize
  },
  metaInfo () {
    const title = '云纵文学_免费小说网|最新最好看的小说网【首页】';
    const des = '云纵文学网，最好看的小说网站，精彩小说尽在云纵文学网，提供灵异小说，言情小说，青春小说，古言小说，穿越小说，民国小说，妖怪小说等等，更有大量免费小说提供，每日最快更新，页面整洁，给你不一样的阅读体验！';
    const keyDes = '云纵,云纵文学,云纵文学网,小说,免费小说';
    return {
      title,
      meta: [
        { name: 'description', content: des },
        // { vmid: 'description', name: 'description', content: des },
        { name: 'keywords', content: keyDes }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" lang="scss" scoped>

  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .hello{
    border:1px solid #e0e0e0;
    background-color: white;
    padding: 0 10px 0 10px;
    .two{
      overflow: auto;
      .hello-left{
        width: 884px;
        height: 100%;
        float: left;
        .manito{
          width: 100%;
          margin-bottom: 41px;
          .manito-header{
            height: 37px;
            border-bottom: 1px solid #d0d0d0;
            p:first-child{
              font-size: 24px;
              line-height: 24px;
              color: #333;
              font-weight: bold;
              float: left;;
            }
            p:last-child{
              float: right;;
              font-size: 16px;
              line-height: 22px;
              color: #666;
              margin-bottom: 13px;
              cursor: pointer;
              span{
                margin-right: 8px;
                display: inline-block;
                width: 22px;
                height: 22px;
                img{
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
                }
              }
            }
            p:last-child:hover{
              color: #eb4a4d;
            }
          }
          .manito-content{
            width: 100%;
            padding: 24px 16px 0 16px;
            .show{
              width: 100%;
              .show-one{
                width: 126px;
                margin-right: 18px;
                display: inline-block;
                .bookpic{
                  width: 126px;
                  height:168px;
                  margin-top: 10px;
                  cursor: pointer;
                  transition: all 0.3s;
                  img{
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                  }
                }
                .bookpic:hover{
                    transform: scale(1.1);
                }
                .bookclass{
                  margin: 5px 0;
                  font-size: 14px;
                  color: #333;
                  font-weight: bold;
                  text-align: center;
                }
                .bookclass:hover{
                  color: #eb4a4d;
                  cursor: pointer;
                }
                .author{
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                  span:hover{
                    cursor: pointer;
                    color: #eb4a4d;
                  }
                }
              }
              .show-one:nth-child(6n){
                margin-right: 0;
              }
            }
          }
        }
        .recentUpdates{
          width: 886px;
          margin-bottom: 40px;
          .recentUpdates-header{
            width: 100%;
            height: 37px;
            border-bottom: 1px solid #d0d0d0;
            p:first-child{
              font-size: 24px;
              line-height: 24px;
              color: #333;
              font-weight: bold;
              float: left;
            }
            p:last-child{
              float: right;;
              font-size: 16px;
              line-height: 22px;
              color: #666;
              margin-bottom: 13px;
              cursor: pointer;
            }
            p:last-child:hover{
              color: #eb4a4d;
            }
          }
          .recentUpdates-listtitle{
            width: 100%;
            height: 67px;
            padding-top: 25px;
            padding-left: 41px;
            background-color: #f6f6f6;
            li{
              font-size: 18px!important;
              color: #333!important;
              text-align: left;
              height: 42px;
              line-height: 42px;
              margin: 0;
              padding: 0;
            }
          }
          .recentUpdates-listcontent{
            width: 100%;
            height: 42px;
            line-height: 42px;
            padding-left: 41px;
            li{
              font-size: 16px;
              color: #666;
              text-align: left;
              height: 42px;
              line-height: 42px;
              margin: 0;
              padding: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              img{
                float: right;
                margin-top: 14px;
              }
            }
            .ming{
              cursor: pointer;
              span{
                color: #4f8ad2;
              }
              span:hover{
                color: #eb4a4d;
              }
            }
            .c{
              p:hover{
                cursor: pointer;
                color: #eb4a4d;
              }

            }
          }
          .emptyDiv{
            width: 100%;
            text-align: center;
            .tupian{
              width: 130px;
              height: 77px;
              margin: auto;
              margin-top: 220px;
              margin-bottom: 45px;
              img{
                width: 100%;
                height: 100%;
                vertical-align: top;
              }
            }
            .wenzi{
              font-size: 18px;
              color: #666666;
            }
          }
          .recentUpdates-listcontent:nth-child(2n){
            background-color: #f0f0f0;
          }
          .a{
            width: 101px;
          }
          .b{
            width: 150px;
          }
          .c{
            width: 249px;
            color: #999!important;
            font-size: 14px!important;

          }
          .d{
            width: 167px;
            span:hover{
              cursor: pointer;
              color: #eb4a4d;
            }
          }
        }
        .timefree{
          width: 100%;
          margin-bottom: 41px;
          .timefree-header{
            height: 37px;
            border-bottom: 1px solid #d0d0d0;
            p:first-child{
              font-size: 24px;
              line-height: 24px;
              color: #333;
              font-weight: bold;
              float: left;;
            }
            .djs{
              display: inline-block;
              margin-left: 60px;
              color: #eb4a4d;
              font-size: 16px;
            }
            p:last-child{
              float: right;;
              font-size: 16px;
              line-height: 22px;
              color: #666;
              margin-bottom: 13px;
              cursor: pointer;
              span{
                margin-right: 8px;
                display: inline-block;
                width: 22px;
                height: 22px;
                img{
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
                }
              }
            }
            p:last-child:hover{
              color: #eb4a4d;
            }
          }
          .timefree-content{
            width: 100%;
            padding: 24px 16px 0 16px;
            .show{
              width: 100%;
              .show-one{
                display: inline-block;
                width: 50%;
                margin-bottom: 10px;
                .bookpic{
                  width: 126px;
                  height: 168px;
                  margin-top: 10px;
                  float: left;
                  position: relative;
                  img{
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                  }
                  div{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    background-color: #e2e2e2;
                    opacity: .8;
                    color: #e77a32;
                    text-align: center;
                    line-height: 168px;
                    display: none;
                    font-size: 16px;
                    span{
                      display: inline-block;
                      height: 16px;
                      line-height: 16px;
                      border-bottom:1px solid #e77a32;
                    }
                  }
                }
                .bookpic:hover{
                  cursor: pointer;
                  img{
                      width: 105px;
                      height: 144px;
                      margin-left: 10px;
                      margin-top: 12px;
                  }
                  div{
                    display: block;
                  }
                }
                .bookdetails{
                  float: left;
                  margin-top:10px;
                  padding: 10px;
                  width: 283px;
                  .bookname{
                    font-size: 18px;
                    color: #333;
                    font-weight: bold;
                    margin-bottom: 5px;
                  }
                  .bookname:hover{
                    cursor: pointer;
                    color: #eb4a4d;
                  }
                  .contentdetails{
                    color: #666;
                    font-size: 16px;
                    height: 92px;
                  }
                  .writer{
                      color: #666;
                      font-size: 16px;
                      span{
                        color: #e77a32;
                        cursor: pointer;
                      }
                      span:hover{
                        color: #eb4a4d;
                      }
                  }
                }
              }

            }
          }
        }
      }
      .hello-right{
        width: 283px;
        height: 100%;
        float: right;
        .relation{
          width: 100%;
          .relation-header{
            width:100%;
            height: 40px;
            padding-top:13px;
            padding-bottom: 9px;
            border-bottom: 1px  solid #999;
            margin-bottom: 12px;
            span{
              display: inline-block;
              width: 4px;
              height: 20px;
              background-color: #15b5e3;
              margin-right: 7px;
              float: left;
            }
            h3{
                float: left;
                font-size: 18px;
                line-height: 18px;
                color: #333333;
              }
              a{
                float: right;
                color:#666666;
                font-size: 16px;
                line-height: 16px;
              }
              a:hover{
                color:#eb4a4d;
              }
          }
          .relation-content{
            width: 100%;
            ul{
              float: left;
              li{
                display: block;
                font-size: 16px;
                color: #666;
                line-height: 16px;
                margin-bottom: 22px;
              }
            }
            ul:last-child{
              li{
                color: #898989;
              }
            }
          }
        }
      }
    }
  }
</style>
