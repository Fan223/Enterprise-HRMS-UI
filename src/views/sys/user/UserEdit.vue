<template>
  <el-dialog
    title="用户信息"
    :visible.sync="dialogFormVisible"
    width="600px"
    @closed="resetForm('editForm')"
    :close-on-click-modal="false"
  >
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editForm"
    >
      <el-form-item
        label="用户名"
        prop="empName"
        label-width="100px"
      >
        <el-input
          v-model="editForm.empName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="工号"
        prop="empCode"
        label-width="100px"
      >
        <el-input
          v-model="editForm.empCode"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="身份证号"
        prop="idcardNo"
        label-width="100px"
      >
        <el-input
          v-model="editForm.idcardNo"
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
        @click="updateEmployee('editForm')"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserEdit',
  data() {
    return {
      editForm: {},
      dialogFormVisible: false,
      editFormRules: {
        empName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        empCode: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        valiFlag: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
    }
  },
  mounted() {
    this.$bus.$on('UserEdit', row => {
      this.dialogFormVisible = true;
      this.editForm = row
    })
  },
  methods: {
    updateEmployee(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('/hrms/employee/updateEmployee', this.editForm).then(() => {
            this.$message.success('修改成功')
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
      this.$bus.$emit('refreshEmployeeList')
    },
  },
}
</script>