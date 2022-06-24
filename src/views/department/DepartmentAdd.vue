<template>
  <el-dialog
    title="添加部门职位信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @close="resetForm('addForm')"
  >
    <el-form
      :model="addForm"
      ref="addForm"
    >
      <el-form-item
        label="部门名称"
        :label-width="formLabelWidth"
        prop="deptName"
      >
        <el-input
          v-model="addForm.deptName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="部门职位"
        :label-width="formLabelWidth"
        prop="position"
      >
        <el-input
          v-model="addForm.position"
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
        @click="recruitmentAdd"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'DepartmentAdd',
  data() {
    return {
      dialogFormVisible: false,
      addForm: {},
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.$bus.$on('departmentAdd', () => {
      this.dialogFormVisible = true
    });
  },
  methods: {
    recruitmentAdd() {
      this.$axios.post('/hrms/department/addDepartment', this.addForm).then(() => {
        this.$message.success('添加部门职位信息成功');
        this.$bus.$emit('refreshDepartmentList');
        this.dialogFormVisible = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  beforeDestroy() {
    this.$bus.$off('departmentAdd');
  },
};
</script>