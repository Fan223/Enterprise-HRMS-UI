<template>
  <el-container>
    <el-aside width="{asideWidth: '200px'}">
      <NavAside></NavAside>
    </el-aside>
    <el-container>
      <el-header>
        <NavHeader></NavHeader>
      </el-header>
      <el-main>
        <Tabs />
        <router-view style="padding: 0 20px 0 20px"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavAside from '@/layout/NavAside.vue'
import NavHeader from '@/layout/NavHeader.vue'
import Tabs from '@/layout/Tabs.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Main',
  components: {
    NavAside,
    NavHeader,
    Tabs
  },
}
</script>

<style>
.el-header {
  background-color: #333;
  color: #fff;
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #f3f3f4;
  padding: 0;
}
</style>