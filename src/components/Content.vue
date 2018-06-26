<template>
  <div class="container">
    <goTop></goTop>
    <goLogin @odialogvisiblechange="dialogVisibleChange" :odialogVisible="dialogVisible" @onsuccess="loginSuccess"></goLogin>
    <div class="back" @click="back">返回</div>
    <div class="main" v-loading="loading">
      <h2>{{article.title}}</h2>
      <div class="info">
        <div style="height:25px;"></div>
        <div>作者：{{article.nick_name}}</div>
        <div style="height:5px;"></div>
        <div>{{article.type | getType}}</div>
        <div style="height:5px;"></div>
        <div>{{article.modify_time | getTime}} · 评论{{article.comment_num}} · 点赞{{article.like_num}}</div>
        <div></div>
      </div>
      <div class="content">
        <p style="text-indent:2em;" v-html="article.content"></p>
      </div>
    </div>
    <div class="handle-div">
      <div class="handle">
        <div @click="like('zan')" class="handle-item">
          <i  class="iconfont" :class="{'icon-dianzan1':!iszan,'icon-dianzan':iszan}"></i>点赞
        </div>
        <div @click="like('coll')" class="handle-item">
          <i class="iconfont" :class="{'icon-shoucang':!iscoll,'icon-shoucangxing2':iscoll}"><span>收藏</span></i>
        </div>
      </div>
      <div class="share">
        <el-popover
          placement="top-start"
          title="扫描二维码分享"
          width="200"
          trigger="hover">
          <img src="../assets/logo.png">
          <el-button slot="reference">分享 <i class="iconfont icon-weixin"></i></el-button>
        </el-popover>
      </div>
    </div>
    <div class="talk">
      <div class="talk-content">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="法制社会，文明发言"
          v-model="comment">
        </el-input>
      </div>
      <div class="talk-btn"><el-button @click="sendCom" type="primary" plain :disabled="btnDisabled">{{btnMsg}}</el-button></div>
    </div>
    <div class="commentList">
      <div class="commentNo">
        共 {{comments.length}} 条评论
      </div>
      <li v-for="(comment,index) in comments" :key="index" class="commentItem">
        <table class="table" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tbody>
            <tr>
              <td valign="top" align="center" width="50px">
                <img :src="comment.avatar | getAvatar" width="50px">
              </td>
              <td valign="top" width="10px"></td>
              <td width="auto" align="left" valign="center">
                <tr width="auto">
                  <span class="author">{{comment.nick_name}}：</span>
                  <span class="time">{{comment.date | getTime}}</span>
                </tr>
                <tr height="5px"></tr>
                <tr width="70%">
                  <span class="content">{{comment.comment}}</span>
                </tr>
              </td>
              <td width="50px" align="left" valign="center">
                <span style="cursor:pointer;color:#f56c6c;">回复</span>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getOne,getLocal,zan_coll,sendComment,getComment,getUser} from '../api/index.js';
