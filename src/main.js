// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.devtools = true;
Vue.config.productionTip = false;
const state = {
  ifLogin: false
};
let getters = {
  getUser(state){
    return state.user;
  }
};
const mutations = {
  loginMutation(state) { //state自动放入，默认☞的就是当前的state
    state.ifLogin = !state.ifLogin;
  }
};
const store = new Vuex.Store({
  state,
  strict: true, //严格模式，只能通过mutation来改变状态，不支持异步，组件不能直接更改状态的值
  mutations,
  getters
});
router.beforeEach(function (to,from,next) {  //每一次在进入路由之前都会执行此方法,全局钩子，可以执行一些拦截
  document.title = to.meta.title;
  next();//继续向下走，不写就不会向下走
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
