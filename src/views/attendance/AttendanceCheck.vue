<template>
  <el-dialog
    title="修改考勤单信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <el-form
      :model="checkForm"
      disabled
    >
      <el-form-item
        label="姓名"
        :label-width="formLabelWidth"
        prop="empName"
      >
        <el-input
          v-model="checkForm.empName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="考勤类型"
        :label-width="formLabelWidth"
        prop="attType"
      >
        <el-select
          v-model="checkForm.attType"
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
            v-model="checkForm.attTime"
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
          v-model="checkForm.remark"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="attendanceCheck(checkForm.checkStatus = 1)"
      >审核通过</el-button>
      <el-button
        type="danger"
        @click="attendanceCheck(checkForm.checkStatus = 2)"
      >审核不通过</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'AttendanceCheck',
  data() {
    return {
      dialogFormVisible: false,
      checkForm: {
        attTime: '',
      },
      formLabelWidth: '120px',
      options: [
        {
          value: 3,
          label: '病假'
        },
        {
          value: 2,
          label: '事假'
        },
      ],
    };
  },
  mounted() {
    this.$bus.$on('attendanceCheck', row => {
      this.dialogFormVisible = true;
      this.checkForm = row;
      this.checkForm.attTime = [row.startTime, row.endTime]
    });
  },
  methods: {
    attendanceCheck() {
      this.$axios.post('/hrms/attendance/checkAttendanceSheet', this.checkForm).then(() => {
        this.$message.success('审核考勤信息成功');
        this.dialogFormVisible = false;
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off('attendanceCheck');
  },
};
</script>