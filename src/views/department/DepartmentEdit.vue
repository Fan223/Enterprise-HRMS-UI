<template>
  <el-dialog
    title="修改部门职位信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @close="resetForm"
  >
    <el-form :model="editForm">
      <el-form-item
        label="部门名称"
        prop="deptName"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="editForm.deptName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="position"
        label="部门职位"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="editForm.position"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="valiFlag"
        :label-width="formLabelWidth"
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
        @click="departmentEdit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'DepartmentEdit',
  data() {
    return {
      dialogFormVisible: false,
      editForm: {},
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.$bus.$on('departmentEdit', row => {
      this.dialogFormVisible = true;
      this.editForm = row;
    });
  },
  methods: {
    departmentEdit() {
      this.$axios.put('/hrms/department/updateDepartment', this.editForm).then(() => {
        this.$message.success('修改招聘信息成功');
        this.dialogFormVisible = false;
      });
    },
    resetForm() {
      this.editForm = {};
      this.$bus.$emit('refreshDepartmentList');
    },
  },
  beforeDestroy() {
    this.$bus.$off('departmentEdit');
  },
};
</script>