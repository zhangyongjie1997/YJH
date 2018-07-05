<template>
  <div>
    <header>
      <div id="view">
        <div id="logo">
          <img class="logo-img fl" src="../assets/logo.png" alt="logo">
          <router-link tag="h2" to="/home" class="logo-title fl pointer">猿计划</router-link>
        </div>
        <nav class="nav fl">
          <ul class="nav-menu fr">
            <li class="nav-menu-items pointer" v-if="ifLogin">
              <router-link tag="a" to="/personal">个人中心</router-link>
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
            <li class="nav-menu-items" id="nav-write">
              <router-link tag="a" to="/write">写文章</router-link>
            </li>
            <li class="nav-menu-items pointer" v-if="!ifLogin" id="nav-login">
              <router-link tag="a" to="/login">登录</router-link>
            </li>
            <li class="nav-menu-items pointer" v-if="!ifLogin" id="nav-signIn">
              <router-link tag="a" to="/register">注册</router-link>
            </li>
            <div class="search">
                <input :class="{'has':ifInput,'unhas':!ifInput}" type="text" v-model="searchContent">
                <span class="searchBtn"><i @click="search" class="iconfont icon-sousuo"></i></span>
            </div>
            <div class="fl pointer" id="nav-photo" v-if="ifLogin" :style="{backgroundImage:'url('+avatar+')'}">
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
  import {getUser} from '../api/index.js';
  export default {
    data() {
      return {
        avatar: '',
        searchContent:'',
        ifInput:false
      }
    },
    created() {
      this.getAvatar();
    },
    computed: {
      ifLogin() {
        return this.$store.state.ifLogin;
      }
    },
    methods: {
      search(){
        window.location.href = "https://www.baidu.com/s?wd="+this.searchContent;
      },
      getAvatar() {
        if (this.ifLogin) {
          this.avatar = 'http://www.ftusix.com/static/data/upload/' + getUser().avatar;
        }
      },
      exit() {
        this.$store.commit('loginMutation', false);
        localStorage.removeItem('loginMsg');
        this.$router.push('/login');
      }
    },
    watch: {
      searchContent(){
        if(this.searchContent==''){
          this.ifInput = false;
        }else{
          this.ifInput = true;
        }
      },
      ifLogin() {
        this.getAvatar();
      }
    }
  }

</script>

<style scoped>
  .search{
    left: 30px;
    position: relative;
    display: inline-block;
    height: 64px;
    text-align: center;
    line-height: 64px;
    margin-left: 20px;
  }
  .search input.unhas{
    width: 30px;
    outline: none;
    border: #999 1px solid;
    border-radius: 15px;
    padding: 5px 10px;
    transition: all .4s ease;
  }
  .search input.has{
    width: 100px;
    outline: none;
    border: #999 1px solid;
    border-radius: 15px;
    padding: 5px 10px;
  }
  .search input.unhas:focus{
    border-color: #409EFF;
    width: 100px;
  }
  .searchBtn{
    cursor: pointer;
    position: absolute;
    z-index: 100;
    right: 6px;
    top: 2px;
  }
  .searchBtn i:hovre{
    color: #409EFF;
  }

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
    width: 75%;
  }

  header #view #logo .logo-img {
    cursor: pointer;
    height: 65px;
    transition: all linear .5s;
  }
  header #view #logo .logo-img:hover{
    transform: rotateY(360deg);
  }

  header #view #logo h2 {
    line-height: 65px;
    color: #050505;
    font-size: 26px;
  }

  .nav-menu {
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
    transition: all 0.2s;
  }

  .nav-menu-items:hover {
    border-bottom: 3px solid #409EFF;
  }
  .nav-menu:first-child {
    margin-left: 120px;
  }

  .nav-menu-items a {
    color: rgb(72, 87, 106);
    font-size: 16px;
    line-height: 65px;
  }
 a.router-link-active{
    color: #409EFF;
  }
  #nav-photo {
    width: 50px;
    height: 50px;
    position: relative;
    top: 8px;
    left: 20px;
    background-size: 50px 50px;
    border-radius: 50%;
    box-shadow: 0 0 2px #ccc;
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
    transition: all 0.2s;
  }

  #photo-nav-list ul li {
    text-align: center;
    line-height: 30px;
    width: 70px;
    height: 30px;
    font-size: 14px;
    background-color: rgb(255, 255, 255);
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
