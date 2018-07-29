// //快速排序

// /*
// 1.找一个基准数

// */
// let array = [14,5,4,65,31,9,2,55];
// //交换函数
// function swap(arr,a,b){
//   [arr[a],arr[b]]= [arr[b],arr[a]];
// }
// function sort(data){
//   let left = 1;
//   let right = data.length - 1;
//   let len = data.length;
//   while(left!=right && left<right){
//     if(data[left]>data[0]&&data[right]<data[0]){
//       swap(data,left,right);
//       left++;
//       right--;
//     }
//   }
//   return data;
// }
// console.log(sort(array));
// var b = 10;
// (function(){
//   var a = b =5;
// })();
// console.log(b);
// function Person (name){
//   this.name = name;
// }
// Person.prototype.say = function(){
//   console.log(this.name);
// }
// let worker = new Person('zhang');
// worker.say();

// var Base = function () {   //function继承
//   this.a = 2
// }
// Base.prototype.a = 3;
// var o1 = new Base();
// var o2 = Object.create(Base);
// console.log(o1.a);
// console.log(o2.prototype.a);

//object继承
// let o = {
//   a:3
// }
// o.__proto__.c = 4;
// let b = Object.create(o);
// console.log(o.a,o.c);
// let a = [1,2,3,4,5,6]
// let b = 'asd'
// console.log(typeof a.join(','));
// console.log(b.index);
// let a = 1;
// let f = ()=>{
//   let a = 2;
//   console.log(this.a);
// }
// f();
// function Person(name) {
//   this.speak = function(){
//     console.log(this.name);
//   }
// }
// Person.prototype.say = function () {
//   console.log(this.name);
// }
// function Student (){}
// Student.prototype =new Person();
// let a = new Student();
// a.name = 'aaa';
// a.say();   //aaa
// a.speak();  //aaa
// function Person(name) {
//   this.speak = function(){
//     console.log(this.name);
//   }
// }
// function Student (){}
// let a = new Person();
// let b = new Student();
// console.log(b.speak)   //undefined
// Object.setPrototypeOf(b,a);
// console.log(b.speak);  //Function
// class a {
//   constructor(name){
//     this.name = name;
//   }
//   say(){
//     console.log(this.name);
//   }
// }
// let b = new a(111);
// console.log(b.name);  //111
// b.say();   //

// class a {
//   constructor(name){
//     this.name = name;
//     console.log(new.target);  //b
//   }
//   say(){
//     console.log(this.name);
//   }
// }
// class b extends a{
//   constructor(name){
//     super(name);
//     console.log(new.target);  //b
//     //等价于a.call(this,name)
//   }
// }
// var c = new b(111);
// c.say();   //111

// function a() {
//   return arguments[0] + arguments[1];
// }
// console.log(a(1,1));

// let a = {
//   bb:0,
//   set b (val){
//     this.bb = val + 1;
//   },
//   get b (){
//     return this.bb;
//   },
//   c:[]
// }
// a.b = 1;
// console.log(a.b);  //2

// let a = 'asdf';
// let b = [...a];
// console.log(2**3);  //

// function fetchTextByPromise() {
//   return new Promise(resolve => { 
//     setTimeout(() => { 
//       resolve("es8");
//     }, 2000);
//   });
// }
// async function sayHello() { 
//   const externalFetchedText = await fetchTextByPromise();
//   console.log(`Hello, ${externalFetchedText}`); // Hello, es8
// }
// sayHello();  //

// let a = [1,2,3,]
// let b = a.filter(item=>{
//   return item == 1;
// });
// console.log(b);

// let A = function(){
//   this.arr = [1,2,3]
// }
// let B = function(){
//   A.call(this);
// }
// let b = new B();
// console.log(b.arr);

// function A(name){
//   this.arr = [1,2,3]
//   this.name = name
// }
// A.prototype.say = function(){
//   console.log(this.name)
// }
// function B(name,age){
//   A.call(this,name)
//   this.age = age
// }
// B.prototype = new A()
// B.prototype.constructor = B
// B.prototype.sayAge = function(){
//   console.log(this.age)
// }
// let b = new B('www',15);
// console.log(b.arr);  //[1,2,3]
// b.say()   //www
// b.sayAge()  //15

// function A(name){
//   this.arr = [1,2,3]
//   this.name = name
// }
// A.prototype.say = function(){
//   console.log(this.name)
// }
// function B(name,age){
//   A.call(this,name)
//   this.age = age
// }
// B.prototype = A.prototype;
// B.prototype.constructor = B
// B.prototype.sayAge = function(){
//   console.log(this.age)
// }
// let b = new B('www',15);
// console.log(b.arr);  //[1,2,3]
// b.say()   //www
// b.sayAge()  //15

// let a = new Set()
// let b = {c:1}
// let c = {c:1}
// a.add(b)
// a.add(c)
// console.log(a);

// function deepCopy(obj){
//   let newObj = obj instanceof Array?[]:{};
//   for(item in obj){
//     if(typeof item == 'object'){
//       newObj[item] = deepCopy(obj[item])
//     }else{
//       newObj[item] = obj[item];
//     }
//   }
//   return newObj;
// }
// let a = {b:1,c:2}
// let b = deepCopy(a)
// b.b=3;
// console.log(a,b);

// let arr = [7,8,9]
// console.log("0" in arr);
// console.log(arr['0']);

// let time = null;
// time = setTimeout(() => {
  
// }, 100);
// let a = !time;
// console.log(a);

// function A(){
//   var a = 1;  //私有变量
//   function sum(){}   //私有函数
//   this.add = function (){
//     a++;
//   }
//   this.read = function (){
//     return a;
//   }
// }
// let b = new A();
// console.log(b.read());  //1
// console.log(b.a);   //undefined

// let c = new A();
// c.add()
// console.log(c.read());   //2
// console.log(b.read());  //1

// for (let i = 0; i < 5; i++) {
//   setTimeout(function() {
//       console.log(new Date, i);
//   }, 1000);
// }

// const tasks = []; // 这里存放异步操作的 Promise
// const output = (i) => new Promise((resolve) => {
//     setTimeout(resolve, 1000);
// });

// // 生成全部的异步操作
// (async function (){
//   for (var i = 0; i < 5; i++) {
//     await output(i) 
//     console.log(new Date(),i);
//  }
//  await output(i);
//  console.log(new Date(),i);
// })();

// // // 异步操作完成之后，输出最后的 i
// // Promise.all(tasks).then(() => {
// //     setTimeout(() => {
// //         console.log(new Date, i);
// //     }, 1000);
// // });

// var x = 0;
// var foo = {
//     x:1,
//     bar:function () {
//         console.log(this.x);
//         var that = this;
//         return function () {
//            console.log(this.x)
//            console.log(that.x)
//         }
//     }
// }

// foo.bar()      
// foo.bar()()   

console.log((2.5).toFixed(0));