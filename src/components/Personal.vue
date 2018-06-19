<template>
  <div>
    <div class="tabs">
      <el-tabs :tab-position="tabPosition"
               type="border-card"
               style="height: 600px;">
        <el-tab-pane label="我的信息">
          <!-- <div class="item-list"> -->
          <el-col :span="8"
                  class="item-list">
            <h3 class="list-title">个人信息</h3>
            <el-card shadow="never"
                     class="item-lists">
              <img :src="userMsg.avatar">
              <label class="pointer"
                     for="changePho">更换头像</label>
              <input type="file"
                     id="changePho"
                     style="display:none;">
            </el-card>
            <el-card shadow="never"
                     class="item-lists">
              注册手机号：
              <span>{{userMsg.mobile}}</span>
            </el-card>
            <el-card shadow="never"
                     class="item-lists">
              <el-input placeholder="请输入内容"
                        v-model="userMsg.nick_name">
                <template slot="prepend">昵称</template>
              </el-input>
            </el-card>
            <el-card shadow="never">
              性别：
              <el-radio v-model="userMsg.sex" label="1">男</el-radio>
              <el-radio v-model="userMsg.sex" label="0">女</el-radio>
            </el-card>
            <el-button @click="update" type="danger"
                       plain>提交</el-button>
          </el-col>
          <!-- </div> -->
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <el-col :span="8"
                  class="item-list">
            <h3 class="list-title">修改密码</h3>
            <el-card shadow="never"
                     class="item-lists">
              注册手机号：
              <span>{{userMsg.mobile}}</span>
            </el-card>
            <el-card shadow="never"
                     class="item-lists">
              <el-input class="item-input"
                        placeholder="请输入内容"
                        v-model="newPwd" type="password">
                <template slot="prepend">新密码</template>
              </el-input>
            </el-card>
            <el-card shadow="never"
                     class="item-lists">
              <el-input class="item-input"
                        placeholder="请输入内容"
                        v-model="newPwd2" type="password">
                <template slot="prepend">确认密码</template>
              </el-input>
            </el-card>
            <el-card shadow="never"
                     class="item-lists">
              <el-col :span="8">
                <el-input class="item-input"
                          placeholder="请输入内容"
                          v-model="sms_code">
                  <el-button slot="append"
                             @click="getCode">获取验证码</el-button>
                </el-input>
              </el-col>
            </el-card>
            <el-button type="danger"
                       plain @click="reset">确认修改</el-button>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="我的贴子">
          <div class="item-title">
            <span>主题</span>
            <ul>
              <li>分类</li>
              <li>回复</li>
              <li>浏览</li>
              <li>发布时间</li>
              <li>操作</li>
            </ul>
          </div>
          <div class="aList">
            <ul>
              <li v-for="(article,index) in articles"
                  :key="index">
                <div class="item-title">
                  <router-link tag="span" :to="{name:'content',params:{aid:article.id}}" style="cursor:pointer">{{article.name}}</router-link>
                  <ul>
                    <li>{{article.kind}}</li>
                    <li>{{article.response}}</li>
                    <li>{{article.articleId}}</li>
                    <li>{{article.time}}</li>
                    <li>
                      <router-link tag="i" :to="{name:'write',params:{aid:article.id}}" style="cursor:pointer;"
                         class="iconfont icon-web-icon-"></router-link>
                         <span style="color:#409EFF;"> | </span>
                      <i style="cursor:pointer;"
                         class="iconfont icon-shanchu"></i>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="pagination">
              <el-pagination layout="prev, pager, next"
                             :total="20">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的收藏">
          <div class="item-title">
            <span>主题</span>
            <ul>
              <li>分类</li>
              <li>回复</li>
              <li>浏览</li>
              <li>发布时间</li>
              <li>操作</li>
            </ul>
          </div>
          <div class="aList">
            <ul>
              <li v-for="(article,index) in articles"
                  :key="index">
                <div class="item-title">
                  <router-link tag="span" :to="{name:'content',params:{aid:article.id}}" style="cursor:pointer">{{article.name}}</router-link>
                  <ul>
                    <li>{{article.kind}}</li>
                    <li>{{article.response}}</li>
                    <li>{{article.articleId}}</li>
                    <li>{{article.time}}</li>
                    <li>
                      <i style="cursor:pointer;"
                         class="iconfont icon-web-icon-"></i>
                         <span style="color:#409EFF;"> | </span>
                      <i style="cursor:pointer;"
                         class="iconfont icon-shanchu"></i>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="pagination">
              <el-pagination layout="prev, pager, next"
                             :total="20">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的消息">我的消息</el-tab-pane>
        <el-tab-pane label="我的任务">我的任务</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getArticles,getLocal,Register, Reset,Update,getCol} from '../api/index.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      tabPosition: 'left',
      newPwd:'',newPwd2:'',sms_code:'',count:60,
      userMsg:{
        avatar:"http://yjh.li-shang-bin.com/avatar/default/8.png",
        mobile:"13011072992",
        nick_name:"测试",
        sex:0,
        token:"5c62dcb16e33b0f16c075627cbcc15dd",
        user_id:"user8"
      },
      articles:[],
      myCol:{}
    }
  },
  mounted(){
    this.init();
    this.getData();
    //this.getCols();
  },
  computed:{
    ifLogin(){
      return this.$store.state.ifLogin;
    },
    tel(){
      return localStorage.userTel;
    }
  },
  methods:{
    async update(){
      let res = await Update({
        sex:this.userMsg.sex,
        nick_name:this.userMsg.nick_name,
        token:this.userMsg.token
      });
      if(res.data.status == 1){
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
      }else{
        this.$message.error('修改失败');
      }
    },
    async reset(){
      try{
      let res = await Reset({
        mobile:this.tel,
        pwd:this.newPwd,
        pwd2:this.pwd2,
        sms_code:this.sms_code
      });
      console.log(res.data);
      if(res.data.status == 0){
        this.$message({
          showClose: true,
          message: res.data.info,
          type: 'success'
        });
      }else{
        this.$message({
          showClose: true,
          message: res.data.info,
          type: 'success'
        });
      }
      }catch(e){
        console.log(e);
        this.$message({
          showClose: true,
          message: '修改失败',
          type: 'success'
        });
      }
    },
    async init(){
      if(localStorage.loginMsg != ''){this.$store.commit('loginMutation',true);}
      this.userMsg = JSON.parse(localStorage.loginMsg);
    },
    async getData(){
      let res = await getLocal();
      this.articles = res.data;
    },
    async getCols(page=1){
      let res = await getCol({
        page,
        user_id:this.userMsg.user_id,
        token:"5c62dcb16e33b0f16c075627cbcc15dd"
      });
      console.log(res.data);
      
    },
    getCode(e){
      let dis = false;
      if(!dis){
        dis = false;
        let count = 60;
        e.target.setAttribute("disabled", true);
        let time = setInterval(function(){
        count--;
        e.target.innerHTML = count + 's';
        if(count < 1){
          e.target.innerHTML = '获取验证码';
          count = 60;
          dis = true;
          clearInterval(time);
        }
      },1000);
      }
    }
  }
}
</script>

<style scoped lang="less">
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ccc;
}
.tabs {
  margin: 0 auto;
  margin-top: 100px;
  width: 75%;
}
.item-list {
  width: 100%;
}
.list-title {
  border-bottom: 1px solid #000;
}
.item-lists {
  vertical-align: middle;
  margin-bottom: 10px;
}
.item-input {
  margin-bottom: 10px;
}
.item-title {
  line-height: 50px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #000;
  clear: both;
  ul {
    display: inline-block;
    float: right;
    width: 70%;
    clear: both;
    li {
      float: left;
      margin-left: 90px;
    }
  }
}
.pagination{
  padding-top: 40px;
  width: 40%;
  margin:0 auto;
}
</style>
