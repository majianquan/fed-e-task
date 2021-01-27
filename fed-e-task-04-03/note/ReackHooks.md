## Hooks使用

### useState

- 惰性初始化 state：

如果initialState的值是要通过一些计算得到，那么我们更希望将这个计算过程放在惰性初始化的过程之中

```javascript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

虽然我们可以像如下这样，来达到相同的效果，但是`someExpensiveComputation(props)`会在组件每一次render时，都会执行一遍（虽然这个值只在useState初始化时使用）。采用下面的写法，`someExpensiveComputation`函数只会在初始化渲染中被调用，后续渲染时会被忽略

```javascript
const initialState = someExpensiveComputation(props); 
const [state, setState] = useState(initialState);
```

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将回调函数当做参数传递给 setState。该回调函数将接收先前的 state，并返回一个更新后的值。

```javascript
setNumber(number=>number+1);
```

> 注：Hook 内部使用 Object.is 来比较新/旧 state 是否相等

### useEffect

默认情况下，它在第一次渲染之后和每次更新之后都会执行。 如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

**componentDidMounted**

```javascript
useEffect(() => void, []);
```

**componentWillUnmount**

```javascript
useEffect(() => fn, []);
```

**componentDidUpdate**

```javascript
useEffect(() => {
  
}, [dev1]);
```

由于useEffect第一个参数要么返回void要么返回一个回调函数，所以当我们想在useEffect中使用async/await时，需要如下:

```javascript
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );
    setData(result.data);
  };

  fetchData();
}, []);
```

### useReducer

当组件同时使用多个useState方法时，需要一个一个的声明。状态多了，就一大溜的声明。比如：

```javascript
const Avatar = ({ user, setUser }) => {
 const [user, setUser] = useState("崔然");
 const [age, setAge] = useState("18");
 const [gender, setGender] = useState("女");
 const [city, setCity] = useState("北京");
 // more ...
};
```

我们可以通过使用useReducer来解决这个问题。useReducer实际是useState 的一个变种，解决了上述多个状态，需要多次使用 useState 的问题。

**useReducer使用**

```javascript
const initialState = {number: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {number: state.number + 1};
    case 'decrement':
      return {number: state.number - 1};
    default:
      throw new Error();
  }
}

function Counter(){
    const [state, dispatch] = useReducer(reducer,initialState);
    
    return (
        <>
          Count: {state.number}
          <button onClick={() => dispatch({type: 'increment'})}>+</button>
          <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    )
}
```

**useReducer内部实现**

```javascript
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

> React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch。

### useContext

Context主要应用场景在于很多不同层级的组件需要访问同样一些的数据，例如theme，userInfo等等

当我们在使用react，有时候会需要使用全局状态用来解决状态跨层级传递的问题。之前我们可以通过react的context来实现。在Hooks中全局状态还是利用React 提供的Context上下文来实现跨层级数据传递，但是在全局中的状态是比较多的，我们这个时候就使用useReducer来进行状态的管理更新。我们把reducer中的state和dispatch通过Provider的value值传递下去。那么在每一个使用的customer中都可以拿到state和更改state的dispatch方法。useReducer是一个状态管理的实现，而useContext用来解决跨组件跨层级的问题 所以两个可以配合使用

```javascript
const CounterContext = React.createContext();

function SubCounter(){
    const {state, dispatch} = useContext(CounterContext);
    return (
        <>
            <p>{state.number}</p>
            <button onClick={()=>dispatch({type:'ADD'})}>+</button>
        </>
    )
}

function Counter(){
    const [state, dispatch] = useReducer((reducer), initialState, ()=>({number:initialState}));
    return (
        <CounterContext.Provider value={{state, dispatch}}>
            <SubCounter/>
        </CounterContext.Provider>
    )
}

ReactDOM.render(<Counter  />, document.getElementById('root'));
```

当组件上层最近的 <CounterContext.Provider>的value更新时，该Hook会触发重渲染，并使用最新传递给CounterContext Provider的Context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。

> - useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>
> - useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
> - context实际上就是发布订阅的原理

### useCallback userMemo memo

当我们的父组件因为自身状态改变而重新渲染时，会带动子组件的重新渲染，及时此时子组件的状态并没有发生改变，为了解决子组件的非必要渲染，我们使用memo函数来包装子组件，这样当子组件的props没有发生改变时，及时父组件重新渲染了，子组件也不会重新渲染。

在下面这个demo中，当我们每次点击加1按钮的时候，子组件都会重新渲染，因为父组件重新渲染了。但是实际上子组件的重新渲染是没有必要的。

