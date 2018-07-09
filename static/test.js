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