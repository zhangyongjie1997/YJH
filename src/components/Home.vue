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
            <li class="aList" v-for="(hotArc, index) in hotArcs" :key="index">
              <div class="aInfo"><span>{{hotArc.nick_name}}</span> · <span>{{hotArc.modify_time | getTime}}</span></div>
              <div class="aMain">
                <router-link class="title" tag="a" :to="{name:'content',params:{aid:hotArc.topic_id}}">{{hotArc.title}}</router-link>
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
            <el-pagination @current-change="goHot" layout="prev, pager, next"
                           :total="hotNo">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="html"
                     name="second" :lazy="true">
          <ul>
            <li class="aList" v-for="(htmlArc, index) in htmlArcs" :key="index">
              <div class="aInfo"><span>{{htmlArc.nick_name}}</span> · <span>{{htmlArc.modify_time | getTime}}</span></div>
              <div class="aMain">
                <router-link class="title" tag="a" :to="{name:'content',params:{aid:htmlArc.topic_id}}">{{htmlArc.title}}</router-link>
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
            <el-pagination @current-change="goHtml" layout="prev, pager, next"
                           :total="htmlNo">
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
import {getArticles,getLocal,getUser} from '../api/index.js';
import goTop from '../base/goTop.vue';
export default {
  filters:{
    getTime(val){
      return new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    }
  },
  data() {
    return {
      pl:12,
      z:44,
      defaultList:'hot',
      images:[
        {src:'http://img5.imgtn.bdimg.com/it/u=1574196120,1246886327&fm=15&gp=0.jpg'},
        {src:'http://img4.imgtn.bdimg.com/it/u=3129514871,1783886403&fm=27&gp=0.jpg'},
        {src:'http://img0.imgtn.bdimg.com/it/u=4093450726,1893526692&fm=15&gp=0.jpg'},
        {src:'http://img4.imgtn.bdimg.com/it/u=3827785436,66188750&fm=15&gp=0.jpg'},
        {src:'http://img4.imgtn.bdimg.com/it/u=1966442326,3008567644&fm=27&gp=0.jpg'},
      ],
      loading:true,
      htmlArcs:[],
      hotArcs:[],
      cssArcs:[],
      userMsg:{},
      hotPage:1,
      htmlPage:1,
      hotNo:0,
      htmlNo:0
    }
  },
  created(){
    if(localStorage.loginMsg != ''){this.$store.commit('loginMutation',true);}
    this.userMsg = getUser();
    this.getHots(0,'hot',this.hotPage,true);
    this.getHots(1,'new',this.htmlPage,true);
    this.getCss();
  },
  methods:{
    async getHots(type,sort,page,index){
      let res = await getArticles(type,sort,page,index);
      this.hotNo = parseInt(res.data.listCount[0])/2;
      if(type == 0){
        this.hotNo = parseInt(res.data.listCount[0])/2;
        this.hotArcs = res.data.data;
      }
      if(type == 1){
        this.htmlNo = parseInt(res.data.listCount[0])/2;
        this.htmlArcs = res.data.data;
      }
      this.loading = false;
    },
    async getCss(){
      let res = await getLocal();
      this.cssArcs = res.data;
    },
    goHot(val){
      this.hotPage = val;
      this.getHots(0,'hot',this.hotPage,true);
    },
    goHtml(val){
      this.htmlPage = val;
      this.getHots(1,'new',this.htmlPage,true);
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
</style>
