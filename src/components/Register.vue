<template>
  <div>
    <section id="signInPage">
        <div id="content">
            <h2 id="login-title">欢迎回到猿计划</h2>
            <input class="signIn-input" type="text" placeholder="请输入手机号" required />
            <input class="signIn-input" type="password" placeholder="请输入6位以上密码" required />
            <input class="signIn-input" type="password" placeholder="请输确认密码" required />
            <div class="message-code">
                <input type="text" class="code-number fl" placeholder="请输入短信验证码" required/>
                <span class="get-code fl">获取验证码</span>
            </div>
            <div id="signin-btn" class="signin-btn pointer login-btn">注册</div>
            <span>已有账号，</span>
            <router-link tag="a" to="/login" id="alredySignIn" style="color: red;">立即登录</router-link>
        </div>  
    </section>
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

<style scoped>
#content{
    font-size: 14px;
    width: 300px;
    padding: 30px 60px;
    margin: 120px auto auto auto;
    height: 400px;
    background-color: rgb(255, 255, 255);
    border:1px #ddd solid;
    box-shadow: 1px 1px 6px 0 rgba(0,0,0,.2);
}
#signInPage input{
    width: 100%;
    height: 30px;
    margin-top: 20px;
    border:1px solid #ccc;
    line-height: 30px;
    text-indent: 6px;
}
#signInPage input:focus {
    outline: none;
    border: 1px solid #f20e33;
}
.message-code input.code-number{
    height: 26px;
    border: 1px solid #ccc;
    margin-right: 8px;
    text-indent: 10px;
    width: 60% !important;
    margin-right: 5%;
    box-sizing: border-box;
}
.get-code {
    width: 35%;
    background: #46b036;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 6px;
}
#signin-btn{ margin-top: 90px!important;}

.get-code[changePwd]{
    background-color: green;
    text-align: center;
    color: #eee;
    padding: 4px 10px;
    cursor: pointer;
    border-radius: 6px;
    width: 100px;
    margin-left: 30px;
    margin-bottom: 20px;
}
.login-btn{
    height: 30px;
    background: #ea0f2d;
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

</style>
