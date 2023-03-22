## JS部分

---

### let const 和 var 的区别

* 变量提升：var存在变量提升，let和const不存在变量提升，即在变量只能在声明之后使用，否在会报错。var 声明的变量会被提升到函数作用域的顶部，
* 给全局添加属性：浏览器的全局对象是window，Node的全局对象是global。var声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是let和const不会。
* 重复声明：var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const和let不允许重复声明变量。
* 初始值设置：在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。
* 指针指向：let和const都是ES6新增的用于创建变量的语法。 let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向。

var声明的循环变量
在整个循环变量过程中只定义了一个循环变量i，每次循环都对这一个循环变量i进行重复赋值，也就是之后的循环变量数值会覆盖之前的循环变量数值，当循环结束后只有一个循环变量i，存储的是最终的循环变量数值。

let声明的循环变量
在整个循环过程中每次循环都相当于触发执行了一个{   }，每一个{   }对于let定义的变量就是一个独立的作用域，也就是每次循环let声明的循环变量都是一个人独立作用域中的循环变量，每一次循环中循环变量都会存储不同的数据数值，互相之间不会影响，不会覆盖，也就是每次循环let声明的循环变量都相当于是一个独立的变量，不会覆盖之前的数据数值。


### for ... in  和 for... of  的区别

**for...in的特点**

* for … in 循环返回的值都是数据结构的 键值名(即下标)。
* 遍历对象返回的对象的key值,遍历数组返回的数组的下标(key)。
* for … in 循环不仅可以遍历数字键名,还会遍历原型上的值和手动添加的其他键。
* 特别情况下, for … in 循环会以看起来任意的顺序遍历键名
* for… in 的 常规属性和 排序属性：

在ECMAScript规范中定义了 「数字属性应该按照索引值⼤⼩升序排列，字符串属性根据创建时的顺序升序排列。」在这⾥我们把对象中的数字属性称为 「排序属性」，在V8中被称为 elements，字符串属性就被称为 「常规属性」， 在V8中被称为 properties。

也就是说：for...in会先按照排序属性的数字大小从小到大依次遍历，然后再遍历常规属性，常规属性遍历顺序可能不是实际的内部顺序

```js
function Foo() {
 this[99] = 'test-100'
 this[1] = 'test-1'
 this["B"] = 'bar-B'
 this[40] = 'test-50'
 this[9] = 'test-9'
 this[10] = 'test-8'
 this[3] = 'test-3'
 this[8] = 'test-5'
 this["A"] = 'bar-A'
 this["C"] = 'bar-C'
}
var bar = new Foo()
for(key in bar){
 console.log(`index:${key} value:${bar[key]}`)
}
/*输出结果为：
index:1 value:test-1
index:3 value:test-3
index:8 value:test-8
index:9 value:test-9
index:10 value:test-10
index:40 value:test-40
index:99 value:test-99
index:B value:bar-B
index:A value:bar-A
index:C value:bar-C
*/
```

for… in遍历数组的毛病：

1.index索引为字符串型数字，不能直接进行几何运算

2.遍历顺序有可能不是按照实际数组的内部顺序

3.使用for… in会遍历数组/对象所有的可枚举属性，包括原型。

所以for… in更适合遍历对象，不要使用for… in遍历数组。

**for… of 特点**

for… of 循环用来获取一对键值对中的 值,而 for… in 获取的是 键名

一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for…of循环遍历它的成员。也就是说，for…of循环内部调用的是数据结构的Symbol.iterator方法。

for… of 不同与 forEach, 它可以与 break、continue和return 配合使用,也就是说 for… of 循环可以随时退出循环。

for…of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串，但是不能遍历对象，因为没有迭代器对象，但如果想遍历对象的属性，你可以用for… in循环（这也是它的本职工作）或搭配内建的Object.keys()方法使用，代码示例：

```js
var obj={
　　a:1,
　　b:2,
　　c:3
}
for (var key of Object.keys(obj)) {
  console.log(key + ": " + obj[key]);
}
//a:1 b:2 c:3
```
for... of遍历类数组对象代码示例：
```js
  // 字符串
  var str = "hello";
  for (let s of str) {
    console.log(s); // h e l l o
  }  
// DOM NodeList对象
  let paras = document.querySelectorAll("p");
  for (let p of paras) {
   p.classList.add("test");
  }  
// arguments对象
  function Args() {
    for (let x of arguments) {
      console.log(x);
    }
  }
Args('a', 'b');// 'a' 'b'
```

