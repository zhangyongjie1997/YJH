<template>
  <div class="container">
    <div class="nav">
      <ul>
        <li v-for="(articleType, index) in articleTypes" :key="index">
          <a href="javascript:void(0)" @click="changeType(articleType.component)">{{articleType.title}}</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="typeComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getUser} from '../api/index.js';
import knowledgeAll from './Knowledge-all.vue';
import knowledgeJava from './Knowledge-java.vue';
export default {
  data() {
    return {
      articleTypes:[
        {title:'全部',component:'knowledgeAll'},
        {title:'java',component:'knowledgeJava'},
        {title:'html',component:'knowledgeAll'},
        {title:'css',component:'knowledgeJava'},
      ],
      typeComponent:'knowledgeAll',
    }
  },
  methods:{
    changeType(val){
      this.typeComponent = val;
    }
  },
  components:{
    knowledgeAll,knowledgeJava
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
      li:first-child{
        margin-left: 0;
      }
      li{
        float: left;
        margin-left: 50px;
        color: #3d4044;
        font-weight: 700;
      }
    }
  }
  .content{
    width: 70%;
    height: 25px;
    margin: 0 auto;
  }
}
</style>
