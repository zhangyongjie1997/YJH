# 猿计划   master

>## A Vue.js project

![Alt text](https://github.com/zhangyongjie1997/vue-book/blob/master/src/assets/logo.png)

### vue + vue-cli + vue-router + vuex + axios + element-ui

```
npm install less less-loader axios vuex bootstrap --save-dev
```

## vue之声明周期
- beforecreated /  created
  - beforecreated 组件实例刚刚被创建，组建属性(如data属性)被计算之前
  - created 组件实例创建完成，组件属性已绑定(包括计算属性等)，但还没生成dom，$el还不存在，尽量此处发送ajax
- beforemount  /   mounted
  - brforemount 模板编译/挂载之前  有$el,{{}}中的值还没有被渲染
  - mounted  模板编译/挂载之后(不保证组件已在document中)  有$el,{{}}中的值被渲染
- beforeupdated /  updated
  - beforeupdated  组件更新之前   有值变化并且需要更新视图时，如更新{{}}中的值，但是在beforeupdated阶段，视图就已经更新?在beforeUpdate,可以监听到data的变化但是view层没有被重新渲染，view层的数据没有变化。等到updated的时候 view层才被重新渲染，数据更新
  - updated  组件更新之后
- beforedestroy/   destroyed
  - beforedestroy 组件销毁之前     组件销毁之后视图还在，但是不受vue的控制
  - destroyed  组件销毁之后
- activated    /   deactivated
  - activated  for keep-alive 组件被激活时调用
  - deactivated  for keep-alive 组件被移除时调用

- brforecreated


- 使用举例
```js
beforecreate : 举个栗子：可以在这加个loading事件 
created ：在这结束loading，还做一些初始化，实现函数自执行 
mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
beforeDestroy： 你确认删除XX吗？ destroyed ：当前组件已被删除，清空相关内容
distoryed:在distoryed之前全局路由钩子直接收到to
```
>父级组件子级组件和beforeRouterEnter打印的顺序是 父级beforeCreate>父级created>父级beforeMount>子级beforeCreat>子级created>子级beforeMount>子级mounted>父级mounted>路由
## 路由解析流程
```
1.导航被触发。
2.在失活的组件里调用离开守卫。
3.调用全局的 beforeEach 守卫。
4.在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5.在路由配置里调用 beforeEnter。
6.解析异步路由组件。
7.在被激活的组件里调用 beforeRouteEnter。
8.调用全局的 beforeResolve 守卫 (2.5+)。
9.导航被确认。
10.调用全局的 afterEach 钩子。
11.触发 DOM 更新。
12.用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
```

## vue 路由钩子、异步
- 全局路由钩子
```js
router.beforeEach((to, from, next) => {
    //会在任意路由跳转前执行，next一定要记着执行，不然路由不能跳转了
  console.log('beforeEach')
  console.log(to,from)
  next()
})
router.afterEach((to, from) => {
    //会在任意路由跳转后执行
  console.log('afterEach')
})
```
- 单个路由钩子

只有beforeEnter，在进入前执行，to参数就是当前路由
```js
 routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
```
- 路由组件钩子，在组件内定义
```js
 beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
```

- route生命周期
```js
module.exports = {
        //props: ['父组建传的值'],
        data:function(){
            lifecycle.push("data");
            return {
                msg: '各个阶段，可以查看控制台输出，message from my-views',
                title:'my_views',
                lifecycle: lifecycle
            }
        },
        //这里是route的生存周期
        route:{
            //waitForData: true, //  数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
            canActivate:function(transition){
                //  canActivate阶段，可以做一些用户验证的事情(是否可以被激活)
                //  在验证阶段，当一个组件将要被切入的时候被调用。
            },
            activate:function(transition){
                                //  在激活阶段被调用，在 activate 被断定（ resolved ，指该函数返回的 promise 被 resolve ）。用于加载和设置当前组件的数据。(激活)
                //this.$root.$set('header',this.title);
                transition.next();
                //此方法结束后，api会调用afterActivate 方法
                //在aftefActivate中 会给组件添加 $loadingRouteData 属性 并设置为true
            },
            data: function(transition) {
                var _this = this;
                //  在激活阶段被调用，在 activate 被断定（ resolved ，指该函数返回的 promise 被 resolve ）。用于加载和设置当前组件的数据
                // 说明之前请求过 则不用再请求了
                if(this.$root.myViewsData){
                    this.$data = this.$root.myViewsData;
                    transition.next();
                    console.log('已经请求过了不再请求数据');
                    return;
                }
                //将数据同步到根节点
                this.$root.myViewsData = this.$data;
                setTimeout(function(){
                    //这里 _this.$loadingRouteData 是 true
                    transition.next({msg:'加载后的数据'});
                    //在调用完transition.next 后，_this.$loadingRouteData 为 false
                }.bind(this),4000);
            },
            canDeactivate:function(transition){
                //  在验证阶段，当一个组件将要被切出的时候被调用。(是否可以被禁用)
            },
            deactivate: function (transition) {
                //  在激活阶段，当一个组件将要被禁用和移除之时被调用。(禁用)
            }
        },
        beforeCreate:function(){
            // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
        },
        created:function(){
            // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
        },
        beforeCreate:function(){
            // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
        },
        mounted:function(){
            // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
        },
        beforeUpdate: function(){
            // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 
            // 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
        },
        Update: function(){
            // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
            //当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。
        },
        // <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
        activated: function(){
            // keep-alive 组件激活时调用。
        },
        deactivated: function(){
            // keep-alive 组件停用时调用。
        },
        beforeDestroy:function(){
            // 实例销毁之前调用。在这一步，实例仍然完全可用。
        },
        destroyed:function(){
            // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
        }
    }
```
## vue.extend构造器
- 使用Vue构造器，创建一个“子类”，参数是一个包含组件选项的对象，其中,data选项中必须是函数 data(){return{}}
- Vue.extend 返回的是一个“扩展实例构造器”，也就是一个预设了部分选项的 Vue 实例构造器

Vue.component 是用来全局注册组件的方法，其作用是将通过 Vue.extend 生成的扩展实例构造器注册（命名）为一个组件，可以简单理解为当在模板中遇到该组件名称作为标签的自定义元素时，会自动调用类似于 new myVue 这样的构造函数来生成组件实例，并挂载到自定义元素上，
```js
var myVue = Vue.extend({
 // 预设选项
}) // 返回一个“扩展实例构造器”
 
// 然后就可以这样来使用
var vm = new myVue({
 // 其他选项
})
```
- 另一种理解
```js
// extend 是构造一个组件的语法器.
// 你给它参数 他给你一个组件 然后这个组件

// 你可以作用到Vue.component 这个全局注册方法里， 也可以在任意vue模板里使用<apple>组件
var apple = Vue.extend({
....
})
Vue.component('apple',apple)

//你可以作用到vue实例或者某个组件中的components属性中并在内部使用apple组件
new Vue({
 components:{
 apple:apple
 }
})
//Vue.component 你可以创建 ，也可以取组件 例如下
var apple = Vue.component('apple')
```

## mixin,extends

## 文件结构
- api 代表所有接口
- base 基础组件
- components 页面级组件
- router 路由
- css

## webpack 的基础配置
```js
let HtmlWebpackPlugin = require("html-webpack-plugin");
//vue-loader V15版本以上的配置需要加，在plugins中加入new VueLoaderPlugin()
let VueLoaderPlugin = require("vue-loader/lib/plugin");
let path = require("path");
//专门处理路径用的，以当前传入路径解析出一个相对路径
//path.resolve('./dist');
module.exports = {
  entry: "./main.js",
  //webpack必须使用commonjs写法
  //打包文件的入口webpack，会自动检测依赖并进行打包
  output: {
    //输出文件配置
    filename: "build.js", //打包后的名字
    path: path.resolve("./dist"), //必须是绝对路径
  },
  //模块的解析规则
  //- js匹配所有的js 用babel-loader转移排除掉所有的node-modules
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node-modules/, //解析es6语法
      },
      {
        //use时从右往左写
        test: /\.css$/,
        use: ["style-loader", "css-loader"], //解析css
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"], //解析less
      },
      {
        //limit只将大小在8192字节以下的图片转化为base64，其他情况下输出图片
        test: /\.(jpg|png|gif)$/,
        use: ["url-loader?limit=8192"],
      },
      {
        test: /\.(svg|woff|woff2|eot|wtf)$/,
        use: ["url-loader"],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
        //.vue文件解析需要安装vue-loader，vue会自动调用vue-template-compiler
        //vue-template-compiler用来解析vue模板
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", //自己准备的模板
      filename: "index.html", //产出的文件名，默认是index.html
    }),
    new VueLoaderPlugin(),
  ],
};
//css-loader将css解析城模块，将解析的内容插入到style标签内
//解析样式npm install css-loader style-loader --save-dev

/*
解析图片file-loader
url-loader(依赖于file-loader) 
*/

//解析html插件  npm install html-webpack-plugin --save-dev
//作用：以自己的html为模板将打包后的结果自动引入到html，并产出到dist目录下

/*
 npm install webpack-dev-server --save-dev
内置了服务，产生一个端口号，当代码更新世自动打包（在内存中打包），动态监控代码，
代码有变化就重新执行，类似live-server
*/
```
## 导航栏全局组件top
- 根据vuex登录状态隐藏/显示一些标签

## 回到顶部全局组件goTop
- 根据页面向下滚动的距离控制组建的显示
- js原生动画滚动页面

## 登录注册功能
- home.vue组件
- 增加 api 方法，实现登录，注册请求
- 登录成功在vuex保存登录的状态，localStroge保存个人信息
- 在相应的组件中应用 api，如果是一个基础组件(能复用的)需要用这些数据，应该在使用这个组件的父级中调用这个方法，再将数据传递给基础组件
- 创建一个基础组件


---
## 路由配置
```js
//router-link的class属性
  router-link-exact-active:/home     只能匹配/home
  router-link-active:/home,/home/a,/home/1  /home开头的都能匹配

  Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',component:Home},  //路由元信息实现页面缓存  this.$route.meta.keepAlive
    {path:'/home',component:Home,meta:{keepAlive:true}},
    {path:'/detail/:bid',component:Detail,name:'detail'},   ///detail/xxx  =>  {bid:xxx},带参数就必须给路径起名字
    {path:'*',redirect:'/home'},                            //this.$route.params.bid获取路由参数
  ]
})
```
```html
<router-link v-for="(book, index) in books"
 :to="{name:'detail',params:{bid:book.bookId}}"  //传入路由参数，同时加上name
            :key="index" tag="li"></router-link>
            <!-- tag="li"  router-link其实是li -->
```
- 知识体系页面二级路由配置

```js
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
```


## 路由元信息

- 路由元信息实现页面缓存

```js
{path:'/home',component:Home,meta:{keepAlive:true}}  //this.$route.meta.keepAlive(取值)
```

```html
    <!-- 需要缓存的 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的 -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
```

## axios 的使用

- axios 的 get,post,put,delete,all 均返回 promis 对象

```js
  axios.defaults.baseURL = 'http://localhost:3001'; //设置默认的请求路径

  axios.interceptors.response.use((res) => {

  return res.data; });//拦截器，返回原来的结果的data属性

  axios.get('url');  //get方法
  axios.get(url, {params: { 'key': 'value' }})

  axios.delete(`/url?id=${id}`); //删除返回空对象,携带url请求参数

  axios.put(`/book?id=${id}`,data);  //携带请求路径参数及请求体参数，请求体参数为对象

  axios.post("/book",data);  //post方法

  axios.all([get|put|post...,get|put|post...]);  //参数为多个请求

```
## 数据请求异步加载方法
- async await代替promise
```js

    async remove(id){
      await removeBook(id);  //调用api发送axios.delete请求，返回promise对象
      //等待await执行完毕菜执行下面的代码
      this.books = this.books.filter(item => item.bookId !== id);
    }
```
## 加入路由动画
`</transtion>`组件
```html
<transition name="fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!-- 不需要缓存的 -->
    <transition name="fade">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
```
```css
    .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```


##  coding split 代码分割
- 在 Webpack 2 中，我们可以使用动态 import语法来定义代码分块点 (split point)
>如果使用 Babel，需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。
>如果使用vue-cli搭建项目会自带syntax-dynamic-import 插件，无需手动添加
```js
const Foo = () => import('./Foo.vue');  //动态的导入组件
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
});
//简写成
{ path: '/foo', component: () => import('./Foo.vue') }
```
- 这是旧的书写方式
```js
import Home from '../components/Home.vue';
new Router({
  routes: [
    {path:'/',component:Home},  //路由元信息实现页面缓存  this.$route.meta.keepAlive
    {path:'/home',component:Home,meta:{keepAlive:true}},
    {path:'*',redirect:'/home'},
  ]
})
```

## 我的帖子编辑跳转
- 路由传参

```html
<router-link tag="i" 
  :to="{name:'write',params:{aid:article.id}}"
  style="cursor:pointer;"
  class="iconfont icon-web-icon-">
</router-link>
```
```js
computed:{
    id(){return this.$route.params.aid;}
  }
  //取出id对应文章
  async getArticle(){
      let res = await getLocal();
      this.article = res.data.filter(item=>item.id==this.id)[0];
    }
```

## 文章排序
- router-link传递props
```html
<keep-alive v-if="$route.meta.keepAlive">
  <router-view :sort="newSort" :userMsg="userMsg"></router-view>
</keep-alive>
``` 
```js
  props:{
    sort:String,
    userMsg:Object
  },
```