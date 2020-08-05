一、简答题

### 1、请简述 Vue 首次渲染的过程。

#### 1.1、入口文件

 `src/platform/web/entry-runtime-with-compiler.js`

#### 1.2、Vue初始化过程

1. 首先取出Vue的`$mount`,对`$mount`进行重写,给`$mount`增加新的功能

```js
// src/platform/web/entry-runtime-with-compiler.js
// 保留 Vue实例的 $mount 方法
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  // 非ssr情况下的为false, ssr时候为true
  hydrating?: boolean
): Component {
  // 获取el对象
  el = el && query(el)
  ...
}
```

2. 判断是否有`render`选项,如果没有`render`选项,则会把模版`template`取出,把模版编译成`render`函数,接着调用`mount`方法,渲染`DOM`。

3. Vue增加了一个静态的`compile`方法,作用是把`HTML`字符串编译成`render`函数

```js
if (!options.render) {
  let template = options.template
    if (template) {
      ...
    }
}
Vue.compile = compileToFunctions
export default Vue
```

4. 这个文件主要是通过`extend`给Vue全局注册了指令和组件,组件是`Transition`和`TransitionGroup`,指令是`v-model`和`v-show`,接着在`Vue`的原型上注册了 `_patch_` 函数, `_patch_` 函数作用是将虚拟DOM转换成真实DOM,在给`patch`函数赋值的时候会判断是否是浏览器环境
5. 我们继续找Vue的构造函数

```js
// src/platforms/web/runtime/index.js

extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// 判断是否是浏览器环境
Vue.prototype.__patch__ = inBrowser ? patch : noop
```

#### 1.3 初始化静态成员

6.定义在`src/core/index.js`

在这个文件中调用`initGlobalAPI(Vue)`方法,给Vue的构造函数增加静态方法

```js
initGlobalAPI(Vue)
```

7.`initGlobalAPI(Vue)` 定义在`src/core/global-api/index.js`

- 初始化`Vue.config`对象
- 设置`keep-alive` 组件
- 注册`Vue.use()`用来注册插件
- 注册`Vue.mixin()`实现混入
- 注册`Vue.extend()`基于传入的options返回一个组件的构造函数
- 注册`Vue.directive()`, `Vue.component()`, `Vue.filter`

```js
export function initGlobalAPI (Vue: GlobalAPI) {
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick
  Vue.options._base = Vue
  extend(Vue.options.components, builtInComponents)
  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
```

#### 1.4 初始化实例成员

1. _init()

- 定义在`src/core/instance/index.js`
- 定义了构造函数，调用了`this._init(options)`方法
- 给Vue中混入了常用的实例成员

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 调用 _init()方法
  this._init(options)
}
// 注册vm的_init()方法, 初始化vm
initMixin(Vue)
// 注册vm 的$data/$props/$set/$delete/$watch
stateMixin(Vue)
// 初始化事件相关方法
//$on/$once/$off/$emit
eventsMixin(Vue)
// 初始化生命周期相关的混入方法
// _update/$forceUpdate/$destroy
lifecycleMixin(Vue)
// 混入 render
// $nextTick/_render
renderMixin(Vue)
export default Vue
```

#### 1.5 初始化实例成员 init()

- 当静态成员和实例成员都初始化完成之后,接着调用Vue的构造函数,在构造函数中调用_init()方法
- _init是在initMixin中初始化的,主要对Vue实例初始化

```js
// vm的生命周期相关变量初始化
initLifecycle(vm)
// vm的事件监听初始化,父组件绑定在当前组件上的事件
initEvents(vm)
// vm的编译render初始化
// $slots/$scopedSlots/_c/$createElement/$attrs/$listeners
initRender(vm)
// beforeCreate 生命钩子的回调
callHook(vm, 'beforeCreate')
// 把inject的成员注入到vm上
initInjections(vm) // resolve injections before data/props
// 初始化vm的 _props/methods/_data/computed/watch
initState(vm)
// 初始化provide
initProvide(vm) // resolve provide after data/props
// created 生命钩子回调
callHook(vm, 'created')
1234567891011121314151617
```

#### 1.6 初始化实例成员 initState()

初始化vm的 `_props/methods/_data/computed/watch`

```javascript
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

