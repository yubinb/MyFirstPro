
// *****           1.let声明 循环 块级作用域和闭包
var a = [];
        for (var i=0;i<10;i++){
            a[i] = function () {
                console.log(i)
            };
        }
        a[7]();     // 10

var a = [];
        for (let i=0;i<10;i++){
            a[i] = function () {
                console.log(i)
            };
        }
        a[7]();     // 7

//  *****         2.不存在变量提升
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
// console.log(bar); // 报错ReferenceError    
// let bar = 2;              

// *****         3.let不允许在相同作用域内，重复声明同一个变量。



//*****          4.const 定义常量  不能改变他的值

mm=[1,2,3]
for(i of mm){
    const bb=1
    var ll=bb
    ll++
    console.log(ll)
}



var colors = ['red', 'blue', 'green'];

colors.forEach((item,key) =>{ //********   5.forEach 循环  第一个参数为循环的值 第二个参数为循环的key值  forEach使用return跳过本轮循环 for是用continue
    if(key=='1'){
        console.log(12313);
        return
    }
    console.log(item);
    console.log(key)
    
})

 // ******   6.Object.keys(obj)    参数：要返回其枚举自身属性的对象  返回值：一个表示给定对象的所有可枚举属性的字符串数组

 let person = {name:"张三",age:25,address:"深圳",getName:function(){}}
console.log(Object.keys(person)) // ["name", "age", "address","getName"]    6.1 处理对象，返回可枚举的属性数组

let arr = [1,2,3,4,5,6]
console.log(Object.keys(arr)) // ["0", "1", "2", "3", "4", "5"]    6.2  处理数组，返回索引值数组


let str = "saasd字符串"
Object.keys(str) // ["0", "1", "2", "3", "4", "5", "6", "7"]  6.3 处理字符串，返回索引值数组



let personData = {name:"张三",age:25,address:"深圳",getName:function(){}}

console.log(Object.keys(personData))

Object.keys(personData).map((key)=>{
    　　personData[key]='' // 获取到属性对应的值，做一些处理
}) 
console.log(personData)

Object.values(personData).map((key)=>{
    　　personData[key]='' // 获取到属性对应的值，做一些处理
}) 
console.log(personData)



// 7.**************  几个运算符号   ||

const lol=111
const plp=222
console.log((!lol && plp),123)  //7.1 只要“&&”前面是false，无论“&&”后面是true还是false，结果都将返“&&”前面的值;
                                    //只要“&&”前面是true，无论“&&”后面是true还是false，结果都将返“&&”后面的值;


console.log( 5 && 4 );//当结果为真时，返回第二个为真的值4 
console.log( 0 && 4 );//当结果为假时，返回第一个为假的值0 
console.log( 5 || 4 );//当结果为真时，返回第一个为真的值5 
console.log( 0 || 888 );//当结果为假时，返回第二个为假的值0 


function addTwoNumbers(x=1, y=0) {   //函数默认值
    return x + y;
}
console.log(addTwoNumbers(999,0.01))


// let map = new Map();
//  map.set('name', 'david','456');

// console.log(map.get('name'))

// console.log(map.get('na'))
// console.log(map.has('name'))  // 应该是检测元素是否存在
// console.log(map)
// map.name='666'
// console.log(map.name)


let array = ['1','2','3']    // 从这里开始就是 ES7   哈哈哈   1.  includes 检测数据里面是否有对应值
 if(array.includes('2')){
         console.log('有')
      }


let obj = {a: 1, b: 2, c: 3};  //  ES7    2.  Object.entries
      Object.entries(obj).forEach(([key, value]) =>{
      console.log(key); 
        console.log(value)  // 输出a: 1, b: 2, c: 3
        })