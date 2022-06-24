<template>
  <el-dialog
    title="分配角色"
    :visible.sync="dialogFormVisible"
    width="600px"
    @closed="resetForm('userRoleForm')"
    :close-on-click-modal="false"
  >
    <el-form
      :model="userRoleForm"
      ref="userRoleForm"
    >
      <el-tree
        :data="roleTree"
        show-checkbox
        ref="roleTree"
        node-key="roleId"
        :check-strictly="checkStrictly"
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
        @click="userRole"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserRole',
  data() {
    return {
      dialogFormVisible: false,
      userRoleForm: {},
      roleTree: [],
      defaultProps: {
        children: 'children',
        label: 'roleName'
      },
      checkStrictly: true,
    }
  },
  mounted() {
    this.$bus.$on('UserRole', row => {
      this.dialogFormVisible = true;
      this.userRoleForm = row;

      this.$axios.get('/hrms/sys/role/getRoleList', {
        params: {
          roleName: '',
          valiFlag: '1',
          current: 1,
          size: 10
        }
      }).then(res => {
        this.roleTree = res.data.data.records
        this.$refs.roleTree.setCheckedKeys(row.roleIds);
      })
    })
  },
  methods: {
    userRole() {
      var roleIds = this.$refs.roleTree.getCheckedKeys()
      this.$axios.post("/hrms/employee/assignRoles/" + this.userRoleForm.empId, roleIds).then(() => {
        this.$message.success('分配角色成功')
        this.$store.state.menu.hasRoute = false;
        this.$bus.$emit('refreshEmployeeList')
        this.dialogFormVisible = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.roleTree = {}
    },
  },
}
</script>

<style>
</style>