// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload';
import {getUser} from './api/index.js'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/timg.jpg',
  loading: './assets/timg.jpg',
  attempt: 1
});
Vue.use(ElementUI);
Vue.config.devtools = true;
Vue.config.productionTip = false;
router.beforeEach(function (to,from,next) {  //每一次在进入路由之前都会执行此方法,全局钩子，可以执行一些拦截
  document.title = to.meta.title;
  next();//继续向下走，不写就不会向下走
});
/* eslint-disable no-new */
const myMixin = {
    created(){
      if (localStorage.loginMsg && (this.userMsg == {}||this.userMsg instanceof Object)) {
        this.$store.commit('loginMutation', true);
        this.userMsg = getUser();
      }
    }
}
Vue.mixin(myMixin);  //全局混入
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
