## 1.什么是客户端渲染

CSR：Client Side Rendering

服务器端仅返回 JSON 数据, DATA 和 HTML 在客户端进行渲染.

![](/Users/jianquanma/Desktop/imags/CSR.png)

## 2.什么是服务端渲染

SSR：Server Side Rendering

服务器端返回HTML, DATA 和 HTML 在服务器端进行渲染.

![](/Users/jianquanma/Desktop/imags/SSR.png)

## 3.客户端渲染存在的问题

1. 首屏等待时间长, 用户体验差
2. 页面结构为空, 不利于 SEO

## 4.React SSR同构

同构指的是代码复用. 即实现客户端和服务器端最大程度的代码复用.

## 5.项目结构

react-ssr

​	src 源代码文件夹

​		client 客户端代码

​		server 服务器端代码

​		share 同构代码

## 6.创建Node服务器

![](/Users/jianquanma/Desktop/imags/node_start.png)

## 7.实现SSR

1. 引入要渲染的 React 组件

2. 通过 renderToString 方法将 React 组件转换为 HTML 字符串

3. 将结果HTML字符串想到到客户端

renderToString 方法用于将 React 组件转换为 HTML 字符串, 通过 react-dom/server 导入.

## 8. webpack打包配置

问题: Node 环境不支持 ESModule 模块系统, 不支持 JSX 语法.

1. 配置服务器端打包命令: "dev:server-build": "webpack --config webpack.server.js --watch"

2. 配置服务端启动命令: "dev:server-run": "nodemon --watch build --exec \"node build/bundle.js\""

## 服务端store数据填充

问题：服务器端创建的 store 是空的, 组件并不能从Store中获取到任何数据.

解决：服务器端在渲染组件之前获取到组件所需要的数据.

\1. 在组件中添加 loadData 方法, 此方法用于获取组件所需数据，方法被服务器端调用

\2. 将 loadData 方法保存在当前组件的路由信息对象中.

\3. 服务器端在接收到请求后，根据请求地址匹配出要渲染的组件的路由信息

\4. 从路由信息中获取组件中的 loadData 方法并调用方法获取组件所需数据

\5. 当数据获取完成以后再渲染组件并将结果响应到客户端

### 1.组件loadData方法

服务器端通过调用组件的 loadData 方法获取组件所需数据并将数据存储在服务器端的 Store 中

![](/Users/jianquanma/Desktop/imags/data1.png)

### 2.服务端获取组件所需数据

服务器端在接收到请求以后，先根据请求路径分析出要渲染的路由信息，再从路由信息中得到 loadData方法.

![](/Users/jianquanma/Desktop/imags/data2.png)



## React 警告消除

警告原因: 客户端 Store 在初始状态下是没有数据的, 在渲染组件的时候生成的是空 ul, 但是服务器端是先获取数据再进行的组件渲染, 所以生成的是有子元素的ul, hydrate 方法在对比的时候发现两者不一致, 所以报了个警告.

解决思路: 将服务器端获取到的数据回填给客户端, 让客户端拥有初始数据.

### 1. 服务器响应 Store 初始状态

![](/Users/jianquanma/Desktop/imags/info1.png)

### 2. 客户端设置 Store 初始状态

![](/Users/jianquanma/Desktop/imags/info2.png)





## 防范XSS攻击

转义状态中的恶意代码.

![](/Users/jianquanma/Desktop/imags/xss.pn.png)