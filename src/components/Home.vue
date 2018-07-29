<template>
  <div>
    <goTop></goTop>
    <div class="wrapper">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(image,index) in images" :key="index">
          <img :src="image.src">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tabs">
      <el-tabs v-model="defaultList" v-loading="loading">
        <el-tab-pane label="热门文章" name="hot">
          <ul>
            <li class="a-list" v-for="(hotArc, index) in hotArcs" :key="index">
              <div class="a-info">
                <span>{{hotArc.nick_name}}</span> ·
                <span>{{hotArc.modify_time | getTime}}</span>
              </div>
              <div class="a-main">
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
            <el-pagination @current-change="goHot" layout="prev, pager, next" :total="hotNo">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="HTML" name="second" :lazy="true">
          <ul>
            <li class="a-list" v-for="(htmlArc, index) in htmlArcs" :key="index">
              <div class="a-info">
                <span>{{htmlArc.nick_name}}</span> ·
                <span>{{htmlArc.modify_time | getTime}}</span>
              </div>
              <div class="a-main">
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
            <el-pagination @current-change="goHtml" layout="prev, pager, next" :total="htmlNo">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="CSS" name="third" :lazy="true">
          <ul>
            <li class="a-list" v-for="(cssArc, index) in cssArcs" :key="index">
              <div class="a-info">
                <span>{{cssArc.kind}}</span> ·
                <span>{{cssArc.time}}</span>
              </div>
              <div class="a-main">
                <router-link tag="a" :to="{name:'content',params:{aid:cssArc.id}}">{{cssArc.name}}</router-link>
                <div class="handlInfo">
                  <el-badge :value="cssArc.pl" :max="99" class="item">
                    <el-button size="small">浏览</el-button>
                  </el-badge>
                  <el-badge :value="cssArc.z" :max="99" class="item">
                    <el-button size="small">点赞</el-button>
                  </el-badge>
                </div>
                <div style="clear:both;"></div>
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
  import mixin from '../mixins/filters-mixin.js'; 
  import {getArticles,getLocal,getUser} from '../api/index.js';
  import goTop from '../base/goTop.vue';
  export default {
    mixins:[mixin],
    data() {
      return {
        defaultList: 'hot',
        images: [{
            src: 'http://img2.imgtn.bdimg.com/it/u=2232834105,729366233&fm=27&gp=0.jpg'
          },
          {
            src: 'http://img1.imgtn.bdimg.com/it/u=1844262903,2765904284&fm=27&gp=0.jpg'
          },
          {
            src: 'http://img1.imgtn.bdimg.com/it/u=702868049,71387738&fm=27&gp=0.jpg'
          },
          {
            src: 'http://img5.imgtn.bdimg.com/it/u=4062196616,3542734093&fm=15&gp=0.jpg'
          },
          {
            src: 'http://img3.imgtn.bdimg.com/it/u=3749688503,1353794528&fm=27&gp=0.jpg'
          },
        ],
        loading: true,
        htmlArcs: [],
        hotArcs: [],
        cssArcs: [],
        userMsg: {},
        hotPage: 1,
        htmlPage: 1,
        hotNo: 0,
        htmlNo: 0
      }
    },
    created() {
      this.getHots(0, 'hot', this.hotPage, true);
      this.getHots(1, 'new', this.htmlPage, true);
      this.getCss();
    },
    methods: {
      async getHots(type, sort, page, index) { //获取图书
        let res = await getArticles(type, sort, page, index);
        this.hotNo = parseInt(res.data.listCount[0]) / 2;
        if (type == 0) {
          this.hotNo = parseInt(res.data.listCount[0]) / 2;
          this.hotArcs = res.data.data;
        }
        if (type == 1) {
          this.htmlNo = parseInt(res.data.listCount[0]) / 2;
          this.htmlArcs = res.data.data;
        }
        this.loading = false;
      },
      async getCss() {
        let res = await getLocal();
        this.cssArcs = res.data;
      },
      goHot(val) { //分页按钮换页，
        this.hotPage = val;
        this.getHots(0, 'hot', this.hotPage, true);
      },
      goHtml(val) {
        this.htmlPage = val;
        this.getHots(1, 'new', this.htmlPage, true);
      }
    },
    components: {
      goTop
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

  .a-list {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    .a-info {
      height: 25%;
      font-size: 12px;
      color: #999;
    }
    .a-main {
      height: 45px;
      line-height: 45px;
      font-size: 17px;
      .title {
        display: inline-block;
        width: 250px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .handlInfo {
        //display: inline-block;
        margin-bottom: 5px;
        float: right;
        .item {
          margin-right: 40px;
        }
      }
    }
  }

</style>