### 箭头函数与普通函数的区别

箭头函数没有自己的this
>箭头函数不会创建自己的this， 所以它没有自己的this，它只会在自己作用域的上一层继承this。所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。

箭头函数继承来的this指向永远不会改变
>函数中的this就永远指向它定义时所处的全局执行环境中的this

```js
var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};
obj.a();    // 'OBJ'
obj.b();    // 'GLOBAL'
new obj.a()  // undefined
new obj.b()  // Uncaught TypeError: obj.b is not a constructor
```

call()、apply()、bind()等方法不能改变箭头函数中this的指向

箭头函数不能作为构造函数使用

### 扩展运算符

对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。

扩展运算符对对象实例的拷贝属于浅拷贝。

扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中，这里参数对象是个数组，数组里面的所有对象都是基础数据类型，将所有基础数据类型重新拷贝到新的数组中。

### 对对象与数组的解构的理解

数组的解构

在解构数组时，以元素的位置为匹配条件来提取想要的数据的：
```js
const [a, b, c] = [1, 2, 3]
//a、b、c分别被赋予了数组第0、1、2个索引位的值
```

对象的解构

对象解构比数组结构稍微复杂一些，也更显强大。在解构对象时，是以属性的名称为匹配条件，来提取想要的数据的。
```js
const stu = {
  name: 'Bob',
  age: 24
}
const { name, age } = stu
```



---

### null和undefined的区别
undefined和null在if语句中，都会被自动转为false，相等运算符甚至直接报告两者相等。

undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。

null表示"没有对象"，即该处不应该有值。

---

### 原型链继承
类似于C++中的类继承。

引用类型的属性被所有实例共享

``` js
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {}

Child.prototype = new Parent();

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]
```

借用构造函数(经典继承)可避免上述的引用类型被共享。
```js
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```
组合继承:原型链继承和经典继承双剑合璧。融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

```js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {

    Parent.call(this, name);
    
    this.age = age;

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]

```
---
### 闭包
闭包 = 函数 + 函数能够访问的自由变量

自由变量
> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。
>

例题
```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();//输出3
data[1]();//输出3
data[2]();//输出3
```
解析：

当执行到 data[0] 函数之前，此时全局上下文的 VO 为：
```js
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
```
当执行 data[0] 函数的时候，data[0] 函数的作用域链为：
```js
data[0]Context = {
    Scope: [AO, globalContext.VO]
}
```
data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。

所以让我们改成闭包看看：
```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();
```
当执行到 data[0] 函数之前，此时全局上下文的 VO 为：
```js
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
```
跟没改之前一模一样。

当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：
```js
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
```
匿名函数执行上下文的AO为：
```js
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
```
data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。

data[1] 和 data[2] 是一样的道理。

---
### 执行环境/执行上下文
在javascript中，执行环境可以抽象的理解为一个object，它由以下几个属性构成：
```
executionContext：{
    variable object：vars,functions,arguments,
    scope chain: variable object + all parents scopes
    thisValue: context object
}
```
在js解释器运行阶段还会维护一个环境栈，当执行流进入一个函数时，函数的环境就会被压入环境栈，当函数执行完后会将其环境弹出，并将控制权返回前一个执行环境。环境栈的顶端始终是当前正在执行的环境。

下面有一道题
```js
比较下面两段代码，试述两段代码的不同之处
// A--------------------------
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

// B---------------------------
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```
唯一的区别在于环境栈变化不一样，

A: contextStack = [globalContext] ---> contextStack = [checkscopeContext, globalContext] ---> contextStack = [fContext, checkscopeContext, globalContext] ---> contextStack = [checkscopeContext, globalContext] ---> contextStack = [globalContext]

B: contextStack = [globalContext] ---> contextStack = [checkscopeContext, globalContext] ---> contextStack = [fContext, globalContext] ---> contextStack = [globalContext]

javascript是使用静态作用域的语言，他的作用域在函数创建的时候便已经确定

---


### arguments

arguments的东西是个对象，而且是一个特殊的对象，它的属性名是按照传入参数的序列来的，第1个参数的属性名是’0’，第2个参数的属性名是’1’，以此类推，并且它还有length属性，存储的是当前传入函数参数的个数，很多时候我们把这种对象叫做类数组对象。

