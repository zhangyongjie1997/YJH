<template>
  <div id="app">
    <Top></Top>
    <router-view></router-view>
  </div>
</template>

<script>
import Top from './base/Top.vue';
export default {
  data(){
    return{
      ifLogin:false
    }
  },
  
  name: 'App',
  components:{Top}
}
</script>

<style>
@import url('./css/reset.css');
</style>