- 在`instance/state.js`中,首先获取了`Vue`实例中的`$options`,然后判断`options`中是否有`props,methods,data`以及`computed`和`watch`这些属性,如果有的话,通过`initProps`进行初始化
  `initProps(vm, opts.props)`接收了两个参数,一个是`Vue`实例,一个是`Props`属性,我们跳转到`initProps`函数中,首先给`Vue`实例定义了一个`_Props`对象, 并且把它存储到了常量里面

  ```js
  const props = vm._props = {}
  1
  ```

- 紧接着,开始遍历`PropsOptions`的所有属性,它其实就是`initProps`方法中的第二个参数,遍历每个属性,然后通过`defineReactive`注入到`Props`这个对象上,这个`props`其实就是`vm._props`所有的成员都会通过`defineReacttive`转化为`get`和`set`,最后在`Props`对象上存储,
  **注意**

- 在开发模式中,如果我们直接给这个属性赋值的话,会发出一个警告,

- 生产环境中直接通过`defineReactive`把`props`中的属性转化成`get`和`set`

- 最后判断了`props`属性是否在`Vue`实例中存在,不存在通过`Proxy`这个函数把我们的属性注入到`Vue`的实例中

- 在`Proxy`中,通过调用`Object.defineProperty(target, key,sharePropertyDefinition)`

`initProps`的作用就是把我们的`Props`成员转化成响应式数据,并且注入到`Vue`实例里面中

#### initMethods

- 在`initMethods(vm, opts.methods)`中,也是接收两个参数,Vue实例和选项中的`methods`,首先获取了选项中的Props,接着遍历methods所有属性,接着判断当前的环境是否是开发或者生产
  开发环境会判断methods是否是functicon
- 接着判断`methods`方法的名称是否在`Props`对象中存在,存在就会发送一个警告,警告在属性在`Props`中已经存在,因为`Props`和`methods`最终都要注入到Vue实例上,不能出现同名
- 下面继续判断`key`是否在`Vue`中存在,并且调用了`isReserved(key)`,判断我们的`key`是否以_开头或`$`开头
  最后把`methods`注入到Vue实例上来,注入的时候会判断是否是`function`,如果不是返回`noop`,是的话把函数返回`bind(methods[key], vm)`

`initMethods`作用就是把选项的`methods`注入到vue实例,在注入之前,会先判断我们命名是否在`Props`中存在,并且判断了命名的规范,不建议_和$开头

#### initData(vm)

- 当`options`中有`data`选项时,会调用`initData(vm)`
- 当没有的时候此时会给vm初始化一个`_data属性observe(vm._data = {}, true)`然后调用observe函数,`observe`是响应式中的一个函数
- 在`initData`中获取了`options`的`data`选项,判断了`data`选项是否是`function`,如果是调用`getData(data,vm)`
  接着获取`data`中的所有属性,同时获取了`props,methods`中所有的属性

### 首次渲染过程总结

