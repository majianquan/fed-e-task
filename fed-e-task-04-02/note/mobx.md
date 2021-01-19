MobX 是一个轻量的全局状态管理库，它使得 React 应用的状态管理变得简单且优雅。 正如 MobX 背后的哲学所述：**任何源自应用状态的东西都应该自动地获得**。 MobX 中引入 ES7 语法**装饰器**十分简便，所以强烈推荐使用天生支持装饰器语法的 TypeScript 构筑自己的项目。

## 核心概念

![核心原理](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/309d76b3a4bb4b35aff46beeb9e8ed20~tplv-k3u1fbpfcp-zoom-1.image) MobX 的核心原理是通过 action 触发 state 的变化，进而出发 state 的衍生对象（computed value & reactions）的变化。

## 开始使用

1. 使用 npm 或者 yarn 安装 mobx

```sh
npm install mobx
# or
yarn add mobx
```

1. 引入 mobx 的核心内容

```js
import { observable, action, computed, autorun } from 'mbox'
```

## 示例

```js
import { observable, action, computed, autorun } from 'mbox'

class Store {
  // 声明可观察的 State
  @observable list = []
  // 计算属性（根据依赖list更新）
  @computed get total() {
    return this.list.length
  }
  // 改变 state 的方法
  @action change() {
    this.list.push(this.list.length)
  }
}

const mstore = new Store()

setInterval(() => {
  mstore.change()
}, 2000)
// 依赖 mstore.total 变化后自动运行
autorun(() => {
  console.log(mstore.total)
})

```

## State：可观察状态

在上面的例子中，定义了一个 Store 类作为数据存储，通过 @observable 修饰器可以将其中的属性转变为可观察的状态值，其语法为：

```js
@observable state = initialValue
```

@observable 接受任何类型的 js 值（原始类型、引用、纯对象、类实例、数组和、maps），observable 的属性值在其变化的时候 mobx 会自动追踪并作出响应（触发以其为依赖的 computed 重新计算值、 autorun 执行代码）。 值得注意的一点是，当某一数据被 observable 包装后，他返回的其实是被 observable 包装后的类型。

```js
import { observable, autorun, computed, action } from 'mobx'

class Store {
  @observable list: Number[] = []
}
const store = new Store()
console.log('list is Array?',Array.isArray(list))
console.log('list:'store.list)
复制代码
```

控制台输出：

```js
list is Array? false
list Proxy {Symbol(mobx administration): ObservableArrayAdministration}

```

## Computed：计算属性

计算属性值实际上是一类衍生值，它是根据现有的状态`state`或者其他值计算而来，原则上在计算属性中尽可能地不对当前状态做任何修改； 同时对于任何可以通过现有状态数据得到的值都应该通过计算属性获取。 语法为：

```js
@computed get computesValue(){
    //return 依赖state的计算值
}；
复制代码
```

如上面的例子中，只需要获取其`list`属性的总数`total`的时候，我们可以根据其`list`来计算出`total`。

```js
class Store {
  @observable list = []
  @computed get total() {
    return this.list.length
  }
  @action change() {
    this.list.push(this.list.length)
  }
}

autorun(() => {
  console.log(mstore.total)
})
```

同时，当被`@observable`修饰的`list`变动时，`total`才会重新计算。

## Action：改变状态

在 MobX 中，其本身并不会对开发者作出任何限制去如何改变可观察对象； 但是，它还是提供了一个可选的方案来组织代码与数据流，`@action`，其规定对于 `store` 对象中所有可观察状态属性的改变都应该在 `@action` 中完成，Mobx 里的`action`类似于 Redux 里的`action`和 Vuex 里的`commit`，它使代码可以组织的更好，并且对于数据改变的时机也更加清晰。 语法为

```js
@action changeValue(){
    // 改变state的行为
}；
复制代码
```

例子中`list`的添加和移除都通过`@action`装饰的方法`pushData`和`popData`来实现，这样使得代码清晰明了。

```js
class Store {
  @observable list = []
  @computed get total() {
    return this.list.length
  }
  @action pushData() {
    this.list.push(this.list.length)
  }
  @action popData() {
    this.list.pop(this.list.length)
  }
}

autorun(() => {
  console.log(mstore.total)
})
复制代码
```

## Autorun：监听变化

在上面的例子中，当触发了可观察状态属性的改变后，其变化的监听则是在传入 autorun 函数中作出响应。 语法为：

```js
autorun(() => {
  // 依赖state相关的行为
})
复制代码
```

autorun 接受一个函数作为参数，在使用 autorun 的时候，该函数会被立即调用一次，之后当该函数中依赖的可观察状态属性（或者计算属性）发生变化的时候，该函数会被调用，注意，该函数的调用取决的函数中使用了哪些可观察状态属性（或者计算属性）。 例子：

```js
import { observable, action, computed, autorun } from `mobx`;

class Store {
  @observable count = 0;
  @action add () {
    this.count = this.count + 1;
  }
};

const mstore = new Store();

setInterval(() => {
 mstore.add();
}, 2000);

autorun(() => {
  console.log(mstore.count);
});
复制代码
```

在该例子中，`autorun` 的函数依赖了 `mstore.count` 属性，该属性是可观察的，其每次变化都会加 1 ，因此其中的函数在第一次立即触发，之后每次改变 `mstore.count` 的值都会被触发；

## Mobx-React

在 React 中使用 MobX 需要用到 mobx-react。 我们可以先创建一个 store.tsx 用来存储 Mobx 装饰的状态和行为。

```js
import { Provider } from 'mobx-react';
const stores = {
  ...
};

ReactDOM.render((
 import { observable, autorun, computed, action } from 'mobx'
import { render } from '@testing-library/react'

class Store {
  @observable list: Number[] = []
  @observable state = 0
  @computed get total() {
    return this.list.length
  }
  @action change() {
    this.list.push(this.list.length)
  }
}

const store = new Store()
autorun(() => {
  console.log(store.total)
})

export default store

```

再通过 `import` 引入 `store` 和 `observer`。 通过 `@observer` 将 React 组件转化成响应式组件，**它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件**：

```js
import React from 'react'
import Store from './store'
import { observer } from 'mobx-react'
const App = observer(() => {
  return (
    <div className="App">
      <div>{Store.list}</div>
      <button onClick={() => Store.change()}>push</button>
    </div>
  )
})

export default App
```