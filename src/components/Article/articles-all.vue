<template>
  <div>
    <div class="items" v-loading="loading">
      <ul>
        <li class="a-list" v-for="(article, index) in articles" :key="index">
          <div class="a-info"><span>{{article.nick_name}}</span> · <span>{{article.modify_time | getTime}}</span></div>
          <div class="a-main">
            <router-link class="title" tag="a" :to="{name:'content',params:{aid:article.topic_id}}">{{article.title}}</router-link>
            <div class="handl-info">
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
import {getArticles} from '../../api/index.js';
import mixin from '../../mixins/filters-mixin.js'; 
export default {
  mixins:[mixin],
  props:{
    sort:String,
  },
  data() {
    return {
      articles:[],
      page:1,
      no:0,
      kind:0,
      loading:true,
    }
  },
  mounted(){
    this.getArticles();
  },
  methods:{
    getPage(val){   //点击分页按钮切换页面，参数为点击的页数
      this.page = val;
      this.getArticles();
    },
    async getArticles(){
      this.loading = true;
      let res = await getArticles(this.kind,this.sort,this.page,false);
      this.no = parseInt(res.data.listCount[0])/2;
      this.articles = res.data.data;
      this.loading = false;
    }
  },
  watch:{
    sort(){
      this.getArticles();
    },
    $route(){  //监听路由信息
      this.kind = this.$route.params.kind;
      this.getArticles();
    }
  }
}
</script>

<style scoped lang="less">
.items{
  width: 100%;
  .pagination{
    margin-bottom: 50px;
  }
  .a-list{
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  .a-info{
    height: 25%;
    font-size: 12px;
    color: #999;
  }
  .a-main{
    height: 45px;
     line-height: 45px;
     font-size: 17px;
     overflow: hidden;
     .title{
       display: inline-block;
       width: 250px;
       text-overflow:ellipsis;
       white-space:nowrap;
       overflow: hidden;
     }
     .handl-info{
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