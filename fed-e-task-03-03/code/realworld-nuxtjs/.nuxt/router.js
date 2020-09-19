import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2a905333 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _793ebb28 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _a25e1b80 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _178432c0 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _6a4235ec = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _036313e6 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))
const _1ec17976 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _2a905333,
    children: [{
      path: "",
      component: _793ebb28,
      name: "home"
    }, {
      path: "/login",
      component: _a25e1b80,
      name: "login"
    }, {
      path: "/register",
      component: _a25e1b80,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _178432c0,
      name: "profile"
    }, {
      path: "/settings",
      component: _6a4235ec,
      name: "settings"
    }, {
      path: "/article/:slug",
      component: _036313e6,
      name: "article"
    }, {
      path: "/editor",
      component: _1ec17976,
      name: "editor"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
