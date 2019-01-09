<template>
  <div class="right">
    <div class="right-header">
      <h3>{{title}}</h3>
      <a @click="tomore(luyou)" v-if="Qbbd">更多>></a>
      <div v-if="Zyz" class="paihang">
        <span>周</span>
        <span>月</span>
        <span>总</span>
      </div>
    </div>
    <div class="right-content">
      <div class="content-one" :class="{noBorder:rcode === 'OTHERWORKS'}" v-for="(item,index) in onelist" :key="index">
        <div class="content-one-left" @mouseover="over(null)">
          <span class="indexNum" v-if="show_img != null" style="background-color: #eb4a4d;">
            1
          </span>
          <div class="ranking" v-if="rcode !== 'OTHERWORKS' && show_img == null">
            <span class="number1">NO.1</span>
          </div>
          <router-link class="bookname" tag="h3" :to="'/detailsInfo/'+item.novelId" :title="item.novelTitle" v-if="rcode !== 'RECOMMEND' && rcode !== 'OTHERWORKS'">
            {{item.novelTitle | limitWorld(11)}}
          </router-link>
          <p class="recommendTit" v-if="rcode === 'RECOMMEND' || rcode === 'OTHERWORKS'">
            <router-link class="bookname" tag="h3" :to="'/detailsInfo/'+item.novelId">
              <span class="title" v-if="rcode === 'OTHERWORKS'" :title="item.title">
                {{item.title | limitWorld(8)}}</span>
              <span class="title" v-if="rcode === 'RECOMMEND'" :title="item.novelTitle">
                {{item.novelTitle | limitWorld(8)}}</span>
            </router-link>
            &nbsp;|&nbsp; {{item.writer}}
          </p>
          <p v-if="words">{{123123}}
            <span>{{words}}</span>
          </p>
          <!-- <div v-if="bookType" class="classify">{{bookType}}</div> -->
          <div class="classify">
            <span class="novelType" v-if="rcode === 'RECOMMEND'">
              {{item.novelType}}
            </span>
            <span class="novelType" v-if="rcode === 'OTHERWORKS'">
              {{item.novelTypeName}}
            </span>
            <span class="status" v-if="rcode === 'RECOMMEND'" :class="{finished:item.isOverStr === '已完结',
                  going:item.isOverStr === '连载中',
                  unUpdate:item.isOverStr === '已停更'}">
              {{item.isOverStr}}</span>
            <span v-if="item.isOver === 1 && rcode === 'OTHERWORKS'" class="finished status">已完结</span>
            <span v-if="item.isOver === 0 && rcode === 'OTHERWORKS'" class="going status">连载中</span>
            <span v-if="item.isOver === 2 && rcode === 'OTHERWORKS'" class="unUpdate status">已停更</span>
            <router-link class="zuozheming" v-if="rcode !== 'RECOMMEND' && show_img == null" tag="span" :to="'/authorHomePage/'+item.userId">{{item.writer}}</router-link>
          </div>
        </div>
        <router-link class="content-one-right" tag="div" :to="'/detailsInfo/'+item.novelId" v-if="show_img == null">
          <a>
            <img :src="item.novelPhoto" alt="" v-if="item.novelPhoto !== '' && rcode !== 'OTHERWORKS'">
            <img :src="item.photoContent" alt="" class="otherImg" v-if="item.photoContent !== '' && rcode === 'OTHERWORKS'">
            <img :src="defaultCover" alt="" v-if="(item.novelPhoto === '' && rcode !== 'OTHERWORKS') ||
                  (item.photoContent === '' && rcode === 'OTHERWORKS')">
            <img :src="bookSkin" class="score" alt="" v-if="rcode === 'RECOMMEND' || rcode === 'OTHERWORKS'">
            <span class="scoreNum" v-if="(rcode === 'RECOMMEND' || rcode === 'OTHERWORKS') && item.scoreNum >= 10">
              {{item.score}}分
            </span>
            <span class="scoreNum ch" v-if="(rcode === 'RECOMMEND' || rcode === 'OTHERWORKS') && item.scoreNum < 10">
              暂无评分
            </span>
          </a>
        </router-link>
        <div class="content-describe" v-if="rcode === 'OTHERWORKS'">
          <p>{{item.describe | limitWorld(95)}}</p>
        </div>
      </div>
      <div class="content-ranking" v-if="rcode !== 'OTHERWORKS'">
        <div class="first" v-for="(dan,index) in rankinglist" v-if="index < 9" :key="index" @mouseover="over(index)">
          <span v-if="show_img != index">
            <span class="indexNum" :class="{indexTwo:index == 0, indexThree:index == 1}">
              {{index + 2}}
            </span>
            <router-link v-if="title === '免费榜'" class="mingzi" tag="div" :to="'/detailsInfo/'+dan.novelId" :title="dan.novelTitle">
              {{dan.novelTitle | limitWorld(11)}}
            </router-link>
            <router-link v-else class="mingzi" tag="div" :to="'/detailsInfo/'+dan.novelId" :title="dan.novelTitle">
              {{dan.novelTitle | limitWorld(11)}}
            </router-link>
          </span>
          <div class="my_box" v-if="show_img == index">
            <p>
              <span class="indexNum" :class="{indexTwo:index == 0, indexThree:index == 1}">
                {{index + 2}}
              </span>
            </p>
            <p>
              <router-link v-if="title === '免费榜'" class="bookname" tag="div" :to="'/detailsInfo/'+dan.novelId" :title="dan.novelTitle">
                {{dan.novelTitle | limitWorld(11)}}
              </router-link>
              <router-link v-else class="bookname" tag="div" :to="'/detailsInfo/'+dan.novelId" :title="dan.novelTitle">
                {{dan.novelTitle | limitWorld(11)}}
              </router-link>
            </p>
            <router-link :to="'/authorHomePage/'+dan.userId" style="color: #b1b1b1; font-size: 11px;cursor: pointer;">{{dan.writer}}</router-link>
            <!-- <p class="classify" style="color: #b1b1b1; font-size: 11px;">{{dan.writer}}</p> -->
          </div>
          <router-link class="content-one-right" tag="div" :to="'/detailsInfo/'+dan.novelId" v-if="show_img == index">
            <a>
              <img :src='dan.novelPhoto'>
            </a>
          </router-link>
          <!--<div class="hits">{{dan.click}}</div>-->
        </div>
      </div>
    </div>
    <!--<router-link class="more"
                 tag="p"
                 :to="'/ranking/' + rcode"
                 v-if="rankinglist.length > 9">
                 更多>>
    </router-link>-->
  </div>
