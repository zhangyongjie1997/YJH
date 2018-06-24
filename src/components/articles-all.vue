<template>
  <div>
    <div class="items">
      <ul>
        <li class="aList" v-for="(article, index) in articles" :key="index">
          <div class="aInfo"><span>{{article.nick_name}}</span> · <span>{{article.modify_time | getTime}}</span></div>
          <div class="aMain">
            <router-link class="title" tag="a" :to="{name:'content',params:{aid:article.topic_id}}">{{article.title}}</router-link>
            <div class="handlInfo">
              <el-badge :value="article.browser_num" :max="99" class="item">
                  <el-button size="small">浏览</el-button>
                </el-badge>
                <el-badge :value="article.like_num" :max="99" class="item">
                  <el-button size="small">点赞</el-button>
                </el-badge>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination @current-change="getPage" layout="prev, pager, next"
                       :total="no">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getArticles} from '../api/index.js';
export default {
  props:{
    sort:String,
    userMsg:Object
  },
  data() {
    return {
      articles:[],
      page:1,
      no:0,
    }
  },
  filters:{
    getTime(val){
      return new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    }
  },
  mounted(){
    this.getArticles();
  },
  methods:{
    getPage(val){
      this.page = val;
      this.getArticles();
    },
    async getArticles(){
      let res = await getArticles(0,this.sort,this.page,false);
      this.no = parseInt(res.data.listCount[0])/2;
      this.articles = res.data.data;
    }
  },
  watch:{
    sort(){
      this.getArticles();
    }
  }
}
</script>

<style scoped lang="less">
.items{
  .pagination{
  padding-top: 20px;
  width: 40%;
  margin:0 auto 50px auto;
}
  width: 100%;
  .aList{
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  .aInfo{
    height: 25%;
    font-size: 12px;
    color: #999;
  }
  .aMain{
    height: 45px;
     line-height: 45px;
     font-size: 17px;
     clear: both;
     .title{
       display: inline-block;
       width: 250px;
       text-overflow:ellipsis;
       white-space:nowrap;
       overflow: hidden;
     }
     .handlInfo{
       //display: inline-block;
       margin-bottom: 5px;
       float: right;
       .item{
        margin-right: 40px;
       }
     }
  }
}
}
</style>
