<template>
  <el-dialog
    title="招聘信息详情"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <el-form
      :model="detailForm"
      :disabled="true"
    >
      <el-form-item
        label="招聘信息"
        prop="recrTitle"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="detailForm.recrTitle"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="招聘要求"
        prop="recrRequire"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="detailForm.recrRequire"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="招聘人数"
        prop="recrNumber"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="detailForm.recrNumber"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="发布时间"
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
  name: 'RecruitmentDetail',
  data() {
    return {
      dialogFormVisible: false,
      detailForm: {},
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.$bus.$on('recruitmentDetail', row => {
      this.dialogFormVisible = true;
      this.detailForm = row;
    });
  },
  beforeDestroy() {
    this.$bus.$off('recruitmentDetail');
  },
};
</script>