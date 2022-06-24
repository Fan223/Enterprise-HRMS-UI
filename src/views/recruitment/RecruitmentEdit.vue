<template>
  <el-dialog
    title="修改招聘信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @close="resetForm"
  >
    <el-form :model="editForm">
      <el-form-item
        label="招聘信息"
        prop="recrTitle"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="editForm.recrTitle"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="招聘要求"
        prop="recrRequire"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="editForm.recrRequire"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="招聘人数"
        prop="recrNumber"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="editForm.recrNumber"
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
        @click="recruitmentEdit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'RecruitmentEdit',
  data() {
    return {
      dialogFormVisible: false,
      editForm: {},
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.$bus.$on('recruitmentEdit', row => {
      this.dialogFormVisible = true;
      this.editForm = row;
    });
  },
  methods: {
    recruitmentEdit() {
      this.dialogFormVisible = false;
      this.$axios.put('/hrms/recruitment/updateRecruitment', this.editForm).then(() => {
        this.$message.success('修改招聘信息成功');
        this.dialogFormVisible = false;
      });
    },
    resetForm() {
      this.editForm = {};
      this.$emit('refreshRecruitmentList');
    },
  },
  beforeDestroy() {
    this.$bus.$off('recruitmentEdit');
  },
};
</script>