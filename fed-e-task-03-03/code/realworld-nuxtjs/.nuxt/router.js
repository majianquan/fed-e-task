import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3ca39d03 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _5c3a38f8 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _2b452e70 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _47da22f0 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _44aa4bbc = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _2ea4663d = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))
const _30d4c346 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))

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
    component: _3ca39d03,
    children: [{
      path: "",
      component: _5c3a38f8,
      name: "home"
    }, {
      path: "/login",
      component: _2b452e70,
      name: "login"
    }, {
      path: "/register",
      component: _2b452e70,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _47da22f0,
      name: "profile"
    }, {
      path: "/settings",
      component: _44aa4bbc,
      name: "settings"
    }, {
      path: "/article/:slug",
      component: _2ea4663d,
      name: "article"
    }, {
      path: "/editor",
      component: _30d4c346,
      name: "editor"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
