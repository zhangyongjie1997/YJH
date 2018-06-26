<template>
  <div>
    <div class="tabs">
      <el-tabs tab-position="left"
               type="border-card"
               style="height: 700px;">
        <el-tab-pane label="我的信息">
          <!-- <div class="item-list"> -->
          <el-col :span="8"
                  class="item-list">
            <h3 class="list-title">个人信息</h3>
            <el-card shadow="never"
                     class="item-lists">
              <el-upload class='avatar-uploader'
                         action='http://www.ftusix.com/static/data/upload.php'
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload"
                         :data="{id: userMsg.user_id}">
                <img :src="photo"> 更换头像
              </el-upload>
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
              <el-radio v-model="userMsg.sex"
                        label="1">男</el-radio>
              <el-radio v-model="userMsg.sex"
                        label="0">女</el-radio>
            </el-card>
            <el-button @click="update"
                       type="danger"
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
                        v-model="newPwd"
                        type="password">
                <template slot="prepend">新密码</template>
              </el-input>
            </el-card>
            <el-card shadow="never"
                     class="item-lists">
              <el-input class="item-input"
                        placeholder="请输入内容"
                        v-model="newPwd2"
                        type="password">
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
                       plain
                       @click="reset">确认修改</el-button>
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
          <div class="aList"
               v-loading="loading1">
            <ul>
              <li v-for="(article,index) in articles"
                  :key="index">
                <div class="item-title">
                  <router-link class="title"
                               tag="span"
                               :to="{name:'content',params:{aid:article.topic_id}}"
                               style="cursor:pointer">{{article.title}}</router-link>
                  <ul>
                    <li>{{article.type | getType}}</li>
                    <li>{{article.comment_num}}</li>
                    <li>{{article.browser_num}}</li>
                    <li class="time">{{article.modify_time | getTime}}</li>
                    <li>
                      <router-link tag="i"
                                   :to="{name:'write',params:{aid:article.topic_id}}"
                                   style="cursor:pointer;color:#f56c6c;"
                                   class="iconfont icon-web-icon-"></router-link>
                      <span style="color:#409EFF;"> | </span>
                      <i @click="remove(article.topic_id)"
                         style="cursor:pointer;color:#f56c6c;"
                         class="iconfont icon-shanchu"></i>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="pagination">
              <el-pagination @current-change="goNote"
                             layout="prev, pager, next"
                             :total="noteNo">
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
          <div class="aList"
               v-loading="loading2">
            <ul>
              <li v-for="(myCol,index) in myCols"
                  :key="index">
                <div class="item-title">
                  <router-link class="title"
                               tag="span"
                               :to="{name:'content',params:{aid:myCol.topic_id}}"
                               style="cursor:pointer">{{myCol.title}}</router-link>
                  <ul>
                    <li>{{myCol.type | getType}}</li>
                    <li>{{myCol.comment_num}}</li>
                    <li>{{myCol.browser_num}}</li>
                    <li class="time">{{myCol.modify_time | getTime}}</li>
                    <li>
                      <el-button size="mini"
                                 type="danger"
                                 plain
                                 @click="unColl(myCol.topic_id)">取消收藏</el-button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="pagination">
              <el-pagination @current-change="goCol"
                             layout="prev, pager, next"
                             :total="collNo">
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
import {getArticles,getLocal,Register, Reset,Update,getCol,getMyNote,removeNote,zan_coll,getUser} from '../api/index.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      newPwd:'',newPwd2:'',sms_code:'',count:60,   //重置密码数据
      userMsg:{
        avatar:"DC8B19B5BD6447A56146B8BB09E85BCC.jpg",
        mobile:"18522787303",
        nick_name:"默认",
        pwd:'123456',
        reg_time:'1529680338',
        sex:'1',
        token:"7FAB725452069D22ED94724B8A8C8B56",
        user_id:"186"
      },
      articles:[],  //我的帖子
      myCols:[],  //我的收藏
      noteNo:0,  //我的帖子条数
      collNo:0,  //我的收藏数量
      loading1:true,  //加载中
      loading2:true,
      colPage:1,   //我的收藏当前页
      notePage:1,  //我的帖子当前页
    }
  },
  filters:{
    getType(val){
      if(val == ''){
        return '暂无分类';
      }
      switch(val){   //根据文章对象的type属性返回对应分类
        case '0':
          return '0号分类';
        case '1':
          return '经验分享';
        case '2':
          return '入门学习';
        case '3':
          return '成果分享';
      }
    },
    getTime(val){          //传入事件戳返回本地时间
      return new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    }
  },
  mounted(){
    this.init();
  },
  computed:{
    photo(){    //计算出行来返回头像地址，还有过滤器方法
      return 'http://www.ftusix.com/static/data/upload/'+this.userMsg.avatar;
    },
    ifLogin(){  //vuex中登录状态
      return this.$store.state.ifLogin;
    },
  },
  methods:{
    beforeAvatarUpload(file){   //判断头像图片的大小
      if(file.size>999999){
        this.$message.error('图片体积太大请重新选择');
        return false;
      }else{
        return true;
      }
    },
    handleAvatarSuccess(res){      //头像上传成功的事件
      if(res.status == 1){
        this.$message.success('头像上传成功');
        this.userMsg.avatar = res.data;
        localStorage.loginMsg = JSON.stringify(this.userMsg);
      }else{
        this.$message.error('上传失败');
      }
    },
    async unColl(topic_id){            //取消收藏
      let res = await zan_coll({
        user_id:this.userMsg.user_id,
        topic_id,
        type:'coll'
      });
      if(res.data.status == 1){
        this.$message.success(res.data.info);
        this.getCols();
      }else{
        this.$message.error('失败');
      }
    },
    async remove(topic_id){       //删除我的帖子
      let res = await removeNote({
        user_id:this.userMsg.user_id,
        topic_id
      });
      if(res.data.status == 1){
        this.$message.success(res.data.info);
        this.getMyNotes();
      }else{
        this.$message.error('失败');
      }
    },
    async update(){        //更新个人信息
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
        localStorage.loginMsg = JSON.stringify(this.userMsg);
      }else{
        this.$message.error('修改失败');
      }
    },
    async reset(){      //重置密码
      try{
      let res = await Reset({
        mobile:this.userMsg.mobile,
        pwd:this.newPwd,
        pwd2:this.newPwd2,
        sms_code:this.sms_code
      });
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
    init(){    //初始化各种信息
      if(localStorage.loginMsg){
        this.$store.commit('loginMutation',true);
        this.userMsg = getUser();
      }
      this.getMyNotes();
      this.getCols();
    },
    async getMyNotes(){  //获取我的帖子
      let res = await getMyNote({
        user_id:this.userMsg.user_id,
        page:this.notePage
      });
      this.articles = res.data.data;
      this.noteNo = parseInt(res.data.commentList[0]);
      this.loading1 = false;
    },
    async getCols(){      //获取我的收藏
      let res = await getCol(this.userMsg.user_id,this.colPage);
      this.myCols = res.data.data;
      this.collNo = parseInt(res.data.commentList[0]);
      this.loading2 = false;
    },
    getCode(e){     //获取短息验证码
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
    },
    goCol(val){    //我的收藏分页按钮
      this.colPage = val;
      this.getCols();
    },
    goNote(val){     //我的帖子分页按钮
      this.notePage = val;
      this.getMyNotes();
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
  border-bottom: 1px solid #ccc;
  clear: both;
  .title {
    display: inline-block;
    width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  ul {
    //display: inline-block;
    float: right;
    width: 70%;
    clear: both;

    li {
      float: left;
      width: 140px;
      text-align: center;
    }
  }
}
.pagination {
  padding-top: 40px;
  width: 40%;
  margin: 0 auto;
}
.time {
  color: #999;
  font-size: 14px;
}
</style>
