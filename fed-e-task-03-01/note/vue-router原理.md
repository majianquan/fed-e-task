### 1. history模式
```javascript
let _Vue = null

export default class VueRouter {
  static install (Vue) {
    // 1.判断当前插件是否被安装,如果安装了就不需要重复安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2.把vue构造函数记录到全局变量
    //  2.1 后期创建router-link和router-view
    _Vue = Vue
    // 3.把创建vue实例时候传入的router对象注入到vue实例上
    //  3.1 this.$router/this.$route
    // 给每一个vue实例,注入$router,但是只会调用一次
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init () {
    this.creatRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  creatRouteMap () {
    // 比那里所有的路由规则,把路由规则解析成键值对的形式,存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>' 运行时版本,不支持template
      render (h) {
        return h(
          'a',
          {
            attrs: {
              href: this.to
            },
            on: {
              click: this.clickHandler
            }
          },
          [this.$slots.default]
        )
      },
      methods: {
        clickHandler (e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const self = this
    Vue.component('router-view', {
      render (h) {
        const components = self.routeMap[self.data.current]
        return h(components)
      }
    })
  }

  initEvent () {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}

```
### 2. hash模式
```javascript
export class VueHashRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
  }
  static install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          Vue.prototype.$router = this.$options.router;
          this.$router.init();
        }
      },
    });
  }
  init() {
    this.bindEvent();
    this.createRouterMap(this.options);
    this.initComponent();
  }
  bindEvent() {
    this.app = new Vue({
      data: { current: "/" },
    });
    window.addEventListener("load", this.onHashChange);
    window.addEventListener("hashchange", this.onHashChange);
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1);
  }
  createRouterMap(options) {
    options.routes.forEach(
      (route) => (this.routeMap[route.path] = route.component)
    );
  }
  initComponent() {
    Vue.component("router-link", {
      props: { to: String },
      render(h) {
        return h("a", { attrs: { href: "#" + this.to } }, [
          this.$slots.default,
        ]);
      },
    });
    Vue.component("router-view", {
      render(h) {
        let comp = this.routeMap[this.app.current];
        return h(comp);
      },
    });
  }
}

```