<template>
  <div>
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
            <li class="aList" v-for="(htmlArc, index) in htmlArcs" :key="index">
              <div class="aInfo"><span>作者</span> · <span>{{htmlArc.time}}</span></div>
              <div class="aMain">
                <router-link tag="a" :to="{name:'content',params:{aid:htmlArc.id}}">{{htmlArc.name}}</router-link>
                <div class="handlInfo">
                  <el-badge :value="htmlArc.pl" :max="99" class="item">
                      <el-button size="small">评论</el-button>
                    </el-badge>
                    <el-badge :value="htmlArc.z" :max="99" class="item">
                      <el-button size="small">回复</el-button>
                    </el-badge>
                </div>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="html"
                     name="second">html</el-tab-pane>
        <el-tab-pane label="css"
                     name="third">css</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import {getArticles,getLocal} from '../api/index.js';
export default {
  data() {
    return {
      pl:12,
      z:44,
      defaultList:'hot',
      images:[
        {src:'http://img0.imgtn.bdimg.com/it/u=2453458897,4033312287&fm=27&gp=0.jpg'},
        {src:'http://img1.imgtn.bdimg.com/it/u=4011309160,3518676505&fm=27&gp=0.jpg'},
        {src:'http://img1.imgtn.bdimg.com/it/u=1421334331,3725048632&fm=27&gp=0.jpg'},
        {src:'http://img0.imgtn.bdimg.com/it/u=2718638946,4135852600&fm=27&gp=0.jpg'},
        {src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=601251321,155329113&fm=27&gp=0.jpg'},
      ],
    loading:true,
    htmlArcs:[]
    }
  },
  created(){
    this.getArc();
  },
  methods:{
    async getArc(){
      let res = await getLocal();
      this.htmlArcs = res.data;
      this.loading = false;
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  height: 300px;
  width: 70%;
  margin: 0 auto;
  margin-top: 100px;
  img {
    height: 300px;
  }
}
.tabs {
  height: 300px;
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