arguments的一些妙用
1.利用arguments实现方法的重载

下面我们利用arguments对象来实现一个参数相加的函数，不论传入多少参数都行，将传入的参数相加后返回。
```js
function add() {
    var len = arguments.length,
        sum = 0;
    for(;len--;){
        sum += arguments[len];
    }
    return sum;
}

console.log( add(1,2,3) );   //6
console.log( add(1,3) );     //4
console.log( add(1,2,3,5,6,2,7) );   //26
```
由于js是一种弱类型的语言，没有重载机制，当我们重写函数时，会将原来的函数直接覆盖，这里我们能利用arguments，来判断传入的实参类型与数量进行不同的操作，然后返回不同的数值。

---

### this

我们可以简单的理解 this 为调用函数的对象

---

### apply 和 call

这两个函数的作用都是改变函数的上下文

call 的写法
```js
Function.call(obj,[param1[,param2[,…[,paramN]]]])
```

需要注意以下几点：

* 调用 call 的对象，必须是个函数 Function。
* call 的第一个参数，是一个对象。 Function 的调用者，将会指向这个对象。如果不传，则默认为全局对象 window。
* 第二个参数开始，可以接收任意个参数。每个参数会映射到相应位置的 Function 的参数上。但是如果将所有的参数作为数组传入，它们会作为一个整体映射到 Function 对应的第一个参数上，之后参数都为空。

apply 的写法
```js
Function.apply(obj[,argArray])
```
需要注意的是：

* 它的调用者必须是函数 Function，并且只接收两个参数，第一个参数的规则与 call 一致。
* 第二个参数，必须是数组或者类数组，它们会被转换成类数组，传入 Function 中，并且会被映射到 Function 对应的参数上。这也是 call 和 apply 之间，很重要的一个区别。

apply 的一些妙用
Math.max。用它来获取数组中最大的一项。
```js
let max = Math.max.apply(null, array);
```
同理，要获取数组中最小的一项，可以这样：
```js
let min = Math.min.apply(null, array);
```

### bind

一句话介绍 bind:
>bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

bind 函数的两个特点：

* 返回一个函数
* 可以传入参数

---

### promise

promise.then 是微任务，它会在所有的宏任务(同步任务)执行完之后才会执行，同时需要promise内部的状态发生变化

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```

输出结果
```
1 
2 
4
```

---

### new操作符的实现原理

new操作符的执行过程：

（1）首先创建了一个新的空对象

（2）设置原型，将对象的原型设置为函数的 prototype 对象。

（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）

（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数);
```

---

### promise.race

Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
```js
const p = Promise.race([p1, p2, p3]);
```
该方法的参数是 Promise 实例数组, 然后其 then 注册的回调方法是数组中的某一个 Promise 的状态变为 fulfilled 的时候就执行

手动实现：
```js
Promise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject)
    }
  })
}

```

---

### async

async 函数是什么？一句话，它就是 Generator 函数的语法糖。

async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await

async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

返回值是 Promise。

async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

```js
# async也可以理解为是promimse的语法糖
async function foo() {
    let num = Math.random()
    console.log(num)
    if(num < 0.5){
        return "num < 0.5"
    }else {
        return "num >= 0.5"
    }
}

function goo(){
    return new Promise(resolve => {
        let num = Math.random()
        console.log(num)
        if(num < 0.5){
            resolve("num < 0.5")
        }else {
            resolve("num > 0.5")
        }
    })
}

foo().then((res)=>{
    console.log(res)
})
```
上面代码中，函数foo内部return命令返回的值，会被then方法回调函数接收到。

async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

如果有多个await命令，可以统一放在try...catch结构中。
```js
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
```
---

### 函数柯里化（curry）

函数柯里化（curry）是函数式编程里面的概念。curry的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

简单点来说就是：每次调用函数时，它只接受一部分参数，并返回一个函数，直到传递所有参数为止。

比如**add(1)(2)(3)**

我们可以自己先尝试写一个add(1)(2)(3)
```js
const add = x => y => z => x + y + z;
console.log(add(1)(2)(3));
```

但如果要求支持呢？
```js
add(1, 2, 3);
add(1, 2)(3);
add(1)(2, 3);
```

改进思路是什么呢，要判断当前传入函数的参数个数 (args.length) 是否大于等于原函数所需参数个数 (fn.length) ，如果是，则执行当前函数；如果是小于，则返回一个函数。

