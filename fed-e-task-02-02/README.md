## 简答题
### 1、Webpack 的构建流程主要有哪些环境？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

* webpack的构建流程主要分为'none' | 'development' | 'production' 三个环境,默认是'production'

```javascript
// 立即执行匿名函数
(function(modules) {
    //模块缓存
    var installedModules = {};
    // 实现require
    function __webpack_require__(moduleId) {
      
    }
    // 执行入口模块的加载
    return __webpack_require__(__webpack_require__.s = 0);
})({
    // modules：以key-value的形式储存所有被打包的模块
    0: function(module, exports, __webpack_require__) {
        // 打包入口
        module.exports = __webpack_require__("aaa");
    },
    "aaa": function(module, exports, __webpack_require__) {
        // index.js内容
    },
    bbb: function(module, exports) {
        // 模块.js 内容
    }
});


```
* 项目中会有各种各样的资源文件
* webpack会根据配置文件中的entry作为打包入口
* 会根据文件中import或者require等导入语句,就行解析
* 这样就会形成文件的依赖树,webpack会根据这颗依赖树,找到每一个节点的资源文件
* 根据正则的匹配任何资源文件使用资源加载器loader转译代码
* 这样会根据加载的结果放到bundle.js中
* 最外层立即执行匿名函数。它用来包裹整个bundle，并构成自身的作用域
* installedModules对象。每个模块只在第一次被加载的时候执行，之后其导出值就被存储到这个对象里面，当再次被加载的时候直接从这里取值，而不会重新执行
* __webpack_require__函数。对模块加载的实现
* modules对象。工程中所有产生了依赖关系的模块都会以key-value的形式放在这里。key可以理解为一个模块的id；value则是由一个匿名函数包裹的模块实体，匿名函数的参数则赋予了每个模块导出和导入的能力

### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
 区别:
    loader: 用于对模块源码的转换，loader描述了webpack如何处理非javascript模块
    plugin: 目的在于解决loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务

 1. 开发一个loader的步骤
    * 一个loader默认导出一个函数
    * 该函数默认接收一个参数source是匹配到的文件内容
    * 输出就是我们对文件内容加工到的结果
    * 一般返回的结果是一段可执行的js代码,或者是返回字符串交给下一个loader进行处理
 2. 开发一个Plugin的步骤
    * plugin通过webpack提供的钩子机制实现的
    * plugin默认导出一个函数或者一个包含apply方法的对象
    * apply方法中有默认的上下文编译对象complier
    * complier对象提过各种webpack 在打包过程中的各种钩子任务,可以触发进行回调
    * 钩子函数中有compilation对象,通过设置asset属性中对应得文件名字内容,就可以实现对webpack中各种文件的处理
```javascript
class MyPlugin{
    apply(complier) {
        console.log("myplugin 启动");
        complier.hooks.emit.tap('MyPlugin', compilation => {
            for (const name in compilation.assets) {
                if(name.endsWith('.js')) {
                    const contents = compilation.assets[name].source();
                    const withoutComments = contents.replace(/\/\*\*+\*\//g,'')
                    compilation.assets[name] = {
                        source: () => withoutComments,
                        size: () => withoutComments.length
                    }
                }
            }
        })
    }
}
```

##  3.编程题看code目录