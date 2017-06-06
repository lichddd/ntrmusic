// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import plugin from "./plugin"
import Vue from 'vue'
import App from './App'
import router from './router'
import directive from "./directive"
import filter from "./filter"
import vue$methods from "./vue$methods"
//var tooltip = require("./components/tooltip");
//var tooltip = require("@/components/test");
import axios from "axios"
import store from "./store"
//import plugin from "./plugin"
if (process.env.NODE_ENV == "development") {}

/**
 * @desc axios是异步请求类
 * @param  axios是异步请求类
 */
//console.log(tooltip);
window.axios = axios;

// Add a request interceptor
axios.interceptors.request.use(function(config) {
  // Do something before request is sent
  vm.progress.progressing.push({});
  return config;
}, function(error) {
  // Do something with request error
  vm.progress.progressing.shift();
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function(response) {
  // Do something with response data
  vm.progress.progressing.shift();
  return response;
}, function(error) {
  // Do something with response error
  vm.progress.progressing.shift();
  return Promise.reject(error);
});

Vue.config.productionTip = false;
Vue.use(directive);
Vue.use(filter);
Vue.use(vue$methods);
//window.Vue=Vue;

//Vue.use(tooltip);
/* eslint-disable no-new */
let progress = {
  progressing: [],
  firstprogressing: false
}
let eventer = {
  emit: null,
  on: null,
  off:null,
  _events:Object.create(null),
  _hasHookEvent:false
};


Vue.mixin({

  data() {
    return {'progress': progress, 'eventer': eventer};
  }

})
let vm = new Vue({
  // const vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  data: {}
})
window.vm=vm;
eventer.emit=vm.$emit;
eventer.on=vm.$on;
eventer.off=vm.$off;
// Vue.use({
//   install: function(Vue) {
//
//     Vue.prototype.progress = vm.progress;
//
//   }
// });

router.beforeEach((to, from, next) => {
  vm.progress.progressing.push({});
  next();
  return;

});

router.afterEach(() => {

  if (!vm.progress.firstprogressing) {
    vm.progress.progressing.shift();
  }
  vm.progress.firstprogressing = false;

});
