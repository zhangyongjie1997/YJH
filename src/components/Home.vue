<template>
  <div>
    <goTop></goTop>
    <div class="wrapper">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(image,index) in images"
                          :key="index">
          <img :src="image.src">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tabs">
      <el-tabs v-model="defaultList" v-loading="loading">
        <el-tab-pane label="热门文章" name="hot">
          <ul>
            <li class="aList" v-for="(hotArc, index) in hotInfo.data" :key="index">
              <div class="aInfo"><span>{{hotArc.nickname}}</span> · <span>{{hotArc.c_time | toDate}}</span></div>
              <div class="aMain">
                <router-link tag="a" :to="{name:'content',params:{aid:hotArc.topic_id}}">{{hotArc.title}}</router-link>
                <div class="handlInfo">
                  <el-badge :value="hotArc.browser_num" :max="99" class="item">
                      <el-button size="small">浏览</el-button>
                    </el-badge>
                    <el-badge :value="hotArc.like_num" :max="99" class="item">
                      <el-button size="small">点赞</el-button>
                    </el-badge>
                </div>
              </div>
            </li>
          </ul>
          <div class="pagination">
            <el-pagination layout="prev, pager, next"
                           :total="hotInfo.total">
            </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="html"
                     name="second" :lazy="true">
          <ul>
            <li class="aList" v-for="(htmlArc, index) in htmlInfo.data" :key="index">
              <div class="aInfo"><span>{{htmlArc.nickname}}</span> · <span>{{htmlArc.c_time | toDate}}</span></div>
              <div class="aMain">
                <router-link tag="a" :to="{name:'content',params:{aid:htmlArc.topic_id}}">{{htmlArc.title}}</router-link>
                <div class="handlInfo">
                  <el-badge :value="htmlArc.browser_num" :max="99" class="item">
                      <el-button size="small">浏览</el-button>
                    </el-badge>
                    <el-badge :value="htmlArc.like_num" :max="99" class="item">
                      <el-button size="small">点赞</el-button>
                    </el-badge>
                </div>
              </div>
            </li>
          </ul>
          <div class="pagination">
            <el-pagination layout="prev, pager, next"
                           :total="htmlInfo.total">
            </el-pagination>
          </div>         
        </el-tab-pane>
        <el-tab-pane label="css"
                     name="third" :lazy="true">
          <ul>
            <li class="aList" v-for="(cssArc, index) in cssArcs" :key="index">
              <div class="aInfo"><span>{{cssArc.kind}}</span> · <span>{{cssArc.time}}</span></div>
              <div class="aMain">
                <router-link tag="a" :to="{name:'content',params:{aid:cssArc.id}}">{{cssArc.name}}</router-link>
                <div class="handlInfo">
                  <el-badge :value="cssArc.pl" :max="99" class="item">
                      <el-button size="small">浏览</el-button>
                    </el-badge>
                    <el-badge :value="cssArc.z" :max="99" class="item">
                      <el-button size="small">点赞</el-button>
                    </el-badge>
                </div>
              </div>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import {getArticles,getLocal,getHot,getHtml} from '../api/index.js';
import goTop from '../base/goTop.vue';
export default {
  filters:{
    toDate(val){
      let day = new Date(val);
      return day.toString();
    }
  },
  data() {
    return {
      pl:12,
      z:44,
      defaultList:'hot',
      images:[
        {src:'http://img5.imgtn.bdimg.com/it/u=1019788852,475598635&fm=15&gp=0.jpg'},
        {src:'http://img2.imgtn.bdimg.com/it/u=939482776,1122195490&fm=15&gp=0.jpg'},
        {src:'http://img5.imgtn.bdimg.com/it/u=2293659155,452847972&fm=15&gp=0.jpg'},
        {src:'http://img5.imgtn.bdimg.com/it/u=3110792765,2347421806&fm=27&gp=0.jpg'},
        {src:'http://img4.imgtn.bdimg.com/it/u=2004259100,1736516264&fm=15&gp=0.jpg'},
      ],
      loading:true,
      htmlArcs:[],
      hotArcs:[],
      hotInfo:{},
      htmlInfo:{},
      cssArcs:[]
    }
  },
  created(){
    if(localStorage.loginMsg != ''){this.$store.commit('loginMutation',true);}
    this.getHots();
    this.getHtmls();
    this.getCss();
  },
  methods:{
    async getHots(){
      let res = await getHot();
      this.hotInfo = res.data.data;
    },
    async getHtmls(){
      let res = await getHtml();
      this.htmlInfo = res.data.data;
      this.loading = false;
    },
    async getCss(){
      let res = await getLocal();
      console.log(res.data);
      
      this.cssArcs = res.data;
    }
  },
  components:{goTop}
}
</script>

<style scoped lang="less">
.pagination{
  padding-top: 40px;
  width: 40%;
  margin:0 auto;
}
.wrapper {
  height: 300px;
  width: 70%;
  margin: 0 auto;
  margin-top: 100px;
  img {
    width: 1063px;
    height: 300px;
  }
}
.tabs {
  height: 1000px;
  width: 70%;
  margin: 0 auto;
  margin-top: 35px;
}
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
     .handlInfo{
       display: inline-block;
       margin-bottom: 5px;
       float: right;
       .item{
        margin-right: 40px;
       }
     }
  }
}
</style>
