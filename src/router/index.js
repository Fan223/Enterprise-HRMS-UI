// 引入VueRouter
import VueRouter from 'vue-router'
// 引入 Axios
import axios from '../axios'
// 引入 Vuex
import store from '../store'

// 创建 router 实例对象（路由器），去管理一组一组的路由规则，并暴露出去
const router = new VueRouter({
  // 路由配置
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Main',
      component: () => import('@/layout/Main.vue'),
      children: [
        {
          path: '/userCenter',
          name: 'UserCenter',
          component: () => import('@/views/UserCenter.vue'),
          meta: {
            title: '个人中心',
          },
        },
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/Home.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  let hasRoute = store.state.menu.hasRoute;
  if (to.path === '/login') {
    next();
  } else if(!localStorage.getItem('jwt')){
    next('/login');
  } else if (!hasRoute){
    axios.get('/hrms/sys/menu/getNavMenu').then(res => {
      // 拿到 menuList 菜单列表
      store.commit('SET_MENU_LIST', res.data.data.menuList);
      // 拿到 permissionList 权限列表
      store.commit('SET_PERMISSION_LIST', res.data.data.permissionList);
  
      // 动态绑定路由
      res.data.data.menuList.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(child => {
            // 转成路由
            let route = menuToRouter(child);
            // 把路由添加到路由管理器中
            if (route) {
              router.addRoute('Main', route);
            }
          })
        } else {
          let route = menuToRouter(menu);
          if (route) {
            router.addRoute('Main', route);
          }
        }
      });
      hasRoute = true;
      store.commit('CHANGE_ROUTE_STATUS', hasRoute);
      next(to.path);
    })
  }else {
    next();
  }
})

const menuToRouter = (menu) => {
  if(!menu.component){
    return null;
  } else {
    return {
      path: menu.path,
      name: menu.name,
      component: () => import('@/views/' + menu.component +'.vue'),
      meta: {
        title: menu.title,
        icon: menu.icon
      }
    }
  }
}

export default router