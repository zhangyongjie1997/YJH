<template>
  <div>
    <section id="signInPage">
        <div id="content">
            <h2 class="login-title">欢迎加入猿计划</h2>
            <div class="icon-coniainer">
                <input class="signIn-input" type="text" v-model="rName"  placeholder="请输入手机号" required />
                <div class="span">
                    <i class="iconfont" :class="{red:!nameOk,green:nameOk,'icon-duigou1':nameOk,'icon-cha2':!nameOk}"></i>
                </div>
            </div>
            <div class="icon-coniainer">
                <input class="signIn-input" v-model="rPwd" type="password" placeholder="请输入6位以上密码" required />
                <div class="span"><i class="iconfont" :class="{red:!pwdOk,green:pwdOk,'icon-duigou1':pwdOk,'icon-cha2':!pwdOk}"></i></div>
            </div>
            <div class="icon-coniainer">
                <input class="signIn-input" v-model="rPwd2" type="password" placeholder="请输确认密码" required />
                <div class="span-lang red" v-if="!pwd2Ok">两次输入的密码不一致</div>
            </div>
            <div class="message-code">
                <input type="text" v-model="code" class="code-number fl" placeholder="请输入短信验证码" required/>
                <span class="get-code fl pointer" @click.stop.prevent="getCoder" >获取验证码</span>
            </div>
            <div id="signin-btn" @click="register" class="signin-btn pointer login-btn pointer">注册</div>
            <span>已有账号，</span>
            <router-link tag="a" to="/login" id="alredySignIn" style="color: #409EFF;">立即登录</router-link>
        </div>  
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import {Register,getCode} from '../api/index.js'
export default {
  data() {
    return {
      rName:'',
      rPwd:'',
      rPwd2:'',
      code:'',
      nameOk:false,
      pwdOk:false,
      pwd2Ok:true,
      rOk: false,
    }
  },
  components: {
  },
  watch:{          //监听表单内的数据，提示用户
      rName(newVal,oldVal){
          if(newVal.length>=11){
              this.nameOk = true;
          }else{
              this.nameOk = false;
          }
      },
      rPwd(newVal,oldVal){
          if(newVal.length>=6){
              this.pwdOk = true;
          }else{
              this.pwdOk = false;
          }
      },
      rPwd2(newVal,oldVal){
        if(newVal != this.rPwd){
          this.pwd2Ok = false;
        }else{
          this.pwd2Ok = true;
          this.rOk = true;
        }
      }
  },
  methods:{
    async register(){    //注册
      if(!this.rOk){
          this.$message.error('请输入正确的注册信息');
          return;
      }
      let res = await Register({
          mobile:this.rName,
          pwd:this.rPwd,
          sms_code:this.code
      });
      if(res.data.status == 0){
          this.$message.error(res.data.info);
      }else if(res.data.status == 1){
          this.$message.success('注册成功，请登录');
            this.$router.push('/login');
            return;
      }else{
          this.$message.error('注册失败');
      }
    },
    async getCoder(e){   //获取验证码
    console.log(e);
      if(!this.rOk){
          this.$message.error('请输入正确的注册信息');
          return;
      }
      let res = await getCode({mobile:this.rName});
      if(res.data.status == 0){
          this.$message.error(res.data.info);
      }
      if(res.data.status == 1){
          this.$message.success('发送成功');
          let dis = false;
          if(!dis){
            dis = false;
            let count = 60;
            e.target.style.pointerEvents = 'none';
            let time = setInterval(function(){
            count--;
            e.target.innerHTML = count + 's';
                console.log(count);
            if(count < 1){
                e.target.style.pointerEvents = 'auto';
                e.target.innerHTML = '获取验证码';
                count = 60;
                dis = true;
                clearInterval(time);
            }
          },1000);
          this.$once('hook:beforeDestroy',()=>{
              console.log(this);
              //clearInterval(time);
          });
        }
      }else{
        this.$message.error('获取失败');
      }
    }
  }
}
</script>

<style scoped>
.login-title{
    font-size: 16px;
    line-height: 36px;
    color: #000;
    text-align: center;
    font-weight: 400;
    display: block;
    border-bottom: 1px solid #000;
}
.red{color: red;}
.green{color: #46b036;}
.icon-coniainer{
    position: relative;
}
.span{
    width: 10px;
    height: 10px;
    position: absolute;
    right: -18px;
    top:28px;
}
.span-lang{
    height: 20px;
    position: absolute;
    right: 10px;
    top:28px;
    color: rgba(247, 10, 10, 0.8);
    font-size:13px;
    line-height: 20px;
}
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
    border: 1px solid #409EFF;
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
    background: #5bd149;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    margin-top: 20px;
    border-radius: 6px;
}
#signin-btn{ margin-top: 90px!important;}

.login-btn{
    height: 30px;
    background: #409EFF;
    margin-top: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    width: 189px;
    margin: 30px auto;
    border-radius: 14px;
}

</style>