```js
const curry = (fn, ...args) => 
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
    : (..._args) => curry(fn, ...args, ..._args);

function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));
```

Ramda 中的函数所有都支持柯里化。也就是说，所有的多参数函数，默认都可以使用单参数函数。

还是举上面的例子
```js
const addThreeNumbers = (x, y, z) => x + y + z;
const curriedAddaddThreeNumbers = R.curry(addThreeNumbers);
const f = curriedAddaddThreeNumbers(1, 2);
console.log(f(3));
```

**柯里化有什么作用**

主要有3个作用： 参数复用、提前返回和 延迟执行

我们来简单的解释一下: 参数复用：拿上面 f这个函数举例，只要传入一个参数 z，执行，计算结果就是 1 + 2 + z 的结果，1 和 2 这两个参数就直接可以复用了。

提前返回 和 延迟执行 也很好理解，因为每次调用函数时，它只接受一部分参数，并返回一个函数（提前返回），直到(延迟执行)传递所有参数为止。

---

### 前端路由的两种模式：hash模式和 history模式

路由需要实现三个功能：

* 当浏览器地址变化时，切换页面；

* 点击浏览器【后退】、【前进】按钮，网页内容跟随变化；
* 刷新浏览器，网页加载当前路由对应内容；
在单页面web网页中, 单纯的浏览器地址改变, 网页不会重载，如单纯的hash网址改变网页不会变化，因此我们的路由主要是通过监听事件，并利用js实现动态改变网页内容，有两种实现方式：

hash模式：监听浏览器地址hash值变化，执行相应的js切换网页；

history模式：利用history API实现url地址改变，网页内容改变；

它们的区别最明显的就是hash会在浏览器地址后面增加#号，而history可以自定义地址。

使用window.location.hash属性及窗口的onhashchange事件，可以实现监听浏览器地址hash值变化，执行相应的js切换网页。下面具体介绍几个使用过程中必须理解的要点：

* hash指的是地址中#号以及后面的字符，也称为散列值。hash也称作锚点，本身是用来做页面跳转定位的。如http://localhost/index.html#abc，这里的#abc就是hash；
* 散列值是不会随请求发送到服务器端的，所以改变hash，不会重新加载页面；
* 监听 window 的 hashchange 事件，当散列值改变时，可以通过 location.hash 来获取和设置hash值；
* location.hash值的变化会直接反应到浏览器地址栏；

```js
//设置 url 的 hash，会在当前url后加上'#abc'
window.location.hash='abc';
let hash = window.location.hash //'#abc'

window.addEventListener('hashchange',function(){
	//监听hash变化，点击浏览器的前进后退会触发
})


```

history模式概述
* window.history 属性指向 History 对象，它表示当前窗口的浏览历史。当发生改变时，只会改变页面的路径，不会刷新页面。
* History 对象保存了当前窗口访问过的所有页面网址。通过 history.length 可以得出当前窗口一共访问过几个网址。
* 由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航。
* 浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作。

History 对象主要有两个属性。

* History.length：当前窗口访问过的网址数量（包括当前网页）

* History.state：History 堆栈最上层的状态值（详见下文）

---

### jsx

JSX是一种JavaScript的语法扩展，全称JavaScript XML，运用于React架构中，其格式比较像是模版语言，但事实上完全是在JavaScript内部实现的。元素是构成React应用的最小单位，JSX就是用来声明React当中的元素，React使用JSX来描述用户界面，能让我们可以在JS中写html标记语言。

---

### ajax

AJAX 的核心是XMLHttpRequest对象（可在客户端脚本语言（如 javascript）中使用）。 XMLHttpRequest对象用于与后台的服务器交换数据。 所有现代浏览器（IE7+，Firefox，Chrome，Safari 和 Opera）都具有内置的XMLHttpRequest对象。

```js
var xhr =new XHMHttpRequest();
xhr.open('get',url);
xhr.responseType='json';
xhr.onload=function(){
    console.log(xhr.response);
};
xhr.onerror=function(){
    console.log('something wrong')
};
xhr.send();
```

**XMLHttpRequest方法**


**open(method, url, isAsync, userName, password)**

