<template>
  <el-dialog
    title="修改考勤单信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @close="resetForm"
  >
    <el-form :model="editForm">
      <el-form-item
        label="姓名"
        :label-width="formLabelWidth"
        prop="empName"
      >
        <el-input
          v-model="editForm.empName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="考勤类型"
        :label-width="formLabelWidth"
        prop="attType"
      >
        <el-select
          v-model="editForm.attType"
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
            v-model="editForm.attTime"
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
          v-model="editForm.remark"
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
        @click="attendanceEdit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'AttendanceEdit',
  data() {
    return {
      dialogFormVisible: false,
      editForm: {
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
    this.$bus.$on('attendanceEdit', row => {
      this.dialogFormVisible = true;
      this.editForm = row;
      this.$set(this.editForm, 'attTime', [row.startTime, row.endTime])
    });
  },
  methods: {
    attendanceEdit() {

      this.editForm.startTime = this.editForm.attTime[0];
      this.editForm.endTime = this.editForm.attTime[1];

      this.$axios.put('/hrms/attendance/updateAttendanceSheet', this.editForm).then(() => {
        this.$message.success('修改考勤信息成功');
        this.dialogFormVisible = false;
      });
    },
    resetForm() {
      this.editForm = {
        attTime: '',
      };
      this.$bus.$emit('refreshAttendanceList');
    },
  },
  beforeDestroy() {
    this.$bus.$off('attendanceEdit');
  },
};
</script>