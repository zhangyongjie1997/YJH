import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
  mode:'hash',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component:() => import ('../components/Home.vue'),
      meta:{title:'首页'}
    },
    {
      path: '/write/:aid',
      component:() => import ('../components/Write.vue'),
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
      component:() => import ('../components/Articles.vue'),
      meta:{title:'文章'},
      children:[
        {path:'/articles/all/:kind',component:() => import ('../components/articles-all.vue'),meta:{title:'全部',keepAlive:true}}
      ],
      redirect:'/articles/all/0'
    },
    {
      path: '/content/:aid',
      component: () => import ('../components/Content.vue'),
      name: 'content',
      meta:{title:'文章详情',keepAlive:false}
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
      component: () => import ('../components/NotFound.vue'),
      meta:{title:'404'}
    },
  ]
});
