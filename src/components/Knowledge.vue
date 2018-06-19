<template>
  <div class="container">
    <div class="nav">
      <ul>
        <li><router-link tag="a" to="/knowledge/knowledgeAll">全部</router-link></li>
        <li><router-link tag="a" to="/knowledge/knowledgeJava">java</router-link></li>
        <li><router-link tag="a" to="/knowledge/">html</router-link></li>
        <li><router-link tag="a" to="/knowledge/">css</router-link></li>
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
</style>
