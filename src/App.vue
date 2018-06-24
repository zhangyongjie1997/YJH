<template>
  <div id="app">
    <Top></Top>
    <!-- <transition name="fade"> -->
      <router-view></router-view>
    <!-- </transition> -->
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
