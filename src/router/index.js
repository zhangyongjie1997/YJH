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

export default new Router({
  routes: [
    {
      path: '/',
      component:Login,
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
      component:Write,
      meta:{title:'写文章'},
    },
    {
      path: '/articles',
      component:Articles,
      meta:{title:'文章'},
      children:[
        {path:'jingyan',component:jingyan,meta:{title:'经验分享',keepAlive:true}},
        {path:'rumen',component:rumen,meta:{title:'入门学习',keepAlive:true}},
        {path:'chengguo',component:chengguo,meta:{title:'成果分享',keepAlive:true}},
        {path:'all',component:all,meta:{title:'全部',keepAlive:true}}
      ],
      redirect:'/articles/all'
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
      path: '/knowledge',
      component:Knowledge,
      meta:{title:'知识体系'},
      children:[
        {path:'knowledgeAll',component:KnowledgeAll,meta:{title:'知识体系-全部',keepAlive:true}},
        {path:'knowledgeJava',component:KnowledgeJava,meta:{title:'知识体系-Java',keepAlive:true}},
      ],
      redirect:'/knowledge/knowledgeAll'
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
});
