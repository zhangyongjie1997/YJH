import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const state = {
  ifLogin: false
};
let getters = {
  getUser(state){
    return state.user;
  }
};
const mutations = {
  loginMutation(state,flag) { //state自动放入，默认☞的就是当前的state
    if(flag == true){
      state.ifLogin = true;
    }else{
      state.ifLogin = false;
    }
  }
};
const store = new Vuex.Store({
  state,
  strict: true, //严格模式，只能通过mutation来改变状态，不支持异步，组件不能直接更改状态的值
  mutations,
  getters
});
export default store;
