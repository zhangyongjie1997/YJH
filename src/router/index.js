import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Personal from '../components/Personal.vue';
import Write from '../components/Write.vue';
import Home from '../components/Home.vue';
import Articles from '../components/Articles.vue';
import Content from '../components/Content.vue';
import Knowledge from '../components/Knowledge.vue';
import KnowledgeAll from '../components/Knowledge-all.vue';
import KnowledgeJava from '../components/Knowledge-java.vue';
import jingyan from '../components/articles-jingyan.vue';
import rumen from '../components/articles-rumen.vue';
import chengguo from '../components/articles-chengguo.vue';
import all from '../components/articles-all.vue';

Vue.use(Router);
// () => import ('../components/List.vue')
export default new Router({
  routes: [
    {
      path: '/',
      component:() => import ('../components/Login.vue'),
      meta:{title:'登录'}
    },
    {
      path: '/write/:aid',
      component:Write,
      meta:{title:'写文章'},
      name:'write'
    },
    {
      path: '/write',
      component:() => import ('../components/Write.vue'),
      meta:{title:'写文章'},
    },
    {
      path: '/articles',
      component:Articles,
      meta:{title:'文章'},
      children:[
        {path:'jingyan',component:() => import ('../components/articles-jingyan.vue'),meta:{title:'经验分享',keepAlive:true}},
        {path:'rumen',component:() => import ('../components/articles-rumen.vue'),meta:{title:'入门学习',keepAlive:true}},
        {path:'chengguo',component:() => import ('../components/articles-chengguo.vue'),meta:{title:'成果分享',keepAlive:true}},
        {path:'all',component:() => import ('../components/articles-all.vue'),meta:{title:'全部',keepAlive:true}}
      ],
      redirect:'/articles/all'
    },
    {
      path: '/content/:aid',
      component: () => import ('../components/Content.vue'),
      name: 'content',
      meta:{title:'文章详情'}
    },
    {
      path: '/home',
      component:() => import ('../components/Home.vue'),
      meta:{title:'首页'}
    },
    {
      path: '/knowledge',
      component:() => import ('../components/Knowledge.vue'),
      meta:{title:'知识体系'},
      children:[
        {path:'knowledgeAll',component:() => import ('../components/Knowledge-all.vue'),meta:{title:'知识体系-全部',keepAlive:true}},
        {path:'knowledgeJava',component:() => import ('../components/Knowledge-java.vue'),meta:{title:'知识体系-Java',keepAlive:true}},
      ],
      redirect:'/knowledge/knowledgeAll'
    },
    {
      path: '/login',
      component:() => import ('../components/Login.vue'),
      meta:{title:'登录'}
    },
    {
      path: '/register',
      component:() => import ('../components/Register.vue'),
      meta:{title:'注册'}
    },
    {
      path: '/personal',
      component:() => import ('../components/Personal.vue'),
      meta:{title:'个人中心'}
    },
    {
      path: '*',
      redirect: '/home'
    },
  ]
});
