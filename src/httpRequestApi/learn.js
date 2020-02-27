// function foo(obj) {
//     var aa=3;
//     if(aa){
//         var bb=5;
//         let c=66;
//     }
//     console.log(bb);
//     console.log(c);  //undefined
// }
// foo(1);

// {
//     for (var j=0; j<10; j++) {
//     var i = j; // 每个迭代重新绑定！ 
//     console.log( i );
//  }
// }


// var foo = true, baz = 10;    讲的还是let只能在一定的作用域里面  
// if (foo) { 
// let bar = 3;
// if (baz > bar) { // <-- 移动代码时不要忘了 bar! 
//     console.log( baz );
//  }
//  }
//  console.log(bar)   //not defined


//  function foo() {   
//     var a; 
//     console.log( a ); // undefined   定义了a只是a没有被赋值  因为程序会先进行执行定义这些 后面执行赋值 
//     a = 2;
//     function bbb(){
//         console.log(1111)
//     }
//  }
//  foo()


// for (var i=1; i<=5; i++) {   
//     (function(k) { 
//         setTimeout( function timer() { 
//             console.log( k ); }, k*1000 
//             ); })( i ); }


        // for (var i=1; i<=5; i++) {
        //     let j = i; // 是的，闭包的块作用域！  如果用的是var  后面这个i会变成5  全部console 5出来
        //     console.log(j)
        //     setTimeout( function timer() { 
        //         console.log( j );
        //      }, j*1000 );
        //      }

        
        //      for(let i=1;i<=6;i++){
        //          console.log(i)
        //          (function(){
        //              console.log(1)
        //          })()
        //      }

            
// for(var i=1;i<=5;i++){
//     (function(i){
//        var j=i
//     setTimeout( function timer() { 
//         console.log( j );
//      }, j*1000 );
//     })(i)
// }

           
// for(var i=1;i<=5;i++){
//     let j=i
//     setTimeout( function timer() { 
//         console.log( j );
//      }, j*1000 );
// }

// var foo = (function CoolModule(id) {
//     function change() { // 修改公共 API 
//         publicAPI.identify = identify2;
//      }
//     function identify1() { console.log( id ); }  //小写

//     function identify2(ggg) { console.log( id.toUpperCase() ); }  //大写


//     var publicAPI = {
//          change: change,
//           identify: identify1,
//           aaa:identify2
//          };

//     return publicAPI; 
// })( "foo module" ); 


//     foo.identify(); // foo module 
//     foo.change(); 
//     foo.identify(); // FOO MODULE
//     foo.aaa();

// function foo() {
//     var a = 2;
//     bar(); 
// }

//  function bar() { 
//         console.log( this.a );
//      }
    
    
// foo(); // ReferenceError: a is not defined

// function foo() {
//      console.log( this.a ); 
//      console.log(this.bi);
//     }
// var bi=666
//     function lll(){
//         console.log(12311)
//     }
// var obj = {
//         a: 2,
//         foo: foo,
//         b:lll
//     };
// obj.b();
// obj.foo(); // 2


// function foo() { console.log( this.a ); }

// var obj2 = {
//      a: 42,
//      foo11: foo,
//      lll:this.yy
//      };

// var obj1 = { 
//     a: 2,
//      obj2: obj2,
//      yy:kk 
//     };

// function kk(){
//     console.log(9001)
// }

// console.log(obj1.yy())

// obj1.obj2.foo11(); // 42

// console.log(obj2.lll)  //undefined



// function identify () {
//     return this.name.toUpperCase()
//   }
  
//   function speek () {
//     var greeting = 'hello, 我是' + identify.call(this)
//     console.log(greeting)
//   }
  
//   var p1 = {
//     name: 'xiaoHong'
//   }
//   var p2 = {
//     name: 'XiaoLi'
//   }
//   ccc=identify.call(p1) ;  // 输出？  xiaohong 
//   identify.call(p2)  ; // 输出？   xiaoli 
//   speek.call(p1)      // 输出？   xiaohong
//   speek.call(p2)    // 输出？ 
// console.log(ccc)

// function foo (num) {
//     console.log('foo:' + num);
//     this.count++;
//     console.log(this)
//   }
//   foo.count = 0
//   for (var i = 0; i < 10; i++) {
//     if ( i > 5) {
//       foo(i)
//     }
//   }
//   console.log('foo.count被调用了多少次?:'+foo.count)

