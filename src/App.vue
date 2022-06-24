<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route(to) {
      if (to.path !== '/login') {
        let obj = {
          name: to.name,
          title: to.meta.title,
        }
        this.$store.commit('ADD_TAB', obj)
      }
    }
  },
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
</style>
