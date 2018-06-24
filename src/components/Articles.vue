<template :sort="newSort">
  <div class="container">
    <div class="nav">
      <ul>
        <li><router-link :class="{red:$route.meta.title=='全部'}" tag="a" to="/articles/all">全部</router-link></li>
        <li><router-link :class="{red:$route.meta.title=='经验分享'}" tag="a" to="/articles/jingyan">经验分享</router-link></li>
        <li><router-link :class="{red:$route.meta.title=='入门学习'}" tag="a" to="/articles/rumen">入门血洗</router-link></li>
        <li><router-link :class="{red:$route.meta.title=='成果分享'}" tag="a" to="/articles/chengguo">成果分享</router-link></li>
      </ul>
    </div>
    <div class="sort">
      <div class="choice">
        <div @click="sortNew" :class="{'sort-active':newSort=='new'}" class="new sortItem">最新</div>
        <div @click="sortHot" :class="{'sort-active':newSort!='new'}" class="hot sortItem">最热</div>
      </div>
    </div>
    <div class="content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :sort="newSort" :userMsg="userMsg"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getUser} from '../api/index.js';
export default {
  data() {
    return {
      userMsg:{},
      newSort:'new',
    }
  },
  created(){
    if(localStorage.loginMsg != ''){this.$store.commit('loginMutation',true);}
    this.userMsg = getUser();
  },
  methods:{
    sortHot(){
      if(this.newSort == 'new'){
        this.newSort = 'hot';
      }
    },
    sortNew(){
      if(this.newSort == 'hot'){
        this.newSort = 'new';
      }
    },
  }
}
</script>

<style scoped lang="less">
.container{
  margin-top: 75px;
  .nav{
    width: 70%;
    height: 25px;
    margin: 0 auto;
    padding: 10px 0;
    border-bottom: 1px solid #000;
    ul{
      li:first-child{
        margin-left: 0;
      }
      li{
        float: left;
        margin-left: 50px;
        color: #3d4044;
        font-weight: 700;
      }
    }
  }
  .content{
    width: 70%;
    margin: 0 auto;
  }
  .sort{
    width: 70%;
    margin: 0px auto 10px auto;
    .choice{
      padding: 5px;
      height: 30px;
      .sortItem:first-child{
        margin-left: 0;
      }
      .sortItem{
        float: left;
        margin-left: 15px;
        width: 60px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: black;
        cursor: pointer;        
      }
      .sort-active{
        color: #fff;
        background-color: #409EFF;
      }
    }
  }
}
.red{
  color: #f56c6c;
}
</style>
