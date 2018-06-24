<template>
  <div>
    <transition name="fade">
      <div @click="backTop" v-if="showGoTop" class="goTop">
        <i class="iconfont icon-Upward"></i>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props:{
    scrollInfo:{
      distance:0
    }
  },
  data() {
    return {
      showGoTop:false,
      scrollTop:0
    }
  },
  mounted(){
    this.init(); 
  },
  methods:{
    init(){
      const start = () => {
        if(document.documentElement.scrollTop>=200){
          this.showGoTop = true;
        }else{
          this.showGoTop = false;
        }
      }
      window.addEventListener('scroll',start);
    },
    backTop(){
      let distance = document.documentElement.scrollTop;
      let time = setInterval(function(){
        distance -= 30;
        document.documentElement.scrollTop = distance;
        if(distance<=30){
          document.documentElement.scrollTop = 0;
          clearInterval(time);
        }
      },13);
      this.init();
    },
    computeScroll () {
      
    }
  },
  components: {

  }
}
</script>

<style scoped>
.goTop{
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: rgba(189, 189, 189, 0);
  right: 120px;
  bottom:100px;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  box-shadow: 0 0 2px #409EFF;
}
.goTop i{
  font-size: 35px;
  color: #f56c6c;}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
