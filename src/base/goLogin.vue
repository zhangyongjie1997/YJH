<template>
  <div class="dialog">
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <div class="content">
        <h1>登录
          <small>没有账号？
            <router-link tag="a"
                         to="/register">注册</router-link>
          </small>
        </h1>
        <el-form ref="Form" :model="Form" class="form" :rules="rules" label-width="100px">
          <el-form-item class="row" label="用户名" prop="mobile">
            <el-input v-model="Form.mobile"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item class="row" label="密码" prop="pwd">
            <el-input type="password" v-model="Form.pwd"
                      placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="btnDisabled"
                   @click="login">登 录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {Login} from '../api/index.js';
export default {
  props:{
    odialogVisible:Boolean
  },
  data() {
    return {
      Form:{
        mobile:'',
        pwd:'',
      },
      
      dialogVisible:false,
      btnDisabled:true,
      rules:{
        mobile:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 11, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        pwd:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最少是6位', trigger: 'blur' },
        ],
      }
    }
  },
  watch:{
    odialogVisible(val){
      this.dialogVisible = val;
    },
    dialogVisible(){
      this.$emit('odialogvisiblechange',this.dialogVisible);
    },
    Form:{
      handler(){
        if(this.Form.mobile.length>=11&&this.Form.pwd.length>=6){
          this.btnDisabled = false;
        }else{
          this.btnDisabled = true;
        }
      },
      deep:true
    },
    'Form.pwd'(){}
  },
  mounted() {
    window.addEventListener('keyup',this.keyLogin);
  },
  methods:{
    keyLogin(){
      if (event.keyCode == 13)this.login();
    },
    async login(){
      let res = await Login(this.Form.mobile,this.Form.pwd);
      if(res.data.status == 1){
        this.$store.commit('loginMutation',true);
        localStorage.setItem("loginMsg",JSON.stringify(res.data.data[0]));  //在本地保存用户信息
        this.$message({
          showClose: true,
            message: res.data.info,
            type: 'success'
        });
        this.dialogVisible = false;
        this.$emit('onsuccess');
      }else{
        this.$message.error('登录失败'+res.data.info);
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  }
}
</script>

<style scoped lang='less'>
.dialog {
  .content {
    h1 {
      margin-top: 0;
      small {
        font-size: 20px;
        font-weight: 300;
        a {
          color: #409eff;
        }
      }
    }
    .form {
      margin-top: 20px;
      text-align: left;
      font-size: 18px;
      .row {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
