## React

### hook （钩子函数）

什么是Hooks?

首先：React的组件创建方式，一种是类组件，一种是纯函数组件。

React团队认为组件的最佳写法应该是函数，而不是类。

但是纯函数组件有着类组件不具备的特点：

* 纯函数组件没有状态
* 纯函数组件没有生命周期
* 纯函数组件没有this
这就注定，纯函数组件只能做UI展示的功能，如果涉及到状态的管理与切换，我们就必须得用类组件或者redux，但是在简单的页面中使用类组件或者redux会使代码显得很重。

因此，React团队设计了React hooks（钩子）。

React Hooks的意思是：组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码“钩”进来。

四种常用的钩子：
```js
useState()
useReducer()
useContext()
useEffect()
useRef()
```

**UseState()**

我们知道，纯函数组件没有状态，useState()用于为函数组件引入状态。

**useReducer()**

useState() 的替代方案，用于包含多种状态，或者下一个 state 依赖于之前的 state，实现函数组件的状态管理。

基本原理是通过用户在页面中发起action, 从而通过reducer方法来改变state, 从而实现页面和状态的通信。

点击加1，点击减1
```js
//实现点击改变状态
import React,{useReducer} from 'react'
import './App.css';
function App(){
  
  //useReducer(),state表示状态，action表示相关操作
  const reducer = (state,action)=>{
    if (action.type === 'add') {
      return {
          ...state,
          count: state.count + 1,
      }
    }else if (action.type === 'jian') {
      return {
          ...state,
          count: state.count - 1,
      }
    } else {
      return state
    } 
  }
 
  const addCount=()=>{
    dispatch({
      type:'add'
    })
  }
  const min=()=>{
    dispatch({
      type:'jian'
    })
  }
  const [state,dispatch] = useReducer(reducer,{count:0})
  return(
    <div>
      <div>{state.count}</div>
      <button onClick={addCount}>点击加1</button>
      <button onClick={min}>点击减1</button>
    </div>
  )
}
export default App;
```

**useContext()**

useContext()用于在组件之间共享状态，而不必显式地通过组件树的逐层传递 props。

实现步骤：

1.使用createContext创建Context对象

2.在顶层组件通过provider提供数据

3.在底层组件通过useContext函数获取数据
```js
//引入状态钩子useState()
import React,{useContext} from 'react'
import './App.css';
function App(){
    //通过createContext来创建上下文
    const AppContext = React.createContext()

    const Achild = ()=>{
        //在子组件中通过useContext来获取数据
        const {name1} = useContext(AppContext)
        return(
            <div>
                这是组件A,使用的name值是:{name1}
            </div>
        )
    }
    
    const Bchild = ()=>{
        //在子组件中通过useContext（Context句柄）来获取数据
        const {name2} = useContext(AppContext)
        return(
            <div>
                这是组件B,使用的name值是:{name2}
            </div>
        )
    }
    return (
            //AppContext.Provider数据共享组件,来确定共享范围,通过value来分发内容
          <AppContext.Provider value={{name1:'jack',name2:'Bob'}}>
              <Achild></Achild>
              <Bchild></Bchild>
          </AppContext.Provider>
        );
}
export default App;
```

**useEffect()**

useEffect()可以检测数据更新 。，可以用来更好的处理副作用，比如异步请求等。

useEffect()接受两个参数，第一个参数是你要进行的异步操作，第二个参数是一个数组，用来给出Effect()的依赖项。

只要数组发生改变，useEffect()就会执行。

当第二项省略不填时，useEffect()会在每次组件渲染时执行，这一点类似于componentDidMount。

>useEffect回调在dom渲染完毕之后执行 和vue里边的Watch效果比较像，但是执行时机是不同的 watch一开始就执行了

举例：

第二个参数省略时：
```js
import React,{useState,useEffect} from 'react'
import './App.css';
function App(){
  const [loading,setLoading] = useState(true)
  //相当于componentDidMount
  //useEffect()第二个参数未填
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },3000)
  })
  //loadling为true时显示Loading... 3秒后loading变成了false,显示内容加载完毕
  return (
    loading?<div>Loading</div>:<div>内容加载完毕</div>
  )
}
export default App;
```
useEffect()返回一个函数：

当useEffect()返回一个函数时，该函数会在组件卸载时执行。

举例：

