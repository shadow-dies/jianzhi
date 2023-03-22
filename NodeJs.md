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