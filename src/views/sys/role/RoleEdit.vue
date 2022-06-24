<template>
  <el-dialog
    title="角色信息"
    :visible.sync="dialogFormVisible"
    width="600px"
    @close="resetForm"
    :close-on-click-modal="false"
  >
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editForm"
    >
      <el-form-item
        label="角色名称"
        prop="roleName"
        label-width="100px"
      >
        <el-input
          v-model="editForm.roleName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="唯一编码"
        prop="code"
        label-width="100px"
      >
        <el-input
          v-model="editForm.code"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="remark"
        label-width="100px"
      >
        <el-input
          v-model="editForm.remark"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="valiFlag"
        label-width="100px"
      >
        <el-radio-group v-model="editForm.valiFlag">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="updateRole('editForm')"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'RoleEdit',
  data() {
    return {
      dialogFormVisible: false,
      editForm: {},
      editFormRules: {
        roleName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入唯一编码', trigger: 'blur' }
        ],
        valiFlag: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    updateRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('/hrms/sys/role/updateRole', this.editForm).then(() => {
            this.$message.success('修改角色成功')
            this.dialogFormVisible = false;
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.editForm = {};
      this.$bus.$emit('refreshRoleList')
    },
  },
  mounted() {
    this.$bus.$on('RoleEdit', row => {
      this.dialogFormVisible = true
      this.editForm = row
    })
  },
}
</script>

<style>
</style>