当点击switch时，组件被卸载，定时器被清除，控制台不再打印。
```js
import React,{useEffect,useState} from 'react'
import './App.css';

function Test (){
  useEffect(()=>{
    let timer = setInterval(()=>{
      console.log('定时器正在执行')
    },1000)
    return ()=>{
      //清除定时器
      clearInterval(timer)
    }
  },[])
  return(
    <div>this is test</div>
  )
}

function App(){
  const [flag,setFlag] = useState(true)
  return (
    <div>
      {flag?<Test/>:null}
      <button onClick={()=>{setFlag(false)}}>switch</button>
    </div>
  )
}

export default App;
```

**useRef()**

用于在函数组件中获取真实的DOM元素对象或者是组件实例。（因为函数组件没有实例，所以这里的获取组件实例指的是获取类组件实例）

使用步骤：

1.导入useRef()函数

2.执行useRef()函数并传入null，返回值为一个对象，内部有一个current属性存放拿到的dom对象（组件实例）

3.通过ref绑定要获取的元素或者组件实例。

举例：

获取dom和组件实例，可以看到结果在控制台打印了出来
```js
import React,{useEffect, useRef} from 'react'
import './App.css';

//组件实例 类组件（函数组件没有实例）
//dom对象 标签

class Test extends React.Component{
  render(){
    return (
      <div>我是类组件</div>
    )
  }
}

function App(){
  const testRef = useRef(null)
  const h1Ref = useRef(null)
  //useEffect回调在dom渲染完毕之后执行
  //和vue里边的Watch效果比较像，但是执行时机是不同的 watch一开始就执行了
  useEffect(()=>{
    console.log(testRef.current)
    console.log(h1Ref.current)
  },[])
  return(
    <div>
      {/* 获取类组件实例 */}
      <Test ref={testRef}/>
      {/* 获取DOM对象 */}
      <h1 ref={h1Ref}>this is h1</h1>
    </div>
  )
}
export default App;
```

**自定义钩子函数**

根据自己的业务需求，自行封装一个钩子函数以供自己使用。

举例：自定义一个获取表单数据的钩子函数
```js
import React,{useState} from 'react'
import './App.css';


// 自定义hook(use开头)
// 重用受控表单创建state和onChange方法逻辑
/**
 * 
 * @param {string | number} initialValue 初始默认值
 * @returns 
 */
//获取表单数据
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    onChange: e => setValue(e.target.value)
  }
}

// 表单组件
const  App = () => {

  const username = useInput('admin')

  const password = useInput('')

  const onSubmit = (e) => {
    //阻止默认事件发生
    e.preventDefault()
    // 获取表单值
    console.log(username.value, password.value);
  }

  return (
    <form onSubmit={onSubmit} >
      <input type="text" {...username} />
      <input type="password" {...password} />
      <button type="submit">提交</button>
    </form>
  );
}
export default App;
```

**React Hooks中可以对性能进行优化的函数**

**useMemo()**

具有缓存作用，有助于避免在每次渲染时都进行高开销的计算。

用于优化代码

当组件发生更新时，组件一定会被重新渲染，并且担当引入子组件时，子组件不发生变化也会重新渲染组件，因此会造成性能的浪费，于是引入了memo插件

memo包裹组件并返回包装后的组件，子组件内部数据没有改变就不会进行渲染

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
把创建函数和依赖项数组作为参数传入useMemo，当某个依赖改变时才会重新执行useMemo()函数。

如果没有提供依赖项数组，useMemo()每次渲染时都会重新执行useMemo()函数。

举例：
useMemo()监听count的值，当count的值改变时，newValue会更新。
```js
import { useState, useMemo} from 'react';

export default () => {
    const  [count, setCount] = useState(0)
    const [num, setNum] = useState(0)
    const newValue = useMemo(()=>{
        console.log(`count 值为${count}`)
        console.log(`num 值为 ${num}`)
        return count+num
    },[count])
    return(
        <div>
            <h1>{count}</h1> 
            <button onClick={()=>{setCount(count+1)}}>count + 1</button>
            <hr/>
            <h1>{num}</h1> 
            <button onClick={()=>{setNum(num+1)}}>Num + 1</button>
            <hr/>
            <h2>{newValue}</h2>
        </div>
    )
}
```
点击5次num+1，num变为5，虽然newValue仍然为0，但是num=5已经被缓存了；点击count+1，他会计算count此时的值1与num缓存的值5的和，最终结果newValue为6。

**useCallback()**

useCallback 可以说是 useMemo 的语法糖，能用 useCallback 实现的，都可以使用 useMemo, 常用于react的性能优化

与useMemo()一样，依赖数组改变时才会重新执行useCallback()函数。

如果没有依赖数组，每次渲染都会重新执行useCallback()函数。
```js
const memoizedCallback = useCallback(() => {doSomething(a, b)},[a, b]);
```
举例：

