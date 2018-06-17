<template>
  <div class="container">
    <goTop></goTop>
    <div class="main">
      <h2>{{article.name}}</h2>
      <div class="info">
        <div>{{article.kind}}</div>
        <div>{{article.time}} · 评论{{article.pl}} · 点赞{{article.z}}</div>
      </div>
      <div class="content">
        <p>{{article.content}}</p>
      </div>
    </div>
    <div class="handle-div">
      <div class="handle">
        <div @click="like" class="handle-item">
          <i  class="iconfont" :class="{'icon-dianzan1':!isLike,'icon-dianzan':isLike}"></i>点赞
        </div>
        <div @click="collect" class="handle-item">
          <i class="iconfont" :class="{'icon-shoucang':!isCollect,'icon-shoucangxing2':isCollect}"><span>收藏</span></i>
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
          v-model="talk">
        </el-input>
      </div>
      <div class="talk-btn"><el-button type="primary" plain :disabled="btnDisabled">{{btnMsg}}</el-button></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getOne,getLocal} from '../api/index.js';
import goTop from '../base/goTop.vue';
export default {
  data() {
    return {
      //toTop:false,
      article:{},
      isLike:false,
      isCollect:false,
      talk:'',
      btnDisabled:true,
      btnMsg:'评论不能为空'
    }
  },
  created(){
    this.getArticle();
    //判断当前文章是否收藏和点赞。。。
  },
  computed:{
    id(){return this.$route.params.aid;}
  },
  watch:{
    talk( newVal, oldVal ){
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
    like(){
      this.isLike = !this.isLike;
      //提交点赞请求  成功后。。
      if(this.isLike){
        this.$message({
          showClose: true,
          message: '点赞成功',
          type: 'success'
        });
      }else{
        this.$message({
          showClose: true,
          message: '取消点赞',
          type: 'success'
        });
      }
    },
    collect(){
      this.isCollect = !this.isCollect;
      //执行收藏逻辑。。。
      //提交点赞请求  成功后。。
      if(this.isCollect){
        this.$message({
          showClose: true,
          message: '收藏成功',
          type: 'success'
        });
      }else{
        this.$message({
          showClose: true,
          message: '取消收藏',
          type: 'success'
        });
      }
    },
    async getArticle(){
      let res = await getLocal();
      this.article = res.data.filter(item=>item.id==this.id)[0];
    }
  },
  components:{goTop}
}
</script>
<style scoped lang="less">
.container{
  width: 70%;
  margin:100px auto 0 auto;
  height: 1000px;
  .main{
    width: 100%;
    h2{
      text-align: center;
      padding: 10px;
    }
    .info{
      text-align: center;
      color: #999;
      font-size: 15px;
      font-weight: lighter;
    }
    .content{
      width: 100%;
      margin: 50px auto 20px auto;
      padding: 15px 5px 15px 5px;
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
