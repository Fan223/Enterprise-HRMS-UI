// 引入 Vue
import Vue from 'vue'
// 引入 App 组件
import App from './App.vue'
// 引入 store
import store from './store'
// 引入 VueRouter
import VueRouter from 'vue-router'
// 引入路由器
import router from './router/index.js'
// 引入 Axios
import request from './axios'
// 引入 Element UI 组件库
import ElementUI from 'element-ui';
// 引入 Element UI 全部样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局混入
import mixins from './mixin'
// 引入 qs
import qs from 'qs'

Vue.config.productionTip = false
// 全局应用 Axios
Vue.prototype.$axios = request
// 应用 VueRouter 插件
Vue.use(VueRouter)
// 应用 Element UI
Vue.use(ElementUI);
// 引入mock数据
// require('./mock/index.js')
// 全局混入
Vue.mixin(mixins)
// 配置全局 qs 属性
Vue.prototype.$qs = qs

new Vue({
  store,
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