// function foo () {
//     console.log(this.a)
//   }
//   var a = 2
// //   foo()   //undefined

//   function foo () {
//     console.log(this.a)
//   }
//   var obj = {
//     a: 2,
//     foo: foo
//   }
//   var bar = obj.foo
//   var a = '我是全局属性a'
//   bar()  //输出？

// function foo()
//  { console.log( this.a ); }
// var obj = {
//      a: 2,
//      foo: foo 
//     };
//     obj.foo(); // 2

// function foo() { 
//     console.log( this.a );
//  }
// var obj = { 
//     a: 2, 
//     foo: foo
//  };

// var bar = obj.foo; // 函数别名！
// var a = "oops, global"; // a 是全局对象的属性
//  bar(); // "oops, global"


//  function foo() {
//       console.log( this.a ); 
    
//     }
// function doFoo(fn) { 
//     // fn 其实引用的是 foo 
//     fn(); // <-- 调用位置！
//  }
// var obj = { 
//      a: 2,
//      foo: foo
//      };

// // var a = "oops, global"; // a 是全局对象的属性

// // doFoo( obj.foo ); // "oops, global"


// function foo() {
//      setTimeout(() => { // 这里的 this 在此法上继承自 foo() 
//     console.log( this.a ); },100); 
// }

// // var obj = { a:2 };foo.call( obj ); // 2


// var myArray = [ 1, 2, 3 ];
// for (var v of myArray) { 
//     console.log( v );
//  }
//  // 1 
//  // 2
// // 3
// var a = [1,2,3,4,5,6];







// var a = [1,2,5,6]   

// console.log(...a)  // 1, 2     1. 新的数组的操作

// var d = [...a, 4, 5]

// console.log(d) //[ 1, 2, 5, 6, 4, 5 ]    2. 新的数组的操作

// for(i of a){
//     console.log(i)   // 1  2  5  6      3.新的循环
// }

// function sayHi(name='frank') { //     4.新的函数默认值
//     console.log(name)
//   }
//   sayHi() //frank
//   sayHi('tom') //tom


//   class Person {                      //  5.构造函数
//     constructor(name, age) {
//       this.name = name;
//       this.age = age;
//     }
//     sayHello() {
//       console.log( `hello, ${this.name}, i am ${this.age} years old`);
//     }
//   }
//   var p = new Person('hunger', 2);

// p.sayHello()

// {                //  6.ES6 可以直接用{}来创建一个块作用域
//     console.log(555)
// }



// function foo(x = 11, y = 31) {    //  7.函数默认值改进
//     console.log( x + y ); 
//    } 
//    foo(); // 42 
//    foo( 5, 6 ); // 11 
//    foo( 0, 42 ); // 42 
//    foo( 5 ); // 36 
//    foo( 5, undefined ); // 36 <-- 丢了undefined 
//    foo( 5, null ); // 5 <-- null被强制转换为0 
//    foo( undefined, 6 ); // 17 <-- 丢了undefined 
//    foo( null, 6 ); // 6 <-- null被强制转换为



// var name='ketty'

// console.log(`nihao :${name}`)  // nihao :ketty   8.字符串字面量  


// // 9.箭头函数 
// var bb=(a)=>a*3

// console.log(bb(6))

// var ah=[1,3,2,6,5]

// for(t of ah){
//     var nnn=(t)=>t+1    // 9.箭头函数 

//     console.log(nnn(t))
// }

// var kijo={
//     fin(){             //10. 对象里面可以进行函数简写  不需要用前面的function
//         console.log(1)
//     }
// }


// var [h,j,k]=[1,3,6]   // 11. 变量赋值也有所改变
// console.log(h)    //1
// console.log(j)    //3
// console.log(k)    //6


// for (v of a){    //  12.新的for...of...  和 switch
//     console.log(v)
//     switch (true) {
//         case v == 1:
//             console.log( "10 or '10'" );
//             break;
//         case v == 2:
//             console.log( "42 or '42'" );
//             break;
//         case v == 7:
//             console.log(66)
//     default:

// }
//  // 永远执行不到这里
// }
//