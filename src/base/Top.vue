<template>
  <div>
    <header ref="header" style="top:0;">
      <div id="view">
        <div id="logo" class="pointer">
          <img class="logo-img fl" src="../assets/logo1.png" alt="logo">
          <router-link tag="h2" to="/home" class="logo-title fl pointer">猿计划</router-link>
        </div>
        <nav class="nav">
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
              <router-link tag="a" to="/articles">文章</router-link>
            </li>
            <li class="nav-menu-items" id="nav-write">
              <router-link tag="a" to="/write">写文章</router-link>
            </li>
            <li class="nav-menu-items pointer">
              <div style="position:relative;">
                <a href="javascript:void(0)">
                  <label class="pointer" for="check">搜索</label>
                </a>
                <input type="checkbox" id="check" style="display:none;">
                <div class="search">
                  <input :class="{'has':ifInput,'unhas':!ifInput}" type="text" v-model="searchContent">
                  <span class="search-btn pointer">
                    <i @click="search" class="iconfont icon-sousuo"></i>
                  </span>
                </div>
              </div>
            </li>
            <li class="nav-menu-items pointer" v-if="!ifLogin" id="nav-login">
              <router-link tag="a" to="/login">登录</router-link>
            </li>
            <li class="nav-menu-items pointer" v-if="!ifLogin" id="nav-signIn">
              <router-link tag="a" to="/register">注册</router-link>
            </li>
            <li class="fl pointer" id="nav-photo" v-if="ifLogin" :style="{backgroundImage:'url('+avatar+')'}">
              <div id="photo-nav-list">
                <ul>
                  <router-link to="/personal" tag="li" id="photo-nav-list-personInfo">个人中心</router-link>
                  <li id="photo-nav-list-exit" @click="exit">退出</li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getUser
  } from '../api/index.js';
  import {
    setInterval,
    clearInterval,
    setTimeout
  } from 'timers';
  import {
    log
  } from 'async';
  export default {
    data() {
      return {
        avatar: '',
        searchContent: '',
        ifInput: false,
        time: null,
        fixedStyle: {},
        timer: null,
        timer2: null,
        onTop: false,
        anmition: false,
        scrollDistance: Number
      }
    },
    created() {
      this.scrollDistance = document.documentElement.scrollTop;
      this.init();
      this.getAvatar();
    },
    beforeRouteLeave(to, from, next) {
      window.removeEventListener('scroll', scroll);
      clearInterval(this.timer);
      clearInterval(this.timer2);
      next();
    },
    computed: {
      ifLogin() {
        return this.$store.state.ifLogin;
      },
    },
    methods: {
      init() {
        const scroll = () => {
          this.timer2 = setTimeout(() => {
            this.scrollDistance = document.documentElement.scrollTop;
            clearTimeout(this.timer2);
          }, 0)
          console.log(document.documentElement.scrollTop, document.documentElement.scrollTop - this.scrollDistance);
          if (document.documentElement.scrollTop - this.scrollDistance < 0) {
            if (this.onTop && !this.anmition) {
              this.scrollToTop(
                this.$refs.header,
                this.$refs.header.style.top.slice(0, -2),
                0,
                'top',
                () => {
                  this.onTop = false;
                  this.anmition = false;
                }
              );
            }
            return;
          }
          if (document.documentElement.scrollTop > 200) {
            if (!this.anmition && !this.onTop) {
              this.scrollToTop(
                this.$refs.header,
                this.$refs.header.style.top.slice(0, -2), -67,
                'top',
                () => {
                  console.log('run cb');
                  this.onTop = true;
                  this.anmition = false;
                });
              this.timer2 = setTimeout(() => {
                this.scrollDistance = document.documentElement.scrollTop;
                clearTimeout(this.timer2);
              }, 0)
              return;
            }
          }

        };
        window.addEventListener('scroll', scroll);
      },
      scrollToTop(ele, from, to, property, cb) {
        console.log(arguments);
        this.anmition = true;
        this.timer = setInterval(() => {
          ele.style[property] = from + 'px';
          from -= 1;
          if (from <= -65) {
            from = -67;
            ele.style[property] = to + 'px';
            clearInterval(this.timer);
            cb();
          }
        }, 13)
      },
      search() {
        window.location.href = "https://www.baidu.com/s?wd=" + this.searchContent;
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
      searchContent() {
        if (this.searchContent == '') {
          this.ifInput = false;
        } else {
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
  .search {
    position: absolute;
    height: 64px;
    top: 0px;
    right: -10px;
    text-align: center;
    line-height: 64px;
    transition: all .4s ease;
    opacity: 0;
    z-index: -100;
  }

  #check:checked~.search {
    opacity: 1;
    top: 50px;
  }

  .search input.unhas {
    width: 30px;
    outline: none;
    border: #999 1px solid;
    border-radius: 15px;
    padding: 5px 10px;
    transition: all .4s ease;
  }

  .search input.has {
    width: 100px;
    outline: none;
    border: #999 1px solid;
    border-radius: 15px;
    padding: 5px 10px;
  }

  .search input.unhas:focus {
    border-color: #409EFF;
    width: 100px;
  }

  .search-btn {
    position: absolute;
    z-index: 100;
    right: 6px;
    top: 2px;
  }

  .search-btn i:hovre {
    color: #409EFF;
  }

  header {
    position: fixed;
    width: 100%;
    height: 65px;
    margin-top: 0px;
    top: 0px;
    z-index: 100;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1), 0 1px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: all .5s ease;
  }

  #view {
    height: 100%;
    width: 75%;
    margin: 0 auto;
  }

  #logo {
    padding-left: 3%;
  }

  #logo .logo-img {
    height: 65px;
    transition: all linear .5s;
  }

  #logo .logo-img:hover {
    transform: rotateY(360deg);
  }

  #logo h2 {
    line-height: 65px;
    color: #050505;
    font-size: 26px;
  }

  .nav {
    display: inline-block;
    width: 75%;
    ;
  }

  .nav-menu {
    position: absolute;
    top: 0;
    left: 42%;
    display: inline-block;
  }

  .nav-menu:first-child {
    margin-left: 30px;
  }

  .nav-menu-items {
    float: left;
    height: 60px;
    margin-left: 40px;
    border-bottom-color: rgba(0, 0, 0, 0);
    transition: all 0.2s;
  }

  .nav-menu-items:hover {
    border-bottom: 3px solid #409EFF;
  }

  .nav-menu-items a {
    color: rgb(72, 87, 106);
    font-size: 16px;
    line-height: 65px;
  }

  a.router-link-active {
    color: #409EFF;
  }

  #nav-photo {
    position: relative;
    width: 50px;
    height: 50px;
    top: 10px;
    left: 30px;
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
