## nodejs简介

1、构建在chrome浏览器v8引擎上的一个运行环境

2、非阻塞I/O模型

3、事件驱动

4、以最少的硬件成本，追求更高的并发，更高的处理性能

nodejs内部总共分为三层：应用层（js）、桥（c/c++）、底层库（c/c++）：

应用层：就是我们的一个标准库，这一层是使用js写的，这里面提供了我们能直接进行调用并使用的一些api，比如：fs、steam、http等等，

桥：Node bindings这一层的作用就是，让我们应用层能够调取node底层的c/c++这一层，充当一个桥的作用。

底层库：底层库使用c/c++编写的，大致工作流程就是，nodejs会通过Node bindings将我们的js传给底层库的v8进行解析，然后通过libuv这个库进行循环调度最后再返回给我们的上层，nodejs它的高效的异步编程，很大程度上就是依靠我们这个libuv，因为libuv为nodejs提供了很多的池，比如说：线程池、事件池、异步I/O等等。也为nodejs提供了很多其他模块。比如C-ares，提供异步DNS解析等等。

### 非阻塞I/O

传统的I/O
>传统单线程I/O会阻塞代码的进行

非阻塞：当业务1遇到I/O被阻塞时，会马上开始业务2的计算，业务1的I/O结束后通过回调继续业务1的计算，保证了CPU的占用率。

在非阻塞模式下这个线程永远在计算，CPU占用率为100%。

### 事件循环机制

**用户通过网络请求过来的时候：**

node会把他放在一个维护的事件队列(Event Querue)中，这时候node内部不会去立马执行它，而是继续往队列下面走，直到主线程执行完过后，再通过循环机制(Event loop)进行一个判断，如果判断是非I/O的任务，就会亲自执行并通过回调函数(Callback)返回到上层(Response)进行调用。

**用户通过I/O请求过来的时候：**

开始和上面一样，到loop这里的时候就会进行一个判断，如果是I/O任务，就会使用libuv这个库的线程池，分配一个线程出来，来处理这个事件，然后通过Callback将处理的这个事件放在我们的这个事件队列的尾部，当事件队列轮询到这个事件的时候，就会亲自处理，并通过回调函数，返回给我们的上层（Response）

### 优点

I/O密集型的处理时node的强项，因为node处理I/O请求都是异步的，比如（sql查询请求、文件操作流、http请求等等）

不擅长cpu密集处理型，比如：
```js
for(let i=0; i<10000000; i++){
	console.log(i)
}
```
毕竟Nodejs是单线程，计算量过大会阻塞程序造成卡顿。

## Koa

### 洋葱模型

先看一段示例代码
```js
let Koa = require('koa');
let app = new Koa();
app.use(async (ctx,next)=>{
    console.log(1);
   await next();
    console.log(2);
});
app.use(async (ctx,next)=>{
    console.log(3);
   await next();
    console.log(4);
});
app.listen("3000");
```
输出：
```
1
3
4
2
```
* 中间件的执行很像一个洋葱，但并不是一层一层的执行，而是以next为分界，先执行本层中next以前的部分，当下一层中间件执行完后，再执行本层next以后的部分。
* 一个洋葱结构，从上往下一层一层进来，再从下往上一层一层回去,是不是有点感觉了。

通过洋葱模型，我们可以将多个中间件之间的通信变得简单可行和简单。

### 中间件

**koa-router**

koa-router基础写法
```js
let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router = new Router();
router.get('/',async (ctx,next)=>{
    ctx.body = 'hello people';
    await next()
});
router.get('/list',async (ctx,next)=>{
    ctx.body = 'list';
});
app.use(router.routes()); // 挂载
app.use(router.allowedMethods());//当请求数据的方法与设置的方法不一致，会报错。比如默认get请求获取，用post发请求会报错
app.listen(3000);
```

**koa-router中嵌套路由写法**
>假如我们想为单个页面设置层级，/home是我们首页，再次基础上有/home/list 首页列表页 /home/todo 首页todo页。这时我们就需要用到嵌套路由，看看怎么用
```js
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
//home的路由
let home = new Router();
home.get('/list',async(ctx)=>{
    ctx.body="Home list";
}).get('/todo',async(ctx)=>{
    ctx.body ='Home ToDo';
});
//page的路由
let page = new Router();
page.get('/list',async(ctx)=>{
    ctx.body="Page list";
}).get('/todo',async(ctx)=>{
    ctx.body ='Page todo';
});
//装载所有子路由
let router = new Router();
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());
//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
```

**koa-router参数的传递**

1、通过/arcicle/id/name传参
```js
let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router = new Router();
//实现  /arcicle/id/name形式的传参
router.get('/acticle/:id/:name',(ctx,next)=>{
    ctx.body = ctx.params.id +"-"+ ctx.params.name;
});
app.use(router.routes());
app.listen(3000);
```
2、通过/arcicle?id=1&name=cgp传参
```js
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
router.get('/article', function (ctx, next) {
    ctx.body=ctx.query; //query方法实现json形式
});
app.use(router.routes())
app.listen(3000,()=>{
    console.log('starting at port 3000');
});
```

**koa-bodyparse**

用来解析请求体的中间件，比如获取post提交的表单数据，通过koa-bodyparse解析后就能获取到数据。看demo
```js
let Koa = require('koa');
let bodyParser = require('koa-bod')
let app = new Koa();
app.use(bodyParser()); // 解析请求体的中间件
app.use(async (ctx, next) => {
    if (ctx.path === '/' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8');
        ctx.body = `
        <form action="/" method="post">
            <input type="text" name="username" >
            <input type="text" name="password" >
            <input type="submit" >
        </form>
        `
    }
});
app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/') {
        // 获取表单提交过来的数据
        ctx.body = ctx.request.body;
    }
});
app.listen(3000);
```

**koa-better-body中间件**

是用来上传文件的中间件

由于老的中间件都是基于koa1版本的generate函数实现的，在koa2中我们需要用koa-convert，可以将他们转为基于Promise的中间件供Koa2使用

>来个demo体验下，我们把本地的1.txt文件上传到upload文件夹中。 1.txt内容为123456789
```js
let Koa = require('koa');
let app = new Koa();
let betterBody = require('koa-better-body'); // v1插件 
let convert = require('koa-convert'); // 将1.0的中间件 转化成2.0中间件
app.use(convert(betterBody({
    uploadDir: __dirname //指定上传的目录 __dirname当前文件夹绝对路径
})))
app.use(async (ctx, next) => {
    if (ctx.path === '/' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8');
        ctx.body = `
        <form action="/" method="post" enctype="multipart/form-data">
            <input type="text" name="username" autoComplete="off">
            <input type="text" name="password" autoComplete="off">
            <input type="file" name="avatar">
            <input type="submit" >
        </form>
        `
    } else {
        return next();
    }
});
app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/') {
        // 获取表单提交过来的数据
        ctx.body = ctx.request.fields;
    }
});
app.listen(1000);
```

### koa 和 express的比较

* express的路由处理时集成的，而koa需要引入中间件。

* express的中间件为线性，而koa的中间件为洋葱模型

* 错误捕捉，express沿用NodeJs的Error-First模式（第一个参数为error对象），koa因为返回的是promise对象，使用try/catch来捕获错误

* 异步实现：express通过回调来实现，koa通过async/await来实现。

* 响应机制：express为立即响应（res.json/res.send），上层不能定义其他处理.但koa为中间件执行完后才响应(ctx.body = xxx),每一层都可以对响应进行自己的处理.