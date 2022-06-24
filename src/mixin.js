export default {
  methods: {
    hasAuth(permission) {
       var permissionList = this.$store.state.menu.permissionList
       return permissionList.indexOf(permission) > -1
    }
 }
}