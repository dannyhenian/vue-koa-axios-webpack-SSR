<template>
  <div class="one">
    <div class="left">
      <ul class="content-lbt" ref="li1111">
        <li v-if="currentGoods==''||currentGoods==null">
          <img src="../../../assets/images/kongbanner.png" alt="">
        </li>
        <router-link v-else tag="li"
                     :to="'/detailsInfo/'+item.novelId"
                     v-for="(item,index) in currentGoods" :key="index">
          <img :src="kongbanner" alt=""
               v-if="item.path==''">
          <img :src="item.path" v-else>
        </router-link>
        <li v-for="item1 in list"
            :key="item1.id"
            class="tsq"
            :class="{active1:item1.isActive}">
        </li>
      </ul>
      <ul class="nav-lbt">
        <li v-for="(item,index) in list"
            :key="index"
            :class="{active:item.isActive}"
            @mouseout="animate()"
            @mouseover="stopItem(index)">
          <img :src="kongbanner" alt=""
               v-if="item.path==''">
          <img :src="item.path" v-else>
        </li>
      </ul>
      <div class="character">
        <div v-for="(temp,index) in currentGoods" :key="index">
          <h3>
            <router-link tag="span" :to="'/detailsInfo/'+temp.novelId">
              {{temp.novelTitle|limitWorld(10)}}
            </router-link>
          </h3>
          <p :title="temp.novelDescribe">
            {{temp.novelDescribe|limitWorld(40)}}
          </p>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="news" v-if="newslist.length!=0" v-for="(item,index) in newslist" :key="index">
        <router-link tag="div" :to="'/detailsInfo/'+item.topNovel.novelId" class="news-left">
          <img :src="item.topNovel.photo" alt="">
        </router-link>
        <div class="news-right">
          <h3 :title="item.topNovel.novelTitle">
            <router-link tag="span" :to="'/detailsInfo/'+item.topNovel.novelId">
              {{item.topNovel.novelTitle}}
            </router-link>
          </h3>
          <div class="jingxuan" v-for="(item1,index1) in item.tagList" :key="index1">
            <span class="tag">[{{item1[0].selectLabel}}]</span>
            <p>
              <router-link tag="span" class="tuijian" :to="'/detailsInfo/'+item2.novelId"
                           v-for="(item2, index2) in item1" :key="index2">
                <span>{{item2.novelTitle}}</span>
                <span :class="{wu:item2.description==''}">:</span>
                <span>{{item2.description}}</span>
                <span class="shu">|</span>
              </router-link>
              <!--<span v-for="(item2, index2) in item1" :key="index2" class="tuijian">-->
              <!--<router-link tag="span" class="ming"-->
              <!--:to="'/detailsInfo/'+item2.novelId">-->
              <!--{{item2.novelTitle}}-->
              <!--</router-link>-->
              <!--<span :class="{wu:item2.description==''}">:</span>-->
              <!--<span>{{item2.description}}</span>-->
              <!--<span class="shu">|</span>-->
              <!--</span>-->
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <oneright :rankinglist='rankList'
                :onelist='oneList' title="免费榜"
                :Zyz='Zyz' :Qbbd='Qbbd'
                luyou="/library/0"></oneright>
    </div>
  </div>
