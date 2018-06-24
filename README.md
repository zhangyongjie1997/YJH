# yuanjihu    test

>## A Vue.js project

![Alt text](https://github.com/zhangyongjie1997/vue-book/blob/master/src/assets/logo.png)

### vue + vue-cli + vue-router + vuex + axios + element-ui

```
npm install less less-loader axios vuex bootstrap --save-dev
```


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