- 在首次渲染之前,首先进行Vue初始化,初始化实例成员和静态成员
- 当初始化结束之后,要调用Vue的构造函数`new Vue()`,在构造函数中调用了`_init()`方法,这个方法相当于我们整个Vue的入口
- 在`_init`方法中,最终调用了`$mount`,一共有两个`$mount`,第一个定义在`entry-runtime-with-compiler.js`文件中,也就是我们的入口文件`$mount`,这个`$mount()`的核心作用是帮我们把模板编译成`render`函数，但它首先会判断一下当前是否传入了`render`选项，如果没有传入的话，它会去获取我们的`template`选项，如果`template`选项也没有的话，他会把`el`中的内容作为我们的模板，然后把模板编译成`render`函数，它是通过`compileToFunctions()`函数，帮我们把模板编译成`render`函数的,当把`render`函数编译好之后，它会把`render`函数存在我们的`options.render`中。
- 接着会调用`src/platforms/web/runtime/index.js`文件中的`$mount`方法,在这个中首先会重新获取`el`，因为如果是运行时版本的话，是不会走`entry-runtime-with-compiler.js`这个入口中获取el，所以如果是运行时版本的话，我们会在runtime/index.js的$mount()中重新获取el。
- 接下来调用`mountComponent()`,这个方法在`src/core/instance/lifecycle.js`中定义的，在`mountComponent()`中，首先会判断`render`选项，如果没有`render`选项，但是我们传入了模板，并且当前是开发环境的话会发送一个警告，目的是如果我们当前使用运行时版本的Vue,而且我们没有传入render,但是传入了模版,告诉我们运行时版本不支持编译器。接下来会触发beforeMount这个生命周期中的钩子函数，也就是开始挂载之前。
- 然后定义了updateComponent()，在这个函数中，调用`vm._render`和`vm._update`，`vm._render`的作用是生成虚拟DOM，`vm._update`的作用是将虚拟`DOM`转换成真实`DOM`，并且挂载到页面上
- 创建`Watcher`对象，在创建`Watcher`时，传递了`updateComponent`这个函数，这个函数最终是在`Watcher`内部调用的。在`Watcher`内部会用了`get`方法，当Watcher创建完成之后,会触发生命周期中的`mounted`钩子函数,在get方法中，会调用updateComponent()
- 挂载结束，最终返回Vue实例。

以上就是Vue的首次渲染过程

### 2、请简述 Vue 响应式原理。

