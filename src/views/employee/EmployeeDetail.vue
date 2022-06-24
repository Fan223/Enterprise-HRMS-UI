<template>
  <el-dialog
    title="员工信息详情"
    class="el-dialog-employee"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <el-form
      :model="empDetailForm"
      ref="empDetailForm"
      :disabled="true"
    >
      <el-form-item
        label="姓名"
        :label-width="formLabelWidth"
        prop="empName"
      >
        <el-input
          v-model="empDetailForm.empName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="性别"
        :label-width="formLabelWidth"
        prop="gender"
      >
        <el-radio-group v-model="empDetailForm.gender">
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
          v-model="empDetailForm.idcardNo"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        :label-width="formLabelWidth"
        prop="phone"
      >
        <el-input
          v-model="empDetailForm.phone"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="地址"
        :label-width="formLabelWidth"
        prop="address"
      >
        <el-input
          v-model="empDetailForm.address"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        :label-width="formLabelWidth"
        prop="email"
      >
        <el-input
          v-model="empDetailForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="部门"
        :label-width="formLabelWidth"
        prop="deptId"
      >
        <el-input
          v-model="empDetailForm.deptId"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="备注"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-input
          v-model="empDetailForm.remark"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="valiFlag"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="empDetailForm.valiFlag">
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
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'EmployeeDetail',
  data() {
    return {
      dialogFormVisible: false,
      empDetailForm: {},
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.$bus.$on('employeeDetail', row => {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.empDetailForm = row;
    });
  },
  beforeDestroy() {
    this.$bus.$off('employeeDetail');
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