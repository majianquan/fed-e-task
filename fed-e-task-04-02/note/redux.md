



![mg](https://user-gold-cdn.xitu.io/2019/7/29/16c3da7a5979d92a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



**store、components、actionCreaters、reducers的关系即为：**

- 首先有一个组件，组件要去获取store中的一些数据
- actionCreaters通过dispatch(action)方法  让store知道 组件要获取数据
- store在reducer查组件需要什么数据，reducer返回组件应该拿到的数据
- store获得数据后把数据 返给 组件

## 一、redux中的store

`store` 是一个公共区域，store中存储了所有的数据，每个组件（React Components）都要从store中拿数据，每个组件也要从store中改数据

- 安装：`npm install redux -S`
- 创建store文件夹 > index.js (图书馆管理员)
- 创建reducer.js (管理员的记录本)

```javascript
//reducer.js文件
//reducer要返回一个函数
const initState = {
    val:'123',
    list:['任务一',"任务二"]
}; //store仓库里默认的数据
export default (state=initState,action) => {
    //state: store仓库里存储的数据
    return state;
}
复制代码
//store > index.js
import { createStore } from 'redux'; //从redux中引入createStore方法
import reducer from './reducer'; //获取reduxer中的数据
const store = createStore(reducer);
export default store;

```

## 二、actionTypes的拆分

在store中拆分出一个文件actionTypes.js，把字符串存放在常量里，便于纠错

```javascript
// actionTypes.js
export const CHANGE_INPUT_VALUE = 'change_input_value';
export const ADD_TODO_ITEM = 'add_todo_item';
export const DELETE_TODO_ITEM = 'delete_todo_item';

```

## 三、使用actionCreate创建统一的action

```javascript
// actionCreate.js
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes';

// 使用actionCreate创建统一的action
export const getChangeInput = (value) => ({
    type: CHANGE_INPUT_VALUE, //描述这件事是做什么的
    value: value
})

export const addTodoitem = () => ({
    type: ADD_TODO_ITEM
})

export const deleteTodoitem = (i) => ({
    type: DELETE_TODO_ITEM,
    i
})
// todoList.js
onChange = (ev) => {
    const action = getChangeInput(ev.target.value);
    console.log(ev.target.value);
    store.dispatch(action);//通过dispatch()把action传递给store
}

btnClick = () => {
    const action = addTodoitem()
    store.dispatch(action);
}

itemDelete(i){
    const action = deleteTodoitem(i)
    store.dispatch(action);
}

```

## 五、redux总结

### 5.1 redux设计原则：

- store是惟一的，整个应用只能有一个store

- 只有store能改变自己的内容

- reducer必须是纯函数 

  - 给定固定的输入，就一定会有固定的输出，而且不会有任何副作用

  ```javascript
  // state是固定的，action是固定的，return固定的值
  // 如果newState.val = new Date() 时间不固定 返回值也不固定
  export default (state = initState, action) => {
      if (action.type === CHANGE_INPUT_VALUE) {
          const newState = JSON.parse(JSON.stringify(state))
          newState.val = action.value;
          return newState;
      };
  };
  ```

### 5.2 redux核心API

- `createStore` 创建store
- `store.dispatch` 派发action，action传递给store
- `store.getState()` 获取store里面所有的数据内容
- `store.subscribe()` 订阅store的改变，只要store发生改变，store.subscribe()中的回调函数就会执行

## 六、UI组件和容器组件

- UI组件负责渲染
- 容器组件负责逻辑

## 七、无状态组件

```javascript
// 无状态组件 （函数）性能
// 定义UI组件时，只负责页面的渲染时，使用无状态组件
const TodoListUI = (props) => {
	return (
		<div style={{ marginTop: '10px', marginLeft: '10px' }}>
			<div>
				<Input
					value={props.inputValue}
					placeholder='todo info'
					style={{ width: '300px', marginRight: '10px' }}
					onChange={props.handleInputChange}
				/>
				<Button type="primary" onClick={props.handleBtnClick}>提交</Button>
			</div>
			<List
				style={{ marginTop: '10px', width: '300px' }}
				bordered
				dataSource={props.list}
				renderItem={(item, index) => (<List.Item onClick={(index) => { props.handleItemDelete(index) }}>{item}</List.Item>)}
			/>
		</div>
	)
}
```

## 八、redux中发送异步请求获取数据

使用charles或者mockjs请求模拟接口数据 ajax请求一般写在生命周期函数中

```javascript
// todoList.js
componentDidMount() {
    axios.get('api/list.json').then((res) => {
        const data = res.data;
        const action = initListAction(data);
        store.dispatch(action);
    })
}
// reducer.js
if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
}
// actionCreater.js
export const initListAction = (data) => ({
	type: INIT_LIST_ACTION,
	data
})
// actionTypes.js
export const INIT_LIST_ACTION = 'init_list_action';

```

## 九、redux-thunk中间件实现ajax数据请求

- 安装： `npm i redux-thunk --save` 把所有异步请求统一放到action中处理

```javascript
// store\index.js => 引入redux中的applyMiddleware方法
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

//正常使用REDUX_DEVTOOLS_EXTENSION调试工具
const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk),
);

const store = createStore(
	reducer,
	enhancer
);

export default store;

// todoList.js
import { getInputChangeAction, getAddItemAction, getDeleteItemAction,getTodolist } from './store/actionCreators'
componentDidMount() {
    // 在生命周期函数中 componentDidMount是组件完全挂载到网页上才会被调用执行，也就是render之后，所以加载数据和副作用操作都会在componentDidMount函数里面执行
    const action = getTodolist();
    store.dispatch(action); //派发action会调用getTodolist方法 ，getTodolist方法在actionCreaters里面
    // 把异步请求写在actionCreaters里，避免componentDidMount里面请求数据太多不方便于后期的维护，有利于自动化测试
}
复制代码
// actionCreaters.js
// 使用redux-thunk之后，actionCreaters可以返回一个函数，函数里执行异步的操作
// 如果不使用thunk，action必须返回一个普通对象
import axios from 'axios';

export const getTodolist = () => {
	return (dispatch) => {
		axios.get('/list.json').then((res) => {
			const data = res.data;
			console.log(data);
			const action = initListAction(data);
			dispatch(action);
		})
	}
}

```

> 

## 十、redux-thunk中间件

中间件的中间是指：antion和store的中间 对store的dispatch方法进行升级，之前dispatch方法只能返回一个对象，用了thunk中的MiddleWare中间件之后，可以返回函数



![img](https://user-gold-cdn.xitu.io/2019/7/21/16c13fd2f9f40e82?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



- `redux-thunk中间件`设计思想：是把异步操作放到action里面操作
- `redux-saga中间件`设计思想：是把异步操作单独放到另一个文件里面进行管理

## 十一、redux-saga中间件

- 安装 `npm i redux-saga --save`

```javascript
// store\index.js
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga'; //引入saga中间件
// 在store文件夹下创建一个sagas.js文件
import TodoSagas from './sagas';

// 创建一个中间件
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

// 通过redux中的createStore方法创建一个store，储存state
const store = createStore(
	reducer,
	enhancer
)

// 让saga文件执行起来
sagaMiddleware.run(todoSagas)
export default store;
复制代码
// actionCreates.js
export const getInitList = (data) => ({
	type: GET_INIT_LIST
})
复制代码
// actionTypes.js
export const GET_INIT_LIST = 'get_init_list';
复制代码
// sagas.js
import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionTypes';
import { initListAction } from './actionCreators';
import axios from 'axios';

function* getInitList() {
    // 有可能请求数据不成功
    try {
        const res = yield axios.get('/list.json'); //把ajax获取的数据存在res里面
        const action = initListAction(res.data);
        yield put(action); // 等action处理完成之后再继续执行代码
    } catch (ev) {
        console.log('list.json网络请求失败')
    }

}

// saga文件必须是一个Generator函数
function* todoSagas() {
    // 捕捉每一个every的类型
    // 通过takeEvery声明要接受的类型是GET_INIT_LIST，接收到后就执行getInitList方法
    yield takeEvery(GET_INIT_LIST, getInitList);
}
export default todoSagas;
```

