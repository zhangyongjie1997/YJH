<template :sort="newSort">
  <div class="container">
    <div class="nav">
      <ul>
        <li v-for="articleType in articleTypes" :key="articleType.type">
          <router-link :class="{red:$route.params.kind==(articleType.type)}" tag="a" 
            :to="'/articles/all/'+articleType.type">
            {{articleType.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sort">
      <div class="choice">
        <div @click="changeSort" :class="{'sort-active':newSort=='new'}" class="new sort-item pointer">最新</div>
        <div @click="changeSort" :class="{'sort-active':newSort!='new'}" class="hot sort-item pointer">最热</div>
      </div>
    </div>
    <div class="content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :sort="newSort"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getUser} from '../../api/index.js';
import mixin from '../../mixins/filters-mixin.js';
export default {
  mixins:[mixin],
  data() {
    return {
      userMsg:{},     //props传给子组件
      newSort:'new',
      articleTypes:[
        {title:'全部',type:0},
        {title:'经验分享',type:1},
        {title:'入门学习',type:2},
        {title:'成果分享',type:3},
      ]
    }
  },
  created(){
  },
  methods:{
    changeSort(){      //改变排序方式  hot/new
      if(this.newSort == 'new'){
        this.newSort = 'hot';
      }else{
        this.newSort = 'new';
      }
    },
  }
}
</script>

<style scoped lang="less">
.container{
  margin-top: 75px;
  .nav{
    width: 70%;
    height: 25px;
    margin: 0 auto;
    padding: 10px 0;
    border-bottom: 1px solid #000;
    ul{
      overflow: hidden;
      li:first-child{
        margin-left: 0;
      }
      li{
        float: left;
        margin-left: 50px;
        color: #3d4044;
        font-weight: 600;
      }
    }
  }
  .content{
    width: 70%;
    margin: 0 auto;
  }
  .sort{
    width: 70%;
    margin: 0px auto 10px auto;
    .choice{
      overflow: hidden;
      padding: 5px;
      height: 30px;
      .sort-item:first-child{
        margin-left: 0;
      }
      .sort-item{
        float: left;
        margin-left: 15px;
        width: 60px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: black;
      }
      .sort-active{
        color: #fff;
        background-color: #409EFF;
      }
    }
  }
}
.red{
  color: #f56c6c;
}
</style>