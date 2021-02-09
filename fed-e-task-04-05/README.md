### 1.通过该项目，请简要说明 typescript 比 javascript 的优势在哪？

（1）、便于开发人员做注释。

（2）、能帮助开发人员检测出错误并修改。

（3）、TypeScript工具使重构更变的容易、快捷。

（4）、TypeScript 引入了 JavaScript 中没有的“类”概念。

（5）、TypeScript 中引入了模块的概念，可以把声明、数据、函数和类封装在模块中。

### 2.请简述一下支付流程

* 用户点击提交订单
* 根据订单信息,向服务器发送请求,获取支付宝支付地址
* 客户端跳转到支付地址
* 用户支付
* 用支付完成之后, 重定向到指定的地址,告诉用户支付状态
* 同时支付宝想服务器发送post请求,告诉服务器端状态

### 3.react-redux 的主要作用是什么，常用的 api 有哪些，有什么作用？

react-redux配合redux使用，可以使组件轻松的拿到全局状态，方便组件间的通信。

Provider 主要用来传入store

connect **将store中的数据作为props绑定到组件中**

useDispatch, 获取dispach方法

useSelector 从Redux的store中提取数据（state）

4.redux 中的异步如何处理？

使用redux-saga 获取redux-thunk 中间件

先处理异步,然后在派发aciton

```javascript
export default store => next => action => {
  if(typeof action === 'function') {
    return action(store.dispatch)
  }
  next(action)
}
```



