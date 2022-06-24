<template>
  <el-dialog
    title="部门职位信息详情"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <el-form
      :model="detailForm"
      :disabled="true"
    >
      <el-form-item
        label="部门名称"
        prop="deptName"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="detailForm.deptName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="position"
        label="部门职位"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="detailForm.position"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="valiFlag"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="detailForm.valiFlag">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="创建时间"
        prop="createTime"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="detailForm.createTime"
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
        @click="dialogFormVisible = false"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DepartmentDetail',
  data() {
    return {
      dialogFormVisible: false,
      detailForm: {},
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.$bus.$on('departmentDetail', row => {
      this.dialogFormVisible = true;
      this.detailForm = row;
    });
  },
  beforeDestroy() {
    this.$bus.$off('departmentDetail');
  },
};
</script>