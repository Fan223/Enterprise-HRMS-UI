<template>
  <el-dialog
    title="添加考勤单信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @close="resetForm('addForm')"
  >
    <el-form
      :model="searchForm"
      :inline="true"
      class="demo-form-inline"
      ref="searchForm"
    >
      <el-form-item
        label="员工姓名"
        prop="empName"
      >
        <el-input
          v-model="searchForm.empName"
          placeholder="输入员工姓名"
          clearable
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="getEmpByName"
          icon="el-icon-search"
        >查询</el-button>
        <el-button
          size="small"
          @click="() => this.$refs['searchForm'].resetFields()"
          icon="el-icon-refresh-right"
        >重置</el-button>
      </el-form-item>
    </el-form>
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
          disabled
          v-model="addForm.empName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="基础工资"
        :label-width="formLabelWidth"
        prop="baseSal"
      >
        <el-input
          disabled
          v-model="addForm.baseSal"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="绩效工资"
        :label-width="formLabelWidth"
        prop="meritpay"
      >
        <el-input
          v-model="addForm.meritpay"
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
        @click="salaryAdd"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'SalaryAdd',
  data() {
    return {
      searchForm: {
        empName: '',
      },
      dialogFormVisible: false,
      addForm: {
        empName: '',
        baseSal: '',
      },
      formLabelWidth: '80px',
    };
  },
  mounted() {
    this.$bus.$on('salaryAdd', () => {
      this.dialogFormVisible = true
    });
  },
  methods: {
    salaryAdd() {
      this.$axios.post('/hrms/salary/addSalary', this.addForm).then(() => {
        this.$message.success('提交考勤单成功');
        this.$bus.$emit('refreshSalaryList');
        this.dialogFormVisible = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getEmpByName() {
      this.$axios.get('/hrms/employee/getEmpByName', {
        params: {
          empName: this.searchForm.empName,
        },
      }).then((res) => {
        this.addForm.empName = res.data.data.empName;

        this.$axios.get('/hrms/salary/getSalaryInfo', {
          params: {
            empId: res.data.data.empId,
          }
        }).then(res => {
          this.addForm.baseSal = res.data.data.baseSal;
        })
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off('salaryAdd');
  },
};
</script>

<style scoped>
.el-input {
  width: 90%;
}
</style>