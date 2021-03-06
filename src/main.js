// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import bcrypt from 'bcryptjs'
// import Cookies from 'js-cookies'
// var bcrypt = require('bcryptjs');    //引入bcryptjs库


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
Vue.prototype.$bcrypt = bcrypt;
// Vue.prototype.$cookies = Cookies;
var VueCookie = require('vue-cookie');
Vue.use(VueCookie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
