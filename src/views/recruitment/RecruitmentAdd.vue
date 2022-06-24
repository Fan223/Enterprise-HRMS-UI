<template>
  <el-dialog
    title="添加招聘信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @close="resetForm('addForm')"
  >
    <el-form
      :model="addForm"
      ref="addForm"
    >
      <el-form-item
        label="招聘信息"
        :label-width="formLabelWidth"
        prop="recrTitle"
      >
        <el-input
          v-model="addForm.recrTitle"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="招聘要求"
        :label-width="formLabelWidth"
        prop="recrRequire"
      >
        <el-input
          v-model="addForm.recrRequire"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="招聘人数"
        :label-width="formLabelWidth"
        prop="recrNumber"
      >
        <el-input
          v-model="addForm.recrNumber"
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
  name: 'RecruitmentAdd',
  data() {
    return {
      dialogFormVisible: false,
      addForm: {},
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.$bus.$on('recruitmentAdd', () => {
      this.dialogFormVisible = true
    });
  },
  methods: {
    recruitmentAdd() {
      this.$axios.post('/hrms/recruitment/addRecruitment', this.addForm).then(() => {
        this.$message.success('添加招聘信息成功');
        this.$bus.$emit('refreshRecruitmentList');
        this.dialogFormVisible = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  beforeDestroy() {
    this.$bus.$off('recruitmentAdd');
  },
};
</script>