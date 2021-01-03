## 1. 请简述 React 16 版本中初始渲染的流程

答：1.react现在版本中，使用babel-preset-react来编译jsx,其中transform-react-jsx负责编译jsx

​	ReactComponsiteComponent 

​		native组件：[编译成React.DOM.xxx](http://xn--React-vl6jw19n6jv.DOM.xxx)(xxx如div)，函数运行返回一个ReactNativeComponent实例。

​		composite组件：编译成createClass返回的函数调用，函数运行返回一个ReactCompositeComponent实例

​       2.组件创建

​		创建类组件/函数式组件/原生组件, 构建生成虚拟dom

​       3.根据虚拟DOM生成Fiber树

4. 根据Fiber树并收集副作用依赖,
5. 最后生产渲染DOM

## 2. 为什么 React 16 版本中 render 阶段放弃了使用递归

在 React 15 的版本中，采用了循环加递归的方式进行了 virtualDOM 的比对，由于递归使用 JavaScript 自身的执行栈，一旦开始就无法停止，直到任务执行完成。如果 VirtualDOM 树的层级比较深，virtualDOM 的比对就会长期占用 JavaScript 主线程，由于 JavaScript 又是单线程的无法同时执行其他任务，所以在比对的过程中无法响应用户操作，无法即时执行元素动画，造成了页面卡顿的现象。

在 React 16 的版本中，放弃了 JavaScript 递归的方式进行 virtualDOM 的比对，而是采用循环模拟递归。而且比对的过程是利用浏览器的空闲时间完成的，不会长期占用主线程，这就解决了 virtualDOM 比对造成页面卡顿的问题。

在 window 对象中提供了 requestIdleCallback API，它可以利用浏览器的空闲时间执行任务，但是它自身也存在一些问题，比如说并不是所有的浏览器都支持它，而且它的触发频率也不是很稳定，所以 React 最终放弃了 requestIdleCallback 的使用。

在 React 中，官方实现了自己的任务调度库，这个库就叫做 Scheduler。它也可以实现在浏览器空闲时执行任务，而且还可以设置任务的优先级，高优先级任务先执行，低优先级任务后执行。

## 3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

答：

- 第一个阶段：
  - 用类组件的 getSnapshotBeforeUpdate 生命周期函数
- 第二个阶段：
  - 根据 effectTag 执行 DOM 操作
  - 挂载 DOM 元素
- 第三个阶段：
  - 执行了渲染 Dom 之后的操作
  - 执行生命周期函数componentDidMount  / useEffect 回调函数调用

## 4. 请简述 workInProgress Fiber 树存在的意义是什么

React 使用双缓存技术完成 Fiber 树的构建与替换，实现DOM对象的快速更新。

在 React 中最多会同时存在两棵 Fiber 树，当前在屏幕中显示的内容对应的 Fiber 树叫做 current Fiber 树，当发生更新时，React 会在内存中重新构建一颗新的 Fiber 树，这颗正在构建的 Fiber 树叫做 workInProgress Fiber 树。在双缓存技术中，workInProgress Fiber 树就是即将要显示在页面中的 Fiber 树，当这颗 Fiber 树构建完成后，React 会使用它直接替换 current Fiber 树达到快速更新 DOM 的目的，因为 workInProgress Fiber 树是在内存中构建的所以构建它的速度是非常快的。

一旦 workInProgress Fiber 树在屏幕上呈现，它就会变成 current Fiber 树。

在 current Fiber 节点对象中有一个 alternate 属性指向对应的 workInProgress Fiber 节点对象，在 workInProgress Fiber 节点中有一个 alternate 属性也指向对应的 current Fiber 节点对象。