<template>
  <el-dialog
    title="角色信息"
    :visible.sync="dialogFormVisible"
    width="600px"
    @close="resetForm('addForm')"
    :close-on-click-modal="false"
  >
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addForm"
    >
      <el-form-item
        label="角色名称"
        prop="roleName"
        label-width="100px"
      >
        <el-input
          v-model="addForm.roleName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="唯一编码"
        prop="code"
        label-width="100px"
      >
        <el-input
          v-model="addForm.code"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="remark"
        label-width="100px"
      >
        <el-input
          v-model="addForm.remark"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="valiFlag"
        label-width="100px"
      >
        <el-radio-group v-model="addForm.valiFlag">
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
        @click="submitAddForm('addForm')"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'RoleAdd',
  data() {
    return {
      dialogFormVisible: false,
      addForm: {},
      addFormRules: {
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
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/hrms/sys/role/addRole', this.addForm).then(() => {
            this.$message.success('添加角色成功')
            this.dialogFormVisible = false;
            this.$bus.$emit('refreshRoleList')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.$bus.$on('roleAdd', () => {
      this.dialogFormVisible = true
    })
  },
}
</script>

<style>
</style>