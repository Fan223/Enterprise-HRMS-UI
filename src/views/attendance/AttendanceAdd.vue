<template>
  <el-dialog
    title="添加考勤单信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @close="resetForm('addForm')"
  >
    <el-form
      :model="addForm"
      :rules="addFormRules"
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
        label="考勤类型"
        :label-width="formLabelWidth"
        prop="attType"
      >
        <el-select
          v-model="addForm.attType"
          placeholder="请选择考勤类型"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="日期"
        :label-width="formLabelWidth"
        prop="attTime"
      >
        <div class="block">
          <el-date-picker
            v-model="addForm.attTime"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item
        label="事由"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
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
        @click="attendanceAdd"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'AttendanceAdd',
  data() {
    return {
      dialogFormVisible: false,
      addForm: {},
      formLabelWidth: '80px',
      addFormRules: {
        empName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        attTime: [
          { required: true, message: '请选择日期', trigger: 'blur' },
        ],
        remark: [
          { required: true, message: '请输入事由', trigger: 'blur' },
        ],
      },
      options: [
        {
          value: '3',
          label: '病假'
        },
        {
          value: '2',
          label: '事假'
        },
      ],
    };
  },
  mounted() {
    this.$bus.$on('attendanceAdd', () => {
      this.dialogFormVisible = true
    });
  },
  methods: {
    attendanceAdd() {
      this.addForm.startTime = this.addForm.attTime[0];
      this.addForm.endTime = this.addForm.attTime[1];

      this.$axios.post('/hrms/attendance/addAttendanceSheet', this.addForm).then(() => {
        this.$message.success('提交考勤单成功');
        this.$bus.$emit('refreshAttendanceList');
        this.dialogFormVisible = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  beforeDestroy() {
    this.$bus.$off('attendanceAdd');
  },
};
</script>

<style scoped>
.el-input {
  width: 90%;
}
</style>