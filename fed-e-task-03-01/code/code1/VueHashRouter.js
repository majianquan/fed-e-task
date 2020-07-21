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