import goTop from '../base/goTop.vue';
import goLogin from '../base/goLogin.vue';
export default {
  data() {
    return {
      article:{},
      comment:'',
      btnDisabled:true,
      btnMsg:'评论不能为空',
      userMsg:{},
      iszan:false,
      iscoll:false,
      loading:true,
      comments:[],
      dialogVisible:false
    }
  },
  filters:{
    getType(val){
      if(val == ''){
        return '暂无分类';
      }
      switch(val){       //根据文章对象的type属性返回对应分类
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
    getTime(val){        //传入事件戳返回本地时间
      return new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    },
    getContent(val){
      if(val){
        return val.slice(3,(val.length)-4);
      }
    },
    getAvatar(val){     //返回完整的头像地址
      return 'http://www.ftusix.com/static/data/upload/'+val;
    }
  },
  created(){
    if(localStorage.loginMsg){
      this.$store.commit('loginMutation',true);
      this.userMsg = getUser();
    }
    this.getArticle(this.$route.params.aid);
    
    //判断当前文章是否收藏和点赞。。。
  },
  computed:{
    ifLogin(){
      return this.$store.state.ifLogin;
    }
  },
  watch:{
    comment( newVal, oldVal ){     //监听评论内容
      if(newVal == ''){
        this.btnDisabled = true;
        return this.btnMsg = '评论不能为空';
      }else if(newVal.length < 10){
        this.btnDisabled = true;
        return this.btnMsg = "内容太少,再写点儿";
      }else{
        this.btnDisabled = false;
        return this.btnMsg = "发表评论";
      }
    }
  },
  methods:{
    loginSuccess(){
      this.userMsg = getUser();
    },
    dialogVisibleChange(val){
      this.dialogVisible = val;
    },
    async getComments(){     //获取评论列表
      let res = await getComment(this.article.topic_id);
      this.comments = res.data.data;
    },
    async sendCom(){      //发送评论
      if(this.ifLogin == false){
        return this.dialogVisible = true;
      }
      let res = await sendComment({
        user_id:this.userMsg.user_id,
        topic_id:this.article.topic_id,
        comment:this.comment
      });
      if(res.data.status == 1){
        this.$message.success(res.data.info);
        this.comment = '';
        this.getComments();
      }
    },
    back(){    //返回按钮
      this.$router.go(-1);
    },
    async like(type){   //点赞
      if(this.ifLogin == false){
        return this.dialogVisible = true;
      }
      let res = await zan_coll({
        user_id:this.userMsg.user_id,
        topic_id:this.article.topic_id,
        type
      });
      if(res.data.status == 1&&type == 'zan'){
        this.iszan = !this.iszan;
        if(this.iszan){
          this.$message.success(res.data.info);
          return;
        }else{
          this.$message.success(res.data.info);
          return;
        }
      }
      if(res.data.status == 1&&type == 'coll'){
        this.iscoll = !this.iscoll;
        if(this.iscoll){
          this.$message.success(res.data.info);
          return;
        }else{
          this.$message.success(res.data.info);
          return;
        }
      }
    },
    async getArticle(topic_id){    //获取文章详情
      let res = await getOne(this.userMsg.user_id,topic_id);
      this.article = res.data.data;
      this.iszan = res.data.iszan;
      this.iscoll = res.data.iscoll;
      this.loading = false;
      this.getComments();
    }
  },
  components:{goTop,goLogin}
}
</script>
<style scoped lang="less">
.container{
  width: 70%;
  margin:100px auto 0 auto;
  height: 1000px;
  .back{
    width: 50px;
    height: 50px;
    position: fixed;
    top: 130  px;
    right: 120px;
    cursor: pointer;
    text-align: center;
    line-height: 50px;
    color: #409EFF;
    transition: all 0.4 linear;
  }
  .back:hover{
    box-shadow: 0 0 2px #409EFF;
    color: #f56c6c;
  }
  .main{
    width: 100%;
    h2{
      text-align: center;
      padding: 10px;
    }
    .info{
      text-align: center;
      color: #999;
      font-size: 13px;
      font-weight: lighter;
    }
    .content{
      width: 100%;
      margin: 50px auto 20px auto;
      padding: 15px 0px 15px 5px;
      font-size: 16px;
      line-height: 1.5;
      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
  .talk{
    clear: both;
    .talk-btn{
      margin-top: 20px;
      float: right;
    }
  
  }
  .commentList{
    margin-top: 80px;
    width: 100%;
    background-color: whitesmoke;
    .commentNo{
      padding: 5px;
      text-align: center;
      font-size: 18px;
      width: 100%;
      color: #999;
    }
    .commentItem{
      border-bottom: 1px solid rgba(95, 96, 99, 0.5);
      padding: 10px;
      .table{
        .author{
          font-size: 17px;
          font-weight: bold;
          color: #777;
        }
        .time{
          font-size: 10px;
          color: #999;
        }
        .content{
          font-size: 16px;
        }
      }
    }
  }
  .handle-div{
    width: 100%;
    height: 100px;
    position: relative;
    .share{
      position: absolute;
      right: 40px;
      top: 10px;
      color: #409EFF;
      font-size: 14px;
      width: 50px;
    }
    .handle{
      width: 180px;
      height: 50px;
      border-radius: 20px;
      display: flex;
      justify-content: space-around;
      border: 1px solid #409EFF;
      .handle-item{
        width: 40%;
        line-height: 40px;
        cursor: pointer;
        color: #409EFF;
        i{
          font-size: 30px;
          span{
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>