- Vue的响应式是从Vue的实例`init()`方法中开始的，在`init()`方法中先调用`initState()`初始化`Vue`实例的状态，在`initState`方法中调用了`initData()`， `initData()`是把`data`属性注入到`Vue`实例上，并且调用`observe(data)`将`data`对象转化成响应式的对象。
- `observe`是响应式的入口, 在`observe(value)`中，首先判断传入的参数`value`是否是对象，如果不是对象直接返回。再判断`value`对象是否有`__ob__这个属性，如果有说明做过了响应式处理，则直接返回，如果没有，创建`observer`对象，并且返回`observer`对象。
- 在创建`observer`对象时，给当前的`value`对象定义不可枚举的`__ob__`属性，记录当前的`observer`对象，然后再进行数组的响应式处理和对象的响应式处理，数组的响应式处理就是拦截数组的几个特殊的方法，`push`、`pop`、`shift`等，然后找到数组对象中的`__ob__`对象中的`dep`,调用`dep`的`notify()`方法，再遍历数组中每一个成员，对每个成员调用`observer()`，如果这个成员是对象的话，也会转换成响应式对象。对象的响应式处理，就是调用`walk`方法，`walk`方法就是遍历对象的每一个属性，对每个属性调用`defineReactive`方法
- `defineReactive`会为每一个属性创建对应的`dep`对象，让`dep`去收集依赖，如果当前属性的值是对象，会调用`observe`。`defineReactive`中最核心的方法是`getter` 和 `setter`。`getter` 的作用是收集依赖，收集依赖时, 为每一个属性收集依赖，如果这个属性的值是对象，那也要为子对象收集依赖，最后返回属性的值。在`setter` 中，先保存新值，如果新值是对象，也要调用 `observe` ，把新设置的对象也转换成响应式的对象,然后派发更新（发送通知），调用`dep.notify()`
- 收集依赖时，在`watcher`对象的`get`方法中调用`pushTarget`,记录`Dep.target`属性，访问`data`中的成员的时候收集依赖，`defineReactive`的`getter`中收集依赖，把属性对应的 `watcher` 对象添加到`dep`的`subs`数组中，给`childOb`收集依赖，目的是子对象添加和删除成员时发送通知。
- 在数据发生变化的时候，会调用`dep.notify()`发送通知，`dep.notify()`会调用`watcher`对象的`update()`方法，`update()`中的调用的`queueWatcher()会去判断`watcher`是否被处理，如果这个`watcher`对象没有的话添加到`queue`队列中，并调用`flushScheduleQueue()`，`flushScheduleQueue()`触发`beforeUpdate`钩子函数调用`watcher.run()`：`run()`-->`get() --> `getter()` --> `updateComponent()`
- 然后清空上一次的依赖
- 触发actived的钩子函数
- 触发updated钩子函数

### 3、请简述虚拟 DOM 中 Key 的作用和好处。

虚拟DOM的本质是一个和真实DOM结构类似的JS对象

key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

```javascript
        // 以上四种情况都不满足
        // newStartNode 依次和旧的节点比较
        
        // 从新的节点开头获取一个，去老节点中查找相同节点
        // 先找新开始节点的key和老节点相同的索引，如果没找到再通过sameVnode找
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        // 如果没有找到
        if (isUndef(idxInOld)) { // New element
          // 创建节点并插入到最前面
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          // 获取要移动的老节点
          vnodeToMove = oldCh[idxInOld]
          // 如果使用 newStartNode 找到相同的老节点
          if (sameVnode(vnodeToMove, newStartVnode)) {
            // 执行 patchVnode，并且将找到的旧节点移动到最前面
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // 如果key相同，但是是不同的元素，创建新元素
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
```



### 4、请简述 Vue 中模板编译的过程。

```javascript
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 把模板转换成 ast 抽象语法树
  // 抽象语法树，用来以树形的方式描述代码结构
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化抽象语法树
    optimize(ast, options)
  }
  // 把抽象语法树生成字符串形式的 js 代码
  const code = generate(ast, options)
  return {
    ast,
    // 渲染函数
    render: code.render,
    // 静态渲染函数，生成静态 VNode 树
    staticRenderFns: code.staticRenderFns
  }
})

