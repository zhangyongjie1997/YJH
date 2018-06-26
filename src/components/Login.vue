<template>
  <div>
    <section id="loginPage" class="cur">
      <div id="content">
        <h2 class="login-title">欢迎回到猿计划</h2>
        <input v-model="username" class="login-input" type="text" placeholder="请输入登录手机号" required />
        <input v-model="password" class="login-input" type="password" placeholder="6-16位密码，区分大小写" required />
        <div class="login-choice">
          <input type="checkbox" value="autoLogin" class="autoLogin" />
          <label for="password" class="lable-autoLogin">下次自动登录</label>
          <p class="login-type">
            <span style="cursor: pointer;">忘记密码？</span>
            <router-link tag="a" to="/register">立即注册</router-link>
          </p>
        </div>
        <div class="login-btn" @click="login">登录</div>
        <p style="text-indent:6px ">使用合作账号登录</p>
        <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wxc649fbdaa41fc636&response_type=code&scope=snsapi_login&redirect_uri=http%3a%2f%2fweb.li-shang-bin.com&login_type=jssdk&self_redirect=default"
          id="wechat">
          <i class="iconfont icon-weixin"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    Login
  } from '../api/index.js';
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async login() {
        if (this.username.length < 11) {
          return this.$message.error('请输入正确的手机号');
        }
        if (this.password.length < 6) {
          return this.$message.error('请输入六位以上的密码');
        }
        let res = await Login(this.username, this.password);
        if (res.data.status == 1) { //1为成功，0失败
          this.$store.commit('loginMutation', true);
          localStorage.setItem("loginMsg", JSON.stringify(res.data.data[0])); //在本地保存用户信息
          this.$message({
            showClose: true,
            message: res.data.info,
            type: 'success'
          });
          this.$router.push('/personal');
        } else {
          this.$message.error(res.data.info);
        }
      }
    },
  }
</script>

<style scoped>
  #content {
    font-size: 14px;
    width: 300px;
    padding: 30px 60px;
    margin: 120px auto auto auto;
    height: 400px;
    background-color: rgb(255, 255, 255);
    border: 1px #ddd solid;
    box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.2);
  }

  .login-title {
    font-size: 16px;
    line-height: 36px;
    color: #000;
    text-align: center;
    font-weight: 400;
    display: block;
    border-bottom: 1px solid #000;
  }

  .login-input {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    border: 1px solid #ccc;
    line-height: 30px;
    text-indent: 6px;
  }

  #loginPage input:focus {
    outline: none;
    border: 1px solid #409eff;
  }

  .login-choice {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    line-height: 30px;
    text-indent: 6px;
  }

  .autoLogin {
    width: 17px;
    height: 17px;
    border: #000 2px solid;
    border-radius: 20%;
    background-color: #fff;
  }

  .login-type {
    display: inline;
    margin-left: 45px;
  }

  .lable-autoLogin,
  .autoLogin,
  .login-type span,
  .login-type a {
    vertical-align: middle;
  }

  .login-type a {
    color: #409eff;
  }

  .login-btn {
    height: 30px;
    background: #409eff;
    margin-top: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    width: 189px;
    margin: 30px auto;
    border-radius: 14px;
    cursor: pointer;
  }

  #forgetPwd:hover {
    color: gray;
  }

</style>
