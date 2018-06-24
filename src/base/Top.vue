<template>
  <div>
    <header>
      <div id="view">
        <div id="logo">
          <img class="logo-img fl"
               src="../assets/logo.png"
               alt="logo">
          <h2 class="logo-title fl pointer">猿计划</h2>
        </div>
        <nav class="nav fl">
          <ul class="nav-menu fr">
            <li class="nav-menu-items pointer" v-if="ifLogin">
              <router-link tag="a" to="/personal">个人中心</router-link>
            </li>
            <li class="nav-menu-items pointer" v-if="ifLogin">
              <a href="javascript:void(0)">未读消息</a>
            </li>
            <li class="nav-menu-items pointer">
              <router-link tag="a" to="/home">首页</router-link>
            </li>
            <li class="nav-menu-items pointer">
              <router-link tag="a" to="/knowledge">知识体系</router-link>
            </li>
            <li class="nav-menu-items pointer">
              <a href="javascript:void(0)">活动中心</a>
            </li>
            <li class="nav-menu-items pointer">
              <router-link tag="a" to="/articles">文章</router-link>
            </li>
            <li class="nav-menu-items pointer" v-if="!ifLogin"
                id="nav-login">
              <router-link tag="a" to="/login">登录</router-link>
            </li>
            <li class="nav-menu-items pointer" v-if="!ifLogin"
                id="nav-signIn">
              <router-link tag="a" to="/register">注册</router-link>
            </li>
            <li class="nav-menu-items"
                id="nav-write" v-if="ifLogin">
              <router-link tag="a" to="/write">写文章</router-link>
            </li>
            <div class="fl pointer" id="nav-photo" v-if="ifLogin">
                <div id="photo-nav-list">
                    <ul>
                        <router-link to="/personal" tag="li" id="photo-nav-list-personInfo">个人中心</router-link>
                        <li id="photo-nav-list-exit" @click="exit">退出</li>
                    </ul>
                </div>
            </div>
          </ul>
        </nav>
      </div>
      <div class="headerPlaceHolder"></div>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
    }
  },
  created(){

  },
  computed:{
    photo(){},
    ifLogin(){
      return this.$store.state.ifLogin;
    }
  },
  methods:{
    exit(){
      this.$store.commit('loginMutation',false);
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

header {
  top: 0px;
  width: 100%;
  height: 65px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1), 0 1px rgba(0, 0, 0, 0.1);
  z-index: 100;
  position: fixed;
  background-color: rgb(250, 250, 250);
  border-top: 1px solid #333;
  margin-top: 0px;
}
.headerPlaceHolder {
  width: 100%;
  height: 64px;
  background-color: #fff;
}

header #view {
  margin: 0 auto;
  width: 1100px;
}
header #view #logo .logo-img {
  height: 60px;
}
header #view #logo h2 {
  line-height: 65px;
  color: #050505;
  font-size: 26px;
}
.nav-menu {
  display: block;
  clear: both;
}
/* .nav-menu::before{
    content:"";
    display: table;
}
.nav-menu::after{
    content: "";
    clear: both;
} */
.nav-menu-items {
  float: left;
  height: 60px;
  margin: 0 0 0 40px;
  border-bottom-color: rgba(0, 0, 0, 0);
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
  -ms-transition: all 0.2s;
  transition: all 0.2s;
}

.nav-menu-items:hover {
  border-bottom: 3px solid #409EFF !important;
}
.nav-menu-items:active {
  border-bottom: 3px solid #409EFF !important;
}
.nav-menu-items:link {
  border-bottom: 3px solid #409EFF !important;
}
.nav-menu:first-child {
  margin-left: 150px;
}
.nav-menu-items a {
  color: rgb(72, 87, 106);
  font-size: 16px;
  line-height: 65px;
}
#nav-photo {
  width: 50px;
  height: 50px;
  position: relative;
  top: 8px;
  left: 20px;
  background-size: 50px 50px;
  background-image: url('../assets/logo.png');
}
#photo-nav-list {
  height: 0px;
  position: absolute;
  width: 70px;
  box-shadow: 0px 0px 6px -5px #ccc, 0px 0px 0px #ccc, 0px 0px 5px #ccc,
    0px 0px 2px #ccc;
  top: 58px;
  left: -9px;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
  -ms-transition: all 0.2s;
  transition: all 0.2s;
}
#photo-nav-list ul li {
  text-align: center;
  line-height: 30px;
  width: 70px;
  height: 30px;
  font-size: 14px;
  background-color: rgb(255, 255, 255);
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -o-transition: all 0.4s;
  -ms-transition: all 0.4s;
  transition: all 0.4s;
}
#nav-photo:hover #photo-nav-list {
  height: 60px;
  padding: 5px 0px;
}
#photo-nav-list ul li:hover {
  background-color: #eee;
}

</style>