```

在 $mount 的时候执行了 compile 这个方法来将 template 里的内容转换成真正的 HTML 代码。complie 之后执行的事情也蛮重要的，这个我们留到最后再说。complie 最终生成 render 函数，等待调用。这个方法分为三步：

- parse 函数解析 template
- optimize 函数优化静态内容
- generate 函数创建 render 函数字符串

#### 4.1parse 解析

在了解 parse 的过程之前，我们需要了解 AST，AST 的全称是 Abstract Syntax Tree，也就是所谓抽象语法树，用来表示代码的数据结构。在 Vue 中我把它理解为**嵌套的、携带标签名、属性和父子关系的 JS 对象，以树来表现 DOM 结构。**
下面是 Vue 里的 AST 的定义：

![AST](http://wx3.sinaimg.cn/mw690/7cd9fb9fgy1fnn3iq86flj20i40nngps.jpg)

我们可以看到 AST 有三种类型，并且通过 children 这个字段层层嵌套形成了树状的结构。而每一个 AST 节点存放的就是我们的 HTML 元素、插值表达式或文本内容。AST 正是 parse 函数生成和返回的。
parse 函数里定义了许多的正则表达式，通过对标签名开头、标签名结尾、属性字段、文本内容等等的递归匹配。把字符串类型的 template 转化成了树状结构的 AST。

```javascript
// parse 里定义的一些正则
export const onRE = /^@|^v-on:/ //匹配 v-on
export const dirRE = /^v-|^@|^:/ //匹配 v-on 和 v-bind
export const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/ //匹配 v-for 属性
export const forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/ //匹配 v-for 的多种形式
```

我们可以把这个过程理解为一个截取的过程，它把 template 字符串里的元素、属性和文本一个个地截取出来，其中的细节十分琐碎，涉及到各种不同情况（比如不同类型的 v-for，各种 vue 指令、空白节点以及父子关系等等）

![Parse 过程](http://wx3.sinaimg.cn/mw690/7cd9fb9fgy1fnn42mbfiwj20u60diwho.jpg)

#### 4.2 optimize 优化

在第二步中，会对 parse 生成的 AST 进行静态内容的优化。静态内容指的是**和数据没有关系，不需要每次都刷新的内容。**标记静态节点的作用是为了在后面做 Vnode 的 diff 时起作用，用来确认一个节点是否应该做 patch 还是直接跳过。optimize 的过程分为两步：

- 标记所有的静态和非静态结点
- 标记静态根节点

##### 标记所有的静态和非静态结点

关于这一段我们可以直接看源码：

```javascript
function markStatic (node: ASTNode) {
  // 判断当前 astNode 是否是静态的
  node.static = isStatic(node)
  // 元素节点
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    // 是组件，不是slot，没有inline-template
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    // 遍历 children
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      // 标记静态
      markStatic(child)
      if (!child.static) {
        // 如果有一个 child 不是 static，当前 node 不是static
        node.static = false
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          node.static = false
        }
      }
    }
  }
}
```



上面的代码中有几个需要注意的地方：

- isStatic 函数
  isStatic 函数顾名思义是判断该节点是否 static 的函数，符合如下内容的节点就会被认为是 static 的节点：

```text
1. 如果是表达式AST节点，直接返回 false
2. 如果是文本AST节点，直接返回 true
3. 如果元素是元素节点，阶段有 v-pre 指令 ||
  1. 没有任何指令、数据绑定、事件绑定等 &&
  2. 没有 v-if 和 v-for &&
  3. 不是 slot 和 component &&
  4. 是 HTML 保留标签 &&
  5. 不是 template 标签的直接子元素并且没有包含在 for 循环中
  则返回 true
```

- if 判断条件

1. !isPlatformReservedTag(node.tag)：node.tag 不是 HTML 保留标签时返回true。
2. node.tag !== ‘slot’：标签不是slot。
3. node.attrsMap[‘inline-template’] == null：node不是一个内联模板容器。

如果满足上面的所有条件，那么这个节点的 static 就会被置为 false 并且不递归子元素，当不满足上面某一个条件时，递归子元素判断子元素是否 static，只有所有元素都是 static 的时候，该元素才是 static。

##### 标记静态根节点

这部分理解起来很简单，只有当一个节点是 static 并且其不能只拥有一个静态文本节点时才能被称为 static root。因为作者认为这种情况去做优化，其消耗会超过获得的收益。

```javascript
if (node.static && node.children.length && !(
  node.children.length === 1 &&
  node.children[0].type === 3
)) {
  node.staticRoot = true
  return
} else {
  node.staticRoot = false
}
```

#### 4.3 generate 生成 render

生成 render 的 generate 函数的输入也是 AST，它递归了 AST 树，为不同的 AST 节点创建了不同的内部调用方法，等待后面的调用。生成 render 函数的过程如下：
![generate 函数](http://wx1.sinaimg.cn/mw690/7cd9fb9fgy1fnn5x3x8ltj216k09u76c.jpg)

```
几种内部方法
_c：对应的是 createElement 方法，顾名思义，它的含义是创建一个元素(Vnode)
_v：创建一个文本结点。
_s：把一个值转换为字符串。（eg: {{data}}）
_m：渲染静态内容
```



假设我们有这么一段 template

```vue
<template>
  <div id="test">
    {{val}}
    <img src="http://xx.jpg">
  </div>
</template>
```



最终会被转换成这样子的函数字符串

```javascript
{render: "with(this){return _c('div',{attrs:{"id":"test"}},[[_v(_s(val))]),_v(" "),_m(0)])}"}
```

