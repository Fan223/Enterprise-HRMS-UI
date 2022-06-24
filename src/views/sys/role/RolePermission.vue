<template>
  <el-dialog
    title="分配权限"
    class="el-dialog-role"
    :visible.sync="dialogFormVisible"
    width="600px"
    :close-on-click-modal="false"
    @closed="resetForm('permissionForm')"
  >
    <el-form
      :model="permissionForm"
      ref="permissionForm"
    >
      <el-tree
        :data="permissionTree"
        show-checkbox
        ref="permissionTree"
        :check-strictly="checkStrictly"
        node-key="menuId"
        :default-expand-all=true
        :props="defaultProps"
      >
      </el-tree>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="rolePermission"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'RolePermission',
  data() {
    return {
      dialogFormVisible: false,
      permissionTree: [],
      permissionForm: {},
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      checkStrictly: true,
    }
  },
  methods: {
    rolePermission() {
      var menuIds = this.$refs.permissionTree.getCheckedKeys();
      // menuIds = menuIds.concat(this.$refs.permTree.getHalfCheckedKeys()) // 半选中状态的父节点
      this.$axios.post("/hrms/sys/role/assignPermissions/" + this.permissionForm.roleId, menuIds).then(() => {
        this.$message.success("分配权限成功");
        this.$bus.$emit("refreshRoleList");
        this.$store.state.menu.hasRoute = false;
        this.dialogFormVisible = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.$bus.$on('RolePermission', row => {
      this.dialogFormVisible = true;
      this.permissionForm = row;
      this.$axios.get("/hrms/sys/menu/getMenuList?valiFlag=1").then(res => {
        this.permissionTree = res.data.data;
        this.$refs.permissionTree.setCheckedKeys(row.menuIds);
      })
    })
  }
}
</script>

<style scoped>
.el-dialog-role {
  width: 100%;
  margin-top: -90px;
}
</style>