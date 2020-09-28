## 简答题

### 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

- 响应式系统升级
  - Vue.js 2.x 中响应式系统的核心 defineProperty（即使没有给属性赋值，初始化实例的时候也会递归调用 defineProperty）
  - Vue.js 3.0 中使用 Proxy 对象重写响应式系统
    - 可以监听动态新增的属性
    - 可以监听删除的属性
    - 可以监听数组的索引和 length 属性
- 编译优化
  - Vue.js 2.x 中通过标记静态根节点，优化 diff 的过程
  - Vue.js 3.0 中标记和提升所有的静态节点，diff 的时候只需要对比动态节点内容
    - Fragments(升级 vrtur 插件)

### 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

 #### 2.1 Vue 2.x使用的Options Api

`在vue2中如何组织代码的`，**我们会在一个vue文件中methods，computed，watch，data中等等定义属性和方法，共同处理页面逻辑，**我们称这种方式为Options API



**缺点：** 一个功能往往需要在不同的vue配置项中定义属性和方法，`比较分散`，项目小还好，清晰明了，但是`项目大了后，一个methods中可能包含20多个方法`，**你往往分不清哪个方法对应着哪个功能**



#### 2.2 vue3 Composition AP

**在vue3 Composition API 中**，我们的代码是**根据逻辑功能来组织的**，`一个功能所定义的所有api会放在一起（更加的高内聚，低耦合）`，这样做，即时项目很大，功能很多，我们都能`快速的定位到这个功能所用到的所有API`，而不像vue2 Options API 中一个功能所用到的API都是分散的，需要改动功能，到处找API的过程是很费劲的

#### 一个功能所定义的所有api会放在一起:

###### 为什么要使用 Composition API：

- Composition API 是根据逻辑相关性组织代码的，提高可读性和可维护性
- 基于函数组合的 API 更好的重用逻辑代码`（在vue2 Options API中通过Mixins重用逻辑代码，容易发生命名冲突且关系不清）`

### 3、Proxy 相对于 Object.defineProperty 有哪些优点？

Proxy的优势：

- 可以直接监听对象而非属性
- 可以直接监听数组的变化
- 拦截方式较多
- Proxy返回一个新对象，可以只操作新对象达到目的，而Object.defineProperty只能遍历对象属性直接修改
- Proxy作为新标准将受到浏览器厂商重点持续的性能优化

Object.defineProperty的优势如下:

- 兼容性好,支持IE9

### 4、Vue 3.0 在编译方面有哪些优化？

Vite as Vue-CLI

- Vite 在开发模式下不需要打包可以直接运行
- Vue-CLI 开发模式下必须对项目打包才可以运行
- Vite 在生产环境下使用 Rollup 打包
  - 基于 ES Module 的打包
- Vue-CLI 在生产环境下使用 webpack 打包
- Vite 特点：
  - 快速冷启动
  - 按需编译
  - 模块热更新

### 5、Vue.js 3.0 响应式系统的实现原理？

Vue3 使用 Proxy 对象重写响应式系统，这个系统主要有以下几个函数来组合完成的：

- 1、reactive:
  - 接收一个参数，判断这参数是否是对象。不是对象则直接返回这个参数，不做响应式处理
  - 创建拦截器对象 handler, 设置 get/set/deleteProperty
    - get
      - 收集依赖（track）
      - 返回当前 key 的值。
        - 如果当前 key 的值是对象，则为当前 key 的对象创建拦截器 handler, 设置 get/set/deleteProperty
        - 如果当前的 key 的值不是对象，则返回当前 key 的值
    - set
      - 设置的新值和老值不相等时，更新为新值，并触发更新（trigger）
    - deleteProperty
      - 当前对象有这个 key 的时候，删除这个 key 并触发更新（trigger）
  - 返回 Proxy 对象
- 2、effect: 接收一个函数作为参数。作用是：访问响应式对象属性时去收集依赖
- 3、track:
  - 接收两个参数：target 和 key
  - 如果没有 activeEffect，则说明没有创建 effect 依赖
  - 如果有 activeEffect，则去判断 WeakMap 集合中是否有 target 属性，
    - WeakMap 集合中没有 target 属性，则 set(target, (depsMap = new Map()))
    - WeakMap 集合中有 target 属性，则判断 target 属性的 map 值的 depsMap 中是否有 key 属性
      - depsMap 中没有 key 属性，则 set(key, (dep = new Set()))
      - depsMap 中有 key 属性，则添加这个 activeEffect
- 4、trigger:
  - 判断 WeakMap 中是否有 target 属性
    - WeakMap 中没有 target 属性，则没有 target 相应的依赖
    - WeakMap 中有 target 属性，则判断 target 属性的 map 值中是否有 key 属性，有的话循环触发收集的 effect()

```javascript
const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export function reactive(target) {
  if (!isObject(target)) return target

  const handler = {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        trigger(target, key)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 触发更新
        console.log('delete', key)
        trigger(target, key)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

let activeEffect = null
export function effect(callback) {
  activeEffect = callback
  callback() // 访问响应式对象属性，去收集依赖
  activeEffect = null
}

let targetMap = new WeakMap()
export function track(target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

export function ref(raw) {
  // 判断 raw 是否是 ref 创建的对象，如果是的话直接返回
  if (isObject(raw) && raw.__v_isRef) {
    return
  }
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value')
      return value
    },
    set value(newValue) {
      if (newValue !== value) {
        raw = newValue;
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }
  return r
}

export function toRefs(proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}
  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }
  return ret
}

function toProxyRef(proxy, key) {
  const r = {
    __v_isRef: true,
    get value() {
      return proxy[key]
    },
    set value(newValue) {
      proxy[key] = newValue
    }
  }
  return r
}

export function computed(getter) {
  const result = ref()
  effect(() => (result.value = getter()))
  return result
}
```