```javascript
import React, { useState } from 'react';

const Child = (props) => {
    console.log('子组件?')
    return(
        <div>我是一个子组件</div>
    );
}
const Page = (props) => {
    const [count, setCount] = useState(0);
    return (
        <>
            <button onClick={(e) => { setCount(count+1) }}>加1</button>
            <p>count:{count}</p>
            <Child />
        </>
    )
}


export default Page;
```

为了解决上述问题，使用memo包装子组件。

```javascript
import React, { useState, memo } from 'react';

const Child = memo((props) => {
    console.log('子组件?')
    return(
        <div>我是一个子组件</div>
    );
});
```

当我们使用React提供的memo高阶函数包装Child组件，此时父组件重新渲染时，子组件不会跟着重新渲染

**当我们的子组件中有引用类型的props时**

```javascript
const Page = (props) => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Child组件');


    return (
        <>
            <button onClick={(e) => { setCount(count+1) }}>加1</button>
            <p>count:{count}</p>
            <Child name={name} onClick={(newName) => setName(newName)}/>
        </>
    )
}
```

这里我们每点击一次加1按钮，子组件都会执行，这是因为每次加1，父组件肯定是要重新render的，父组件重新render，此时即使使用了memo，但是由于Child组件的onClick属性的值是一个内联引用类型的值，而且每次父组件渲染时，这个引用值肯定会发生了变化的，所以子组件肯定也是会更新的。这时我们需要引入useCallback Hooks函数来解决这个问题。

```javascript
<Child name={name} onClick={useCallback((newName) => setName(newName), [deps])}/>
```

该回调函数仅在某个依赖项改变时才会更新。

> useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

同样如果props是一个普通的引用型变量，当父组件重新渲染的时候，子组件也会重新渲染。

```javascript
<ChildMemo name={{ name}} />
```

这个时候就要用到useMemo Hooks来解决这个问题。使用useMemo，返回一个和原本一样的对象，第二个参数是依赖项，当name发生改变的时候，才产生一个新的对象

```javascript
<Child name={useMemo(()=>({ name }), [name])}/>
```

**useCallback使用场景**

- 在组件内部，那些会成为其他useEffect依赖项的方法，建议用 useCallback 包裹，或者直接编写在引用它的useEffect中  这种情况通常出现在reset等等这些函数，可能还有多个地方调用这个函数。
- 如果你的function会作为props传递给子组件，请一定要使用 useCallback 包裹，对于子组件来说，如果每次render都会导致你传递的函数发生变化，可能会对它造成非常大的困扰。同时也不利于react做渲染优化。

**useMemo使用场景**

- 有些计算开销很大，我们就需要「记住」它的返回值，避免每次render都去重新计算。
- 由于值的引用发生变化，导致下游组件重新渲染，我们也需要「记住」这个值。

### useRef

useRef 返回的 ref 对象在组件的整个生命周期内保持不变，也就是说每次重新渲染函数组件时，返回的ref 对象都是同一个（使用 React.createRef ，每次重新渲染组件都会重新创建 ref）。从概念上讲，你可以认为 refs 就像是一个 class 的实例变量。

useRef不仅仅是用来管理DOM ref的它可以存放任何变量，更改.current属性不会导致重新渲染。

使用场景：

- 我希望一个变量在这个组件中，即使组建重新渲染，这个值也不会变。
- 保存子组件提供的某一个值（可能是一个DOM元素，也可能就是一个普通对象）

```javascript
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom’;

function Child() {
    const inputRef = useRef();
    
    function getFocus() {
        inputRef.current.focus();
    }
    return (
        <>
            <input type="text" ref={inputRef} />
            <button onClick={getFocus}>获得焦点</button>
        </>
    )
}

ReactDOM.render(<Child />, document.getElementById('root'));
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

### forwardRef

因为函数组件没有实例，所以函数组件无法像类组件一样可以接收ref属性，为了使函数组件能够像类组件一样接受ref属性，我们需要使用forwardRef包装函数组件，使函数组件能够接受ref属性，包装之后的组件不会把ref属性当做props传入。

```javascript
function Parent() {
    return (
        <>
         // <Child ref={xxx} /> 这样是不行的
            <Child />
            <button>+</button>
        </>
    )
}
```

这时就要使用forwardRef  forwardRef可以将父组件中的ref对象转发到子组件中的dom元素上，子组件接受 props 和 ref 作为参数

```javascript
function Child(props,ref){
  return (
    <input type="text" ref={ref}/>
  )
}
Child = React.forwardRef(Child);