</template>
<script>
  import oneright from '../oneRignt/OneRight';//eslint-disable-line
  import changWorld from '~js/utils/changeWorld';

  export default {
    name: 'App',
    props: {
      list: {
        type: Array,
        required: true
      },
      newslist: {
        type: Array,
        required: true
      },
      hotItem: {
        type: Boolean,
        required: true
      },
      rankList: {
        type: Array,
        required: true
      },
      oneList: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        Mianfei: true,
        Tuijian: false,
        Tuhao: false,
        Xinzuanshi: false,
        Zongzuanshi: false,
        Dingyue: false,
        Shoucang: false,
        Xinshu: false,
        Gengxin: false,
        Zyz: false,
        Qbbd: true,
        /* eslint-disable global-require */
        kongbanner: require('../../../assets/images/novelcover.png'),
        /* eslint-enable global-require */
        currentType: '1',
        index: 0,
        timer: null
      };
    },
    mounted () {
      this.animate();
    },
    filters: {
      limitWorld (val, params) {
        return changWorld(val, params);
      }
    },
    computed: {
      currentGoods () {
        return this.list.filter((goods, index) => index == this.currentType - 1);// eslint-disable-line
      }
    },
    methods: {
      setIndex (currentIndex) {
        this.list.forEach((category, index) => {
          if (index != currentIndex) {// eslint-disable-line
            /* eslint-disable no-param-reassign */
            category.isActive = false;
            this.currentType = currentIndex + 1;
            this.value1 = currentIndex;
          } else {
            category.isActive = true;
            /* eslint-disable no-param-reassign */
          }
        });
      },
      stopItem (currentIndex) {
        clearInterval(this.timer);
        this.index = currentIndex;
        this.list.forEach((category, index) => {
          if (index != currentIndex) {// eslint-disable-line
            /* eslint-disable no-param-reassign */
            category.isActive = false;
            this.currentType = currentIndex + 1;
            this.$nextTick(() => {
              this.value1 = currentIndex;
            });
          } else {
            category.isActive = true;
            /* eslint-disable no-param-reassign */
          }
        });
      },
      animate () {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (this.index === 5) {
            this.index = 0;
          }
          this.setIndex(this.index);
          this.index += 1;
        }, 2000);
      }
    },
    components: {
      oneright
    }
  };
</script>
<style type="text/scss" lang="scss" scoped>
  .one {
    margin-top: 31px;
    overflow: hidden;
    .left {
      width: 273px;
      display: inline-block;
      float: left;
      overflow: hidden;
      position: relative;
      margin-right: 20px;
      .content-lbt {
        width: 228px;
        height: 300px;
        margin-bottom: 11px;
        li {
          width: 225px;
          height: 100%;
          cursor: pointer;
          float: left;
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
        .tsq {
          width: 3px;
          height: 60px;
          background-color: #0bc2fe;
          opacity: .6;
          float: right;
        }
        .active1 {
          background-color: #ff6235;
        }
      }

      .character {
        width: 100%;
        height: 128px;
        border: 1px solid #e6e6e6;
        overflow: hidden;
        padding: 15px;
        div {
          width: 100%;
          height: 95px;
          h3 {
            font-size: 20px;
            color: #333333;
            padding-top: 13px;
            line-height: 20px;
            cursor: pointer;
            &:hover {
              color: #eb4a4d;
            }
          }
          p {
            font-size: 16px;
            line-height: 18px;
            color: #333333;
          }
        }
      }
      .nav-lbt {
        list-style: none;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 16px;
        color: #ffffff;
        li {
          width: 45px;
          text-align: center;
          height: 60px;
          line-height: 35px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.3s;
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
        li:hover {
          transform: scale(1.04);
        }
        .active {
          opacity: .7;
          transform: scale(1.04);
        }
      }
    }
    .center {
      width: 580px;
      display: inline-block;
      float: left;
      margin-right: 17px;
      min-height: 1px;
      .news {
        border-bottom: 1px dashed #dddddd;
        margin-bottom: 22px;
        .news-left {
          float: left;
          width: 90px;
          margin-right: 6px;
          height: 135px;
          cursor: pointer;
          img {
            width: 90px;
            height: 120px;
          }
        }
        .news-right {

          h3 {
            font-size: 16px;
            line-height: 16px;
            color: #333333;
            margin-bottom: 16px;
            span {
              cursor: pointer;
            }
            span:hover {
              color: #eb4a4d;
            }
          }
          .jingxuan {
            font-size: 14px;
            line-height: 14px;
            margin-bottom: 21px;
            color: #555555;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            .tag {
              color: #eb4a4d;
              vertical-align: middle;
              float: left;
              img {
                width: 100%;
                height: 100%;
                vertical-align: middle;
              }
            }
            .smallS:hover {
              color: #eb4a4d;
            }
            p {
              .tuijian:hover {
                cursor: pointer;
                color: #eb4a4d;
              }
              .tuijian:last-child {
                .shu {
                  display: none;
                }
              }
              .wu {
                display: none;
              }
            }
          }
        }
      }
      .news:last-child {
        margin-bottom: 0;
        border-bottom: 0;
      }
    }
    .right {
      width: 283px;
      display: inline-block;
    }
  }
</style>
