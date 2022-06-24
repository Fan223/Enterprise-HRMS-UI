// 引入 Vue
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'
// 应用 Vuex 插件
Vue.use(Vuex)

export default {
  mutations: {
    SET_MENU_LIST(state, menuList) {
      state.menuList = menuList;
    },
    SET_PERMISSION_LIST(state, permissionList) {
      state.permissionList = permissionList;
    },
    CHANGE_ROUTE_STATUS(state, hasRoute) {
      state.hasRoute = hasRoute;
    },
    ADD_TAB(state, tab) {
      let index = state.editableTabs.findIndex(item => item.name === tab.name);
      if (index === -1) {
        state.editableTabs.push({
          title: tab.title,
          name: tab.name,
        });
      }
      state.editableTabsValue = tab.name;
    },
  },
  state: {
    menuList: [],
    permissionList: [],
    hasRoute: false,
    editableTabsValue: 'Home',
    editableTabs: [{
      title: '首页',
      name: 'Home',
    }],
  },
}