必须通过打开方法初始化XMLHttpRequest对象的 HTTP 和 HTTPS 请求。 此方法指定请求的类型（GET，POST 等），URL，以及是否应异步处理请求。 我将在下一部分中介绍第三个参数。

第四个和第五个参数分别是用户名和密码。 如果服务器需要此参数，则可以提供这些参数或仅提供用户名以进行身份​​验证和授权。

```js
xmlhttp.open("GET","report_data.xml",true);
xmlhttp.open("GET","sensitive_data.xml",false);
xmlhttp.open("POST","saveData",true,"myUserName","somePassord");
```

setRequestHeader(name, value)

成功初始化请求后，可以调用XMLHttpRequest对象的setRequestHeader方法来发送带有请求的 HTTP 标头。

示例：
```js
//Tells server that this call is made for ajax purposes.
xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  
```

**send(payload)**

要发送 HTTP 请求，必须调用XMLHttpRequest的send方法。 此方法接受单个参数，该参数包含要与请求一起发送的内容。
在 POST 请求中，该内容是必需的。 对于 GET 方法，隐式传递null作为参数。

示例：
```js
xmlhttp.send(null); //Request with no data in request body; Mostly used in GET requests.
xmlhttp.send( {"id":"23423"} ); //Request with data in request body; Mostly used in POST/ PUT requests.

```

**abort()**

如果XMLHttpRequest对象的readyState尚未变为 4 （请求完成），则此方法将中止请求。 abort方法确保回调方法不会在异步请求中被调用。

语法：
```js
//Abort the processing
xmlhttp.abort();
```
除上述方法外，onreadystatechange事件监听器非常重要，我们将在下一部分中进行讨论。

**同步和异步 ajax 请求**

XMLHttpRequest对象能够根据网页中的要求发送同步和异步请求。 该行为由打开方法的第三个参数控制。 对于异步请求，此参数设置为true，对于同步请求，此参数设置为false。
```js
xmlhttp.open("GET", "report_data.xml", true); //Asynchrnonos request as third parameter is true
xmlhttp.open("GET", "report_data.xml", false); Synchrnonos request as third parameter is false
```

如果未提供，则此参数的默认值为“true”。

异步 Ajax 请求不会阻止网页，并且在服务器上处理请求时，用户可以继续与页面上的其他元素进行交互。 您应该始终使用异步 Ajax 请求，因为同步 Ajax 请求会使 UI（浏览器）无响应。 这意味着在请求完成之前，用户将无法与网页进行交互。

**onreadystatechange事件**

在上面的示例中，onreadystatechange是向XMLHttpRequest请求注册的事件监听器。 onreadystatechange存储一个函数，该函数将处理从服务器返回的响应。 在请求的生命周期中，所有重要事件都将被调用。 每次在请求处理中完成一个步骤时，readyState的值都会更改并设置为其他值。 让我们看一下可能的值：

0：未初始化请求

1：建立服务器连接

2：接收请求

3：处理请求

4：请求已完成，响应已准备就绪

**处理来自服务器的响应**

要从服务器获取响应，请使用XMLHttpRequest 对象的responseText或responseXML属性。 如果来自服务器的响应是 XML，并且您要将其解析为 XML 对象，请使用responseXML属性。 如果来自服务器的响应不是 XML，请使用responseText属性。

responseText：从服务器获取响应作为字符串

responseXML：从服务器获取 XML 响应

---

### fetch

Fetch完成请求
```js
fetch(url).then(function(response){
    return response.json();
}).then(function(jsonData){
    console.log(jsonData);
}).catch(function(){
    console.log('something wrong');
```

**fetch和ajax的区别**

fetch和XHR都是是获取远端数据的方式，fetch返回的是一个promise对象

fetch是原生js方法，没有使用XMLHttpRequest对象，使用fetch可以不用引用http的类库即可实现。提供了一种简单，合理的方式来跨网络异步获取资源。

（XHR）是一个构造函数，对象用于与服务器交互。通过 XHR可以在不刷新页面的情况下请求特定 URL。即允许网页在不影响用户操作的情况下，更新页面的局部内容。可以用于获取任何类型的数据。

当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve（如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false），仅当网络故障时或请求被阻止时，才会标记为 reject。

fetch 不会发送跨域 cookie，除非你使用了 credentials 的初始化选项。（自 2018 年 8 月以后，默认的 credentials 政策变更为 same-origin。Firefox 也在 61.0b13 版本中进行了修改）

---