</template>
<script>
import changWorld from '~js/utils/changeWorld';

export default {
  name: 'App',
  props: {
    title: {
      type: String,
      required: true
    },
    luyou: {
      type: String,
      required: true
    },
    words: {
      type: String
    },
    bookType: {
      type: String
    },
    rcode: {
      type: String,
      required: false
    },
    /* 是否显示 周 月 总 切换 */
    Zyz: {
      type: Boolean,
      required: true
    },
    /* 是否显示 全部榜单 */
    Qbbd: {
      type: Boolean,
      required: true
    },
    rankinglist: {
      type: Array,
      required: true
    },
    onelist: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      /* eslint-disable global-require */
      imgSrc: require('../../../assets/images/01.jpg'),
      defaultCover: require('../../../assets/images/novelcover.png'),
      bookSkin: require('../../../assets/images/detailsImg/bookSkin.png'),
      /* eslint-enable global-require */
      types: '',
      show_img: null
    };
  },
  // mounted () {
  //   console.log('rankinglist===' + JSON.stringify(this.rankinglist));
  //   console.log('oneList===' + JSON.stringify(this.onelist));
  // },
  filters: {
    limitWorld (val, params) {
      return changWorld(val, params);
    }
  },
  methods: {
    over (key) {
      this.show_img = key;
    },
    // out() {
    //   let _this = this;
    //   clearTimeout(time)
    //   const time = setTimeout(() => {
    //     _this.show_img = null;
    //   }, 200);
    // },
    biaoti (data) {
      const nameItem = data.map(item => item.typeName);
      this.types = nameItem.join(',');
    },
    tomore (item) {
      this.$router.push({ path: item });
    }
  },
  components: {

  }
  // created () {
  // }
};
</script>

