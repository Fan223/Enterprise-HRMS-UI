<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="$store.state.isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="this.$store.state.menu.editableTabsValue"
  >
    <el-menu-item
      index="title"
      @click="$router.go(0)"
    >
      <span
        slot="title"
        style="margin-left: 8px"
      > <b>企业人力资源管理系统</b> </span>
      <i
        class="el-icon-menu"
        v-show="$store.state.isCollapse"
      ></i>
    </el-menu-item>

    <router-link to="/home">
      <el-menu-item index="Home">
        <i class='el-icon-s-home'></i>
        <span slot="title"> 首页 </span>
      </el-menu-item>
    </router-link>

    <template v-for="menu in menuList">
      <el-submenu
        v-if="menu.children && menu.children.length > 0"
        :key="menu.name"
        :index="menu.name"
      >
        <template slot="title">
          <i :class=menu.icon></i>
          <span slot="title"> {{ menu.title }} </span>
        </template>
        <template v-for="child in menu.children">
          <router-link
            :to="child.path"
            :key="child.name"
          >
            <el-menu-item
              :index="child.name"
              @click="addTab(child)"
            >
              <i :class=child.icon></i>
              <span slot="title"> {{ child.title }} </span>
            </el-menu-item>
          </router-link>
        </template>

      </el-submenu>

      <router-link
        v-else
        :to="menu.path"
        :key="menu.name"
      >
        <el-menu-item
          :index="menu.name"
          @click="addTab(menu)"
        >
          <i :class=menu.icon></i>
          <span slot="title"> {{ menu.title }} </span>
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'NavAside',
  computed: {
    menuList() {
      return this.$store.state.menu.menuList
    }
  },
  methods: {
    addTab(menu) {
      this.$store.commit('ADD_TAB', menu)
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  height: 100vh;
  background-color: #545c64;
  color: #fff;
}
a {
  text-decoration: none;
}
</style>