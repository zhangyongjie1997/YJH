<template>
  <div class="container">
    <div class="nav">
      <ul>
        <li><router-link :class="{red:$route.meta.title=='全部'}" tag="a" to="/articles/all">全部</router-link></li>
        <li><router-link :class="{red:$route.meta.title=='经验分享'}" tag="a" to="/articles/jingyan">经验分享</router-link></li>
        <li><router-link :class="{red:$route.meta.title=='入门学习'}" tag="a" to="/articles/rumen">入门血洗</router-link></li>
        <li><router-link :class="{red:$route.meta.title=='成果分享'}" tag="a" to="/articles/chengguo">成果分享</router-link></li>
      </ul>
    </div>
    <div class="content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  created(){
    if(localStorage.loginMsg != ''){this.$store.commit('loginMutation',true);}
    this.userMsg = getUser();
  },
  components: {

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
    height: 25px;
    margin: 0 auto;
  }
}
.red{
  color: #f56c6c;
}
</style>
