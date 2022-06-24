<template>
  <el-dialog
    class="el-dialog-employee"
    title="添加员工信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @close="resetForm('addForm')"
  >
    <el-form
      :model="addForm"
      ref="addForm"
    >
      <el-form-item
        label="姓名"
        :label-width="formLabelWidth"
        prop="empName"
      >
        <el-input
          v-model="addForm.empName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="性别"
        :label-width="formLabelWidth"
        prop="gender"
      >
        <el-radio-group v-model="addForm.gender">
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
          v-model="addForm.idcardNo"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        :label-width="formLabelWidth"
        prop="phone"
      >
        <el-input
          v-model="addForm.phone"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="地址"
        :label-width="formLabelWidth"
        prop="address"
      >
        <el-input
          v-model="addForm.address"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        :label-width="formLabelWidth"
        prop="email"
      >
        <el-input
          v-model="addForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="部门"
        :label-width="formLabelWidth"
        prop="deptId"
      >
        <el-input
          v-model="addForm.deptId"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="备注"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-input
          v-model="addForm.remark"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="employeeAdd"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'EmployeeAdd',
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        gender: '男'
      },
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.$bus.$on('employeeAdd', () => {
      this.dialogFormVisible = true;
    });
  },
  methods: {
    employeeAdd() {
      this.$axios.post('/hrms/employee/addEmployee', this.addForm).then(() => {
        this.$message.success('添加员工成功');
        this.$bus.$emit('refreshEmployeeList');
        this.dialogFormVisible = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  beforeDestroy() {
    this.$bus.$off('employeeAdd');
  },
};
</script>
<style scoped>
.el-dialog-employee {
  height: 100%;
  margin-top: -80px;
  overflow: hidden;
}
</style>