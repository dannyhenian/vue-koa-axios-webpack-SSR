<template>
  <div class="page-top" id="page-top">
    <Header>
      <div class="content header-content">
        <div class="logo" @click="_skipindex()">{{websitName}}</div>
        <div style="display: inline-block;position:relative">
            <input type="text" name="searchInput" style="display:none"/>
            <Input
            name="searchInput"
            v-model.trim="searchBookValve"
            type="text"
             @on-keyup.enter="searchItemHandle()"
            @on-focus="getShow"
            @on-blur="getHidden"
            placeholder="找书、找作者"/>
            <div v-if="showTIme" class="searchShow">
                <div style="font-size: 14px;color:#999;border-bottom: 1px solid #ddd;
                padding-bottom: 3px;line-height: 23px">大家都在看</div>
                <div class="menuList" v-for="(tmp,index) in searchBookList" :key="index"
                     @click="showMenue(tmp.id)">
                    <i></i>  {{tmp.title | fromWorld(16)}}
                </div>
            </div>
            <span class="search1" @click="searchItemHandle()">
              <img src="../../assets/images/search.png" alt="">
            </span>
        </div>
        <div class="header-content-right">
          <div class="headportrait">
            <router-link to="/personalCenter" v-show="loginState">
                <img src="../../assets/images/topphoto.png" alt=""
                     v-if="userphoto==''">
                <img :src='userphoto' alt="" v-else>
            </router-link>
            <div class="user" v-show="loginState">
              <p class="username">{{username}}</p>
             <!-- <p @click="signOut" class="signout1">退出</p>-->
              <p  class="signout1">退出</p>
            </div>
            <div class="user login" v-show="!loginState">
              <span @click="login">
                <a  class="login1">
                  登录
                </a>
              </span>
              <span @click="register">
                <a  class="register1">
                  注册
                </a>
              </span>
            </div>
          </div>
          <ul class="user-item">
            <li>
              <span><img :src="his"></span>
              <span>
                <a   @click="_skipHistory()" @mouseover="hoverchange1" @mouseout="hoverout1">历史</a>
              </span>
            </li>
            <li>
              <span><img :src="boo"></span>
              <span>
                <a   @click="_skipFavorite()" @mouseover="hoverchange2" @mouseout="hoverout2">书架</a>
              </span>
            </li>
            <li class="message">
              <span><img :src="mes"></span>
              <span class="special">
                <span class="count" v-show="loginState"><em>{{messageNum}}</em></span>
                <a @click="_skipMessage()" @mouseover="w_hoverchange" @mouseout="w_outchange" style="margin-right: 20px;">消息</a>
              </span>
            </li>
            <li v-show="loginState">
              <span><img :src="qian"></span>
              <span>
              <!--  <a   @click="skipSign()" @mouseover="hoverchange3" @mouseout="hoverout3">签到</a>-->
                <a  @mouseover="hoverchange3" @mouseout="hoverout3">签到</a>
              </span>
            </li>
          </ul>

        </div>
        <div class="notice" v-if="noticeList.length!=0">
          <div class="waim">
            <div class="wai1">
              <img src="../../assets/images/laba.png" alt="">
            </div>
            <div class="nrwaim">
              <p class="kuang">
                <marquee class="ggcontent1" scrollAmount=5 >
                  <div v-if="noticeList.length>1" v-for="(item,index) in noticeList" :key="index" class="hhhh">
                    <div class="wai">
                      [系统公告]
                    </div>
                    :
                    {{item.content}}
                  </div>
                  <div  v-if="noticeList.length==1"  class="hhhh">
                    <div class="wai">
                      [系统公告]
                    </div>
                    :
                    {{noticeList[0].content}}
                  </div>
                </marquee>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Header>
    <div class="nav-menu">
      <div class="content nav-content">
         <Menu mode="horizontal" :theme="theme1" :active-name="activeItem">
           <!-- eslint-disable -->
          <MenuItem name="">
            <!--<router-link to="/">首页</router-link>-->
            首页
          </MenuItem>
          <MenuItem name="ranking">
           <!-- <router-link to="/ranking/0">排行</router-link>-->
            排行
          </MenuItem>
          <MenuItem name="library">
            <!--<router-link to="/library/1">书库</router-link>-->
            书库
          </MenuItem>
          <MenuItem name="recharge">
           <!-- <router-link to="/recharge">充值</router-link>-->
            充值
          </MenuItem>
          <MenuItem name="personalCenter">
            <!--<router-link to="/personalCenter">个人中心</router-link>-->
            个人中心
          </MenuItem>
          <MenuItem name="welfare">
                 <!--<router-link to="/welfare" target="_blank">作者福利</router-link>-->
            作者福利
           </MenuItem>
          <MenuItem name="manage" v-if="recodeCode === 0||recodeCode === 101" v-show="loginState">
            <!--<router-link to="/manage/manage_book">管理</router-link>-->
            管理
          </MenuItem>
          <MenuItem name="endit" v-if="recodeCode === 101" v-show="loginState">
            <!--<router-link to="/endit">编辑</router-link>-->
            编辑
          </MenuItem>
           <!--eslint-enable-->
           <Dropdown style="margin-left: 20px;position: absolute;right:0;" trigger="click">
               <!-- <Button type="primary" @click="changePage()">-->
                <Button type="primary" >
                  <Icon type="chevron-down"></Icon>
                    创建作品
                </Button>
            </Dropdown>
        </Menu>
        <!--<div class="user-sign" v-if="isUserSign">
          <img src="../assets/images/personCenter/cha.png" alt="" class="cha"
          @click="closeSign">
          <div class="user-sign-left">
            <ul class="left-top">
              <li>日</li>
              <li>一</li>
              <li>二</li>
              <li>三</li>
              <li>四</li>
              <li>五</li>
              <li>六</li>
            </ul>
            <div class="left-center">
              <span @click="preMonth" v-if="isLeft">
                <img src="../assets/images/personCenter/zuo.png" alt="">
              </span>
              <span @click="lastMonth" v-if="isRight">
                <img src="../assets/images/personCenter/you.png" alt="">
              </span>
            </div>
            <ul class="left-content">
              <li v-for="(item, index) in dateList" :key="index"
              :class="{signed:item.isSinged}">{{item.day}}</li>
            </ul>
          </div>
          <div class="user-sign-right">
            <div class="right-head">
              <p class="date">{{rizi}}</p>
              &lt;!&ndash; <p class="date">2018年8月23日</p> &ndash;&gt;
              <p class="btn" v-if="issiged==false" @click="signin1">立即签到</p>
              <p class="btn1" v-if="issiged==true">已签到</p>
            </div>
            <div class="right-info">
              <p class="infoTitle1">签到规则</p>
                <p>签到可获得推荐票1张，</p>
                <p>点数1.5连续签到7天，</p>
                <p>可额外获得5点以及10</p>
                <p>阅读币</p>
                <p class="infoTitle1">其他说明</p>
                <p>如中间断签，累计天数</p>
                <p>清零，重新计算</p>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script src="./Top.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" lang="scss" scoped>
@import './Top.scss';
</style>