和上述useMemo()的效果一样，区别是useCallback()调用newValue时是：newValue()
```js
import React,{ useState, useCallback} from 'react';

function App(){
  const  [count, setCount] = useState(0)
    const [num, setNum] = useState(0)
    const newValue = useCallback(()=>{
        console.log(`count 值为${count}`)
        console.log(`num 值为 ${num}`)
        return count+num;
    },[count])
    
    return(
        <div>
            <h1>{count}</h1> 
            <button onClick={()=>{setCount(count+1)}}>count + 1</button>
            <hr/>
            <h1>{num}</h1> 
            <button onClick={()=>{setNum(num+1)}}>Num + 1</button>
            <hr/>
            {/* 调用useCallback 返回的值 */}
            <h2>{newValue()}</h2>
        </div>
    )
}
export default App;
```

**useMemo()和useCallback()的区别**
```
useMemo()返回缓存的变量（memoized)

useCallback()返回缓存的函数
```
### 生命周期

react有三个生命周期

挂载
>组件实例被创建并插入DOM

更新
>prop或者state有更新

更新需要所有组件didmount后才能进入，更新状态的生命周期

卸载
>组件实例被卸载

---
### 合成事件

原生事件: 在 componentDidMount生命周期里边进行addEventListener绑定的事件

合成事件: 通过 JSX 方式绑定的事件，比如 onClick={() => this.handle()}

在 React 17 中，React 将不再向 document 附加事件处理器。而会将事件处理器附加到渲染 React 树的根 DOM 容器中

---


### useEffect

useEffect使用时有以下4种情况:

**1、不传递**

useEffect不传递第二个参数会导致每次渲染都会运行useEffect。然后，当它运行时，它获取数据并更新状态。然后，一旦状态更新，组件将重新呈现，这将再次触发useEffect，这就是问题所在。
```js
useEffect(()=>{undefined
console.log(props.number)
setNumber(props.number)
}) //所有更新都执行
```
**2、传递空数组**
```js
useEffect(()=>{undefined
console.log(props)
},[]) //仅在挂载和卸载的时候执行
```
**3、传递一个值**
```js
useEffect(()=>{undefined
console.log(count)
},[count]) //count更新时执行
```
**4、传递多个**
```js
const Asynchronous : React.FC=({number})=>{undefined
const [number2,setNumber2] = useState(number);
useEffect(()=>{undefined
console.log(number)
setNumber2(number)
},[number,setNumber2]) //监听props对象number的更改
//setNumber2是useState返回的setter，所以不会在每次渲染时重新创建它，因此effect只会运行一次
}
```

**5、return 方法**
```js
const timer = setInterval(() => {undefined
setCount(count + 1)
}, 1000)
// useEffect方法的第一个参数是一个函数，函数可以return一个方法，这个方法就是在组件销毁的时候会被调用
useEffect(() => {undefined
return () => {undefined
clearInterval(timer)
}
}, [])
```
---

### setState
* 1.调用setState不会立即更新
* 2.所有组件使用的是同一套更新机制，当所有组件didmount后，父组件didmount，然后执行更新
* 3.更新时会把每个组件的更新合并，每个组件只会触发一次更新的生命周期。

异步函数和原生事件中的setstate,在setTimeout中调用setState,同步更新.

执行流程
>* 1.将setState传入的partialState参数存储在当前组件实例的state暂存队列中。
>* 2.判断当前React是否处于批量更新状态，如果是，将当前组件加入待更新的组件队列中。
>* 3.如果未处于批量更新状态，将批量更新状态标识设置为true，用事务再次调用前一步方法，保证当前组件加入到了待更新组件队列中。
>* 4.调用事务的waper方法，遍历待更新组件队列依次执行更新。
>* 5.执行生命周期componentWillReceiveProps。
>* 6.将组件的state暂存队列中的state进行合并，获得最终要更新的state对象，并将队列置为空。
>* 7.执行生命周期componentShouldUpdate，根据返回值判断是否要继续更新。
>* 8.执行生命周期componentWillUpdate。
>* 9.执行真正的更新，render。
>* 10.执行生命周期componentDidUpdate。

---

### diff算法

虚拟DOM对比时，只会同层比较，不会跨层级比较

虚拟Dom的结构为多叉树，的diff算法分为两步，
* 首先是从上到下，从左往右遍历对象，也就是dfs，这一步会给每个节点添加索引，方便后续的渲染差异
* 一旦节点有子元素，就去判断子元素是否有不同
  
diff对比的流程：

当数据改变时，会触发setter，并通过Dep.notify通知所有的订阅者watcher，订阅者就会调用patch方法，给真是的DOM打补丁，更新相应的视图。