<style type="text/scss" lang="scss" scoped>
.right {
  margin-bottom: 34px;
  height: 450px;
  .right-header {
    width: 100%;
    height: 40px;
    padding-top: 13px;
    padding-bottom: 9px;
    border-bottom: 1px solid #999;
    h3 {
      float: left;
      font-size: 18px;
      line-height: 18px;
      color: #333333;
    }
    a {
      float: right;
      color: #666666;
      font-size: 16px;
      line-height: 16px;
    }
    a:hover {
      color: #eb4a4d;
    }
    .paihang {
      float: right;
      color: #b1b1b1;
      font-size: 12px;
      line-height: 12px;
      span {
        display: inline-block;
        margin-right: 12px;
      }
      span:nth-child(1) {
        color: #de554f;
      }
      span:nth-child(3) {
        margin-right: 0;
      }
    }
  }
  .more {
    font-size: 14px;
    color: #de554f;
    text-align: right;
    margin-top: 5px;
    cursor: pointer;
  }
  .content-one {
    width: 100%;
    padding-top: 13px;
    overflow: hidden;
    border-bottom: 1px dashed #dddddd;
    .content-one-left {
      float: left;
      font-size: 12px;
      p {
        font-size: 14px;
        color: #ee4848;
        line-height: 14px;
        padding-bottom: 12px;
        span {
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .ranking {
        width: 36px;
        height: 20px;
        /*margin-top:14px;*/
        margin-bottom: 16px;
        padding: 5px 3px;
        background-color: #eb4a4d;
        .number1 {
          width: 100%;
          height: 100%;
          vertical-align: top;
          font-size: 12px;
          color: #ffffff;
          line-height: 12px;
        }
      }
      .recommendTit {
        display: inline-block;
        color: #b1b1b1;
        font-size: 12px;
        h3 {
          margin-bottom: 0;
          display: inline-block;
        }
      }
      .bookname {
        font-size: 14px;
        line-height: 14px;
        color: #333333;
        margin-bottom: 11px;
        cursor: pointer;
        .title {
          margin-left: 0;
        }
      }
      .bookname:hover {
        color: #eb4a4d;
      }
      .classify {
        line-height: 12px;
        color: #b1b1b1;
        margin-bottom: 12px;
        width: 185px;
        .novelType {
          font-size: 14px;
          width: 54px;
          height: 24px;
          border: 1px #fd7989 solid;
          border-radius: 4px;
          color: #fd7989;
          text-align: center;
          padding-top: 6px;
          cursor: text;
          display: block;
        }
        .status {
          width: 60px;
          font-size: 13px;
          color: #ffffff;
          border-radius: 5px;
          padding: 0px 10px;
          margin-top: 14px;
          line-height: 24px;
          display: block;
        }
        .finished {
          background-color: #fe7b1a;
        }
        .going {
          background-color: #22b722;
        }
        .unUpdate {
          background-color: #bbb;
        }
        .fenlei {
          margin-right: 9px;
          display: inline-block;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span:last-child {
            .douH {
              display: none;
            }
          }
        }
        .shu {
          margin-right: 9px;
        }
        .zuozheming:hover {
          cursor: pointer;
          color: #eb4a4d;
        }
      }
    }
    .content-one-right {
      float: right;
      width: 52px;
      height: 91px;
      cursor: pointer;
      transform: perspective(60px) rotateY(-10deg);
      position: relative;
      margin-right: 20px;
      a {
        position: relative;
        z-index: 10;
        display: inline-block;
        transform: translateZ(50px);
        img {
          width: 52px;
          height: 87px;
        }
        .otherImg {
          opacity: 0.7;
        }
        .score {
          position: absolute;
          top: 32px;
          width: 57px;
          height: 22px;
        }
        .scoreNum {
          font-size: 14px;
          color: #ffffff;
          position: absolute;
          left: 0;
          top: 34px;
          width: 57px;
          height: 22px;
          text-align: center;
          transform: none;
          box-shadow: none;
        }
        .ch {
          font-size: 12px;
          line-height: 20px;
        }
      }
      span {
        position: absolute;
        z-index: 1;
        top: 84.1%;
        left: 7px;
        width: 20px;
        height: 10px;
        content: "";
        transform: perspective(74px) rotateX(-70deg) rotateY(-5deg);
        box-shadow: 25px 0 5px 5px #adadad;
      }
    }
    .content-describe {
      clear: both;
      p {
        font-size: 16px;
        color: #666666;
        line-height: 26px;
      }
    }
    .content-one-right:after {
      position: absolute;
      z-index: 2;
      top: 2%;
      left: 100%;
      width: 10%;
      height: 92%;
      content: " ";
      transform: perspective(60px) rotateY(26deg);
      background-color: #efefef;
      box-shadow: inset 0 0 5px #333;
    }
  }
  .noBorder {
    border-bottom: none;
  }
  .content-ranking {
    width: 100%;
    .first {
      // padding-bottom: 10px;
      width: 100%;
      min-height: 32px;
      max-height: 105px;
      line-height: 32px;
      font-size: 14px;
      border-bottom: 1px dashed #dddddd;
      position: relative;
      .indexNum {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-color: #ededed;
        text-align: center;
        line-height: 16px;
        color: #b1b1b1;
      }
      .indexTwo {
        background-color: #e77a32;
        color: #ffffff;
      }
      .indexThree {
        background-color: #e6bf25;
        color: #ffffff;
      }
      .mingzi {
        width: 179px;
        display: inline-block;
        font-size: 14px;
        color: #333333;
        margin-left: 8px;
        cursor: pointer;
      }
      .mingzi:hover {
        color: #eb4a4d;
      }
      .hits {
        float: right;
        color: #b1b1b1;
        font-size: 12px;
      }
    }
  }
}
.content-one-right {
  width: 52px;
  height: 100px;
  display: inline-block;
  cursor: pointer;
  transform: perspective(60px) rotateY(-10deg);
  position: relative;
  margin-right: 20px;
  a {
    position: relative;
    z-index: 10;
    display: inline-block;
    transform: translateZ(50px);
    img {
      width: 52px;
      height: 87px;
    }
    .otherImg {
      opacity: 0.7;
    }
    .score {
      position: absolute;
      top: 32px;
      width: 57px;
      height: 22px;
    }
    .scoreNum {
      font-size: 14px;
      color: #ffffff;
      position: absolute;
      left: 0;
      top: 34px;
      width: 57px;
      height: 22px;
      text-align: center;
      transform: none;
      box-shadow: none;
    }
    .ch {
      font-size: 12px;
      line-height: 20px;
    }
  }
  span {
    position: absolute;
    z-index: 1;
    top: 84.1%;
    left: 7px;
    width: 20px;
    height: 10px;
    content: "";
    transform: perspective(74px) rotateX(-70deg) rotateY(-5deg);
    box-shadow: 25px 0 5px 5px #adadad;
  }
}
.content-one-right:after {
  position: absolute;
  z-index: 2;
  top: 2%;
  left: 100%;
  width: 10%;
  height: 85%;
  content: " ";
  transform: perspective(60px) rotateY(26deg);
  background-color: #efefef;
  box-shadow: inset 0 0 5px #333;
}
.my_box {
  display: inline-block;
  width: 207px;
  height: 100px;
}
.bookname {
  font-size: 14px;
  line-height: 14px;
  color: #333333;
  margin-bottom: 5px;
  cursor: pointer;
  .title {
    margin-left: 0;
  }
}
.bookname:hover {
  color: #eb4a4d;
}
.indexNum {
  display: inline-block;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  float: left;
}
</style>
