<template>
  <el-dialog
    title="修改员工信息"
    class="el-dialog-employee"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @close="resetForm"
  >
    <el-form
      :model="editForm"
      ref="editForm"
    >
      <el-form-item
        label="姓名"
        :label-width="formLabelWidth"
        prop="empName"
      >
        <el-input
          v-model="editForm.empName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="性别"
        :label-width="formLabelWidth"
        prop="gender"
      >
        <el-radio-group v-model="editForm.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="身份证号"
        :label-width="formLabelWidth"
        prop="idcardNo"
      >
        <el-input
          v-model="editForm.idcardNo"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        :label-width="formLabelWidth"
        prop="phone"
      >
        <el-input
          v-model="editForm.phone"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="地址"
        :label-width="formLabelWidth"
        prop="editress"
      >
        <el-input
          v-model="editForm.address"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        :label-width="formLabelWidth"
        prop="email"
      >
        <el-input
          v-model="editForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="部门"
        :label-width="formLabelWidth"
        prop="deptId"
      >
        <el-input
          v-model="editForm.deptId"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="备注"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-input
          v-model="editForm.remark"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="valiFlag"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="editForm.valiFlag">
          <el-radio :label="0">离职</el-radio>
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
        @click="employeeEdit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'EmployeeEdit',
  data() {
    return {
      dialogFormVisible: false,
      editForm: {},
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.$bus.$on('employeeEdit', row => {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.editForm = row;
    });
  },
  methods: {
    employeeEdit() {
      this.$axios.put('/hrms/employee/updateEmployee', this.editForm).then(() => {
        this.$message.success('修改员工信息成功');
        this.dialogFormVisible = false;
      })
    },
    resetForm() {
      this.editForm = {};
      this.$bus.$emit('refreshEmployeeList');
    },
  },
  beforeDestroy() {
    this.$bus.$off('employeeEdit');
  },
};
</script>
<style scoped>
.el-dialog-employee {
  margin-top: -80px;
}
</style>