**patch方法**

这个方法的作用就是，对比当前同层的虚拟节点是否为同一种类型标签

* 是：继续执行patchVnode方法进行深层对比
* 否：没必要对比了，直接整个节点替换成新的虚拟节点

sameVnode方法

patch关键的一步就是sameVnode方法来判断是否为同一类型节点，

什么是同一类型节点

咱们来看看sameVnode方法的核心原理代码，就一目了然了
```js
function sameVnode(oldVnode, newVnode) {
  return (
    oldVnode.key === newVnode.key && // key值是否一样
    oldVnode.tagName === newVnode.tagName && // 标签名是否一样
    oldVnode.isComment === newVnode.isComment && // 是否都为注释节点
    isDef(oldVnode.data) === isDef(newVnode.data) && // 是否都定义了data
    sameInputType(oldVnode, newVnode) // 当标签为input时，type必须是否相同
  )
}
```

**patchVnode方法**

这个函数做了以下事情：

* 找到对应的真实DOM，称为el
* 判断newVnode和oldVnode是否指向同一个对象，如果是，那么直接return
* 如果他们都有文本节点并且不相等，那么将el的文本节点设置为newVnode的文本节点。
* 如果oldVnode有子节点而newVnode没有，则删除el的子节点
* 如果oldVnode没有子节点而newVnode有，则将newVnode的子节点真实化之后添加到el
* 如果两者都有子节点，则执行updateChildren函数比较子节点，这一步很重要


---

### virtural dom



优点
* 处理了浏览器的兼容，避免用户直接操作真实DOM

* 内容经过了XSS处理，可以防范XSS攻击

* 更容易实现跨平台

* 差异化更新，减少Dom更新次数

缺点

* 虚拟Dom挂载在内存中，消耗了额外内存

* 有时候不一定快（首次渲染）

---

### refs

官方文档对Refs的描述是：
>Refs提供了一种方式，允许我们访问DOM节点或在render方法中创建的React元素。

**何时使用Refs**

1、管理焦点，文本选择或媒体播放。

2、触发强制动画。

3、集成第三方DOM库。

也就是说，在React无法控制局面的时候就需要直接操作Refs了。


**Refs有哪些使用方式**

1、字符串形式的refs。（可能在以后的版本中弃用）

2、回调形式的refs。

3、使用React.createRef()创建，并通过ref属性附加到React元素。

字符串形式的refs

字符串形式的ref 存在效率问题，不太推荐使用，可能在未来的版本中移除。

写个简单例子，点击按钮打印input中输入的值。

```js
class Demo extends Component{
    constructor(props){
        super(props)
    }
    showData=()=>{
       console.log(this.refs.input1)//拿到标签为input1的真实DOM
       console.log(this.refs.input1.value)
    }
    render(){
        return(
            <div>
                <input ref='input1' type="text" placeholder='点击按钮提示数据'/>&nbsp;
                <button onClick={this.showData}>点我提示左侧数据</button>
            </div>
        )
    }
}
```

回调形式的refs

React 也支持另一种设置 refs 的方式，也就是回调形式的refs。它能使我们更加容易并且精细的控制refs的设置和解除。

在ref中，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。

写个简单例子，同样是点击按钮打印input中输入的值。

```js
class Demo extends Component{
    constructor(props){
        super(props)
    }
    showData=()=>{
       console.log(this.input1)//ref中的回调函数将自身节点放在了组件节点自身上，取名为input1
       console.log(this.input1.value)
    }
    render(){
        return(
            <div>
                <input ref={(currentNode)=>{this.input1=currentNode}} type="text" placeholder='点击按钮提示数据'></input>&nbsp;
                <button onClick={this.showData}>点我提示左侧数据</button>
            </div>
        )
    }
}
```

createRef的使用

createRef 是 **React v16.3 ** 新增的API，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。

Refs 通常在 React 组件的构造函数中定义，或者作为函数组件顶层的变量定义，然后附加到 render() 函数中的元素。

同样是点击按钮打印input中输入值的例子。
```js
class Demo extends Component{
    constructor(props){
        super(props)
        // React.creatRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点
        this.myRef=React.createRef()
    }
    showData=()=>{
       console.log(this.myRef)//输出myRef容器
       console.log(this.myRef.current)//输出input节点
       console.log(this.myRef.current.value)//输出input中的值
    }
    render(){ 
        return(
            <div>
                <input ref={this.myRef} type="text" placeholder='点击按钮提示数据'></input>&nbsp;
                <button onClick={this.showData}>点我提示左侧数据</button>
            </div>
        )
    }
```

---