function Parent(){
  let [number,setNumber] = useState(0); 
  const inputRef = useRef(); //{current:’'}

  function getFocus(){
    inputRef.current.focus();
  }

  return (
      <>
        <Child ref={inputRef}/>
        <button onClick={()=>setNumber({number:number+1})}>+</button>
        <button onClick={getFocus}>获得焦点</button>
      </>
  )
}
```

### useImperativeHandle

有时候我们希望在父组件中执行，子组件提供的某些方法，在类组件中我们可以通过ref获取子组件，然后执行子组件（子组件也为类组件）中的方法，但是在函数组件中，我们无法实现这一点。因为函数组件中没有this，我们无法获取到函数子组件中的方法。这时我们可以使用useImperativeHandle配合forwardRef使用。

> useImperativeHandle这个Hooks会返回一个对象, 该对象会作为父组件 current属性的值

```jsx
import React,{useState,useEffect,createRef,useRef,forwardRef,useImperativeHandle} from 'react';

function Child(props,parentRef){
    // 子组件内部自己创建 ref 
    let focusRef = useRef();
    let inputRef = useRef();
    useImperativeHandle(parentRef,()=>(
      // 这个函数会返回一个对象
      // 该对象会作为父组件 current 属性的值
      // 通过这种方式，父组件可以使用操作子组件中的多个 ref
        return {
            focusRef,
            inputRef,
            name:'计数器',
            focus(){
                focusRef.current.focus();
            },
            changeText(text){
                inputRef.current.value = text;
            }
        }
    });
    return (
        <>
            <input ref={focusRef}/>
            <input ref={inputRef}/>
        </>
    )
}
Child = forwardRef(Child);

function Parent(){
  const parentRef = useRef();//{current:''}
  function getFocus(){
    parentRef.current.focus();
    // 因为子组件中没有定义这个属性，实现了保护，所以这里的代码无效
    parentRef.current.addNumber(666);
    parentRef.current.changeText('<script>alert(1)</script>');
    console.log(parentRef.current.name);
  }
  return (
      <>
        <ForwardChild ref={parentRef}/>
        <button onClick={getFocus}>获得焦点</button>
      </>
  )
}
```

### useLayoutEffect

其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新

```javascript
function LayoutEffect() {
    const [color, setColor] = useState('red');
    useLayoutEffect(() => {
        alert(color);
    });
    useEffect(() => {
        console.log('color', color);
    });
    return (
        <div>
            <div id="myDiv">颜色:{color}</div>
            <button onClick={() => setColor('red')}>红</button>
            <button onClick={() => setColor('yellow')}>黄</button>
            <button onClick={() => setColor('blue')}>蓝</button>
        </div>
    );
}
```

## Hooks原理

```js
import React from 'react';
import ReactDOM from 'react-dom';

let state = [];
let setters = [];
let stateIndex = 0;

function createSetter (index) {
  return function (newState) {
    state[index] = newState;
    render ();
  }
}

function useState (initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState;
  setters.push(createSetter(stateIndex));
  let value = state[stateIndex];
  let setter = setters[stateIndex];
  stateIndex++;
  return [value, setter];
}

function render () {
  stateIndex = 0;
  effectIndex = 0;
  ReactDOM.render(<App />, document.getElementById('root'));
}

// 上一次的依赖值
let prevDepsAry = [];
let effectIndex = 0;

function useEffect(callback, depsAry) {
  // 判断callback是不是函数
  if (Object.prototype.toString.call(callback) !== '[object Function]') throw new Error('useEffect函数的第一个参数必须是函数');
  // 判断depsAry有没有被传递
  if (typeof depsAry === 'undefined') {
    // 没有传递
    callback();
  } else {
    // 判断depsAry是不是数组
    if (Object.prototype.toString.call(depsAry) !== '[object Array]') throw new Error('useEffect函数的第二个参数必须是数组');
    // 获取上一次的状态值
    let prevDeps = prevDepsAry[effectIndex];
    // 将当前的依赖值和上一次的依赖值做对比 如果有变化 调用callback
    let hasChanged = prevDeps ? depsAry.every((dep, index) => dep === prevDeps[index]) === false : true;
    // 判断值是否有变化
    if (hasChanged) {
      callback();
    }
    // 同步依赖值
    prevDepsAry[effectIndex] = depsAry;
    effectIndex++;
  }
}

function useReducer (reducer, initialState) {
  const [state, setState] = useState(initialState);
  function dispatch (action) {
    const newState = reducer(state, action);
    setState(newState);
  }
  return [state, dispatch];
}

function App() {
  function reducer (state, action) {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      default:
        return state;
    }
  }
  const [count, dispatch] = useReducer(reducer, 0);
  return <div>
    {count}
    <button onClick={() => dispatch({type: 'increment'})}>+1</button>
    <button onClick={() => dispatch({type: 'decrement'})}>-1</button>
  </div>;
}

export default App;

```

