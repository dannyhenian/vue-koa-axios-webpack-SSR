<template>
    <div class="hotlist" v-if="list.length!=0">
      <div class="hotlist-header">
        <p>{{prefecture}}</p>
        <p @click="change()">
          <span>
            <img :src="change1" alt="">
          </span>
          换一批
        </p>
      </div>
      <div class="hotlist-content">
          <div class="show">
            <div class="show-one" v-for="(item,index) in list" :key="index">
              <router-link class="bookpic" tag="div"
              :to="'/detailsInfo/'+item.novelId">
                <img :src='item.photoContent' alt="">
              </router-link>
              <div class="bookdetails">
                <div class="bookname">
                  <span v-if="prefecture==='VIP推荐'">
                    <img :src='sign' alt="">
                  </span>
                  <router-link tag="span"
                            :to="'/detailsInfo/'+item.novelId">
                            {{item.novelTile|limitWorld(10)}}
                  </router-link>
                </div>
                <div class="contentdetails" :title="item.novelDescribe">{{item.novelDescribe|limitWorld(60)}}</div>
                <div class="writer">
                  <router-link tag="span" :to="'/authorHomePage/'+item.authorUserId">{{item.authorPenName}}</router-link>
                &#12288;著</div>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import changWorld from '~js/utils/changeWorld';

export default {
  name: 'hotlist',
  props: {
    prefecture: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      /* eslint-disable global-require */
      change1: require('../../../assets/images/change.png'),
      sign: require('../../../assets/images/sign.png')
      /* eslint-disable global-require */

    };
  },
  filters: {
    limitWorld (val, params) {
      return changWorld(val, params);
    }
  },
  methods: {
    change () {
      if (this.prefecture == '免费推荐') {// eslint-disable-line
        this.$emit('changefree', 1);
      } else if (this.prefecture == 'VIP推荐') {// eslint-disable-line
        this.$emit('changefree', 2);
      } else {
        this.$emit('changefree', 3);
      }
    }
  },
  components: {
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
  .hotlist{
    width: 100%;
    margin-bottom: 41px;
    .hotlist-header{
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
    .hotlist-content{
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
                }
                span:hover{
                  cursor: pointer;
                  color: #eb4a4d;
                }
            }
          }
        }

      }
    }
  }
</style>
