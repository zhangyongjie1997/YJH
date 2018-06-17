<template>
  <div>
    <transition name="slide-fade">
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
        distance -= 20;
        document.documentElement.scrollTop = distance;
        if(distance<=20){
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
  background-color: #eee;
  right: 120px;
  bottom:100px;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  box-shadow: 0 0 2px #409EFF;
}
.goTop i{
  font-size: 35px;
  color: #409EFF;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
