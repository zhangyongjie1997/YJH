<template>
  <div id="container" class="container">
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
        共 {{commentList.length}} 条评论
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
                <span @click="showRes($event,index)" class="resBtn">回复</span>
              </td>
            </tr>
            <tr width="100%">
              <td colspan="4">
                <div :ref="index" class="resCom">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    :placeholder="'回复 '+comment.nick_name+':'"
                    v-model="resCom">
                  </el-input>
                  <el-button class="resBtn" size="mini" type="primary" plain >回复</el-button>
                  <el-button @click="hideRes($event,index)" class="resBtn" size="mini" type="danger" plain >取消</el-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
      <div class="moreComment">
        <el-button ref='moreCom' @click="getMoreComments" type="primary" plain :disabled="!moreComment">更多评论</el-button>
      </div>
    </div>
    <div class="footer">
      © 2017北京工良科技有限公司 - 浙ICP备17014257号-1
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getOne,getLocal,zan_coll,sendComment,getComment,getUser} from '../api/index.js';
import goTop from '../base/goTop.vue';
import goLogin from '../base/goLogin.vue';
import mixin from '../mixins/filters-mixin.js'; 
export default {
  mixins:[mixin],
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
      commentList:[],
      dialogVisible:false,
      moreComment:true,
      resCom:'',
      resIndex:0
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
    getContent(val){
      if(val){
        try{
          return val.slice(3,(val.length)-4);
        }catch(e){
          console.log(e);
          this.getArtcle();
        }
      }
    },
    getAvatar(val){     //返回完整的头像地址
      return 'http://www.ftusix.com/static/data/upload/'+val;
    }
  },
  created(){
    this.getArticle(this.$route.params.aid);
    //判断当前文章是否收藏和点赞。。。
  },
  mounted(){
    let windowClick = () => {
      this.$refs[this.resIndex][0].style.display = 'none';
    }
    window.addEventListener('click',windowClick,true);
    windowClick = null;
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('click',windowClick);
    next();
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
    },
    // $route(){      //当路由缓存冲突的时候监听，文章id变化的时候重新加载
    //   this.getArticle(this.$route.params.aid);
    // }
  },
  methods:{
    hideRes(e,index){  //隐藏回复框
      this.$refs[index][0].style.display = 'none';
    },
    showRes(e,index){   //点击某个回复按钮，关闭其他回复框，显示当前回复框
    this.resIndex = index;
      for(let item in this.$refs){
        if(this.$refs[item][0]){
          this.$refs[item][0].style.display = 'none';
        }
      }
      this.$refs[index][0].style.display = 'block';
    },
    getMoreComments(){   //获取更多评论按钮
      let count = this.comments.length;
      this.comments = this.commentList.slice(0,count+10);
      if(count>=this.commentList.length){
        this.moreComment = false;
        this.$refs.moreCom.$el.innerText = '没有更多评论';
      }
    },
    loginSuccess(){  //弹窗登陆成功
      this.userMsg = getUser();
      this.getArticle(this.$route.params.aid);
    },
    dialogVisibleChange(val){   //弹窗显示隐藏
      this.dialogVisible = val;
    },
    async getComments(){     //获取评论列表
      let res = await getComment(this.article.topic_id);
      this.commentList = res.data.data;
      this.getMoreComments();
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
        this.getComments();
        this.comment = '';
      }
    },
    back(){    //返回按钮
      this.$router.go(-1);
    },
    async like(type){   //点赞和收藏
      if(this.ifLogin == false){
        return this.dialogVisible = true;
      }
      let res = await zan_coll({
        user_id:this.userMsg.user_id,
        topic_id:this.article.topic_id,
        type
      });
      if(res.data.status == 1){
        if(type == 'zan'){
          this.iszan = !this.iszan;
          this.$message.success(res.data.info);
          return;
        }else{
          this.iscoll = !this.iscoll;
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
      font-weight: 500;
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
      letter-spacing: 1px;
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
  .footer{
      position: relative;
      padding: 50px 0px;
      bottom: 0;
      font-size: 12px;
      text-align: center;
    }
  .commentList{
    margin-top: 80px;
    width: 100%;
    background-color:#fff;
    .commentNo{
      padding: 5px;
      text-align: center;
      font-size: 18px;
      width: 100%;
      color: #999;
    }
    .moreComment{
      padding: 10px;
      margin-bottom: 10px;
      text-align: center;
    }
    .commentItem{
      border-bottom: 1px solid rgba(95, 96, 99, 0.2);
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
        .resBtn{
          cursor: pointer;
          font-size: 13px;
          color: #f56c6c;
        }
        .resCom{
          display: none;
          box-sizing: border-box;
          padding: 10px;
          height: 100px;
          width: 100%;
          clear: both;
          .resBtn{
            margin: 10px 10px 0 0;
            float: right;
          }
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
