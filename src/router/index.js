import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Personal from '../components/Personal.vue';
import Write from '../components/Write.vue';
import Home from '../components/Home.vue';
import Articles from '../components/Articles.vue';
import Content from '../components/Content.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component:Login,
      meta:{title:'登录'}
    },
    {
      path: '/write',
      component:Write,
      meta:{title:'写文章'}
    },
    {
      path: '/articles',
      component:Articles,
      meta:{title:'文章列表'}
    },
    {
      path: '/content/:aid',
      component: Content,
      name: 'content',
      meta:{title:'文章详情'}
    },
    {
      path: '/home',
      component:Home,
      meta:{title:'首页'}
    },
    {
      path: '/login',
      component:Login,
      meta:{title:'登录'}
    },
    {
      path: '/register',
      component:Register,
      meta:{title:'注册'}
    },
    {
      path: '/personal',
      component:Personal,
      meta:{title:'个人中心'}
    },
    {
      path: '*',
      redirect: '/home'
    },
  ]
})
