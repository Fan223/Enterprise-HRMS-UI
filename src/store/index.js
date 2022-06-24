// 引入 Vue
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'
// 应用 Vuex 插件
Vue.use(Vuex)

import menu from './menu'

// 准备 actions——用于响应组件中的动作
const actions = {}
// 准备 mutations——用于操作数据（state）
const mutations = {
  SET_JWT(state, jwt) {
    state.jwt = jwt;
    localStorage.setItem('jwt', jwt);
  },
  HANDLE_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
  },
  LOGOUT(state) {
    localStorage.removeItem('jwt');
    state.jwt = '';
    // localStorage.clear();
    // state.menu.menuList = [];
    // state.menu.permissions = [];
    // state.menu.hasRoute = false;
    state.menu.editableTabsValue = 'Home';
    state.menu.editableTabs = [{
      title: '首页',
      name: 'Home',
    }];
  },
}
// 准备state——用于存储数据
const state = {
  jwt: '',
  isCollapse: false,
}
// 准备getters——用于将state中的数据进行加工
const getters = {}

//创建并暴露 store
export default new Vuex.Store({
  //actions: actions,
  actions,
  mutations,
  state,
  getters,
  modules: {
    menu,
  },
})
