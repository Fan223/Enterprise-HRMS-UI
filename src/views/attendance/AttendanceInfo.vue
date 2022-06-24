<template>
  <div>
    <div class="mainHeader">
      <el-form
        :model="searchForm"
        :inline="true"
        class="demo-form-inline"
        size="small"
        ref="searchForm"
        @keyup.enter.native="getAttendance"
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
        <el-form-item
          label="考勤类型"
          prop="attType"
        >
          <el-select
            v-model="searchForm.attType"
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
          prop="attTime"
        >
          <div class="block">
            <el-date-picker
              v-model="searchForm.attTime"
              type="daterange"
              align="center"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="getAttendance"
            icon="el-icon-search"
          >查询</el-button>
          <el-button
            size="small"
            @click="() => this.$refs['searchForm'].resetFields()"
            icon="el-icon-refresh-right"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mainBody">
      <el-row
        type="flex"
        justify="space-between"
        class="mainMessage"
      >
        <el-col class="mainMessageLeft">
          <div><b>查询结果</b></div>
        </el-col>
      </el-row>
      <AttendanceAdd />
      <template>
        <el-table
          class="mainTable"
          border
          :fit="true"
          :data="attendanceList"
          ref="multipleTable"
          :header-cell-style="{background:'#ddd'}"
          max-height="450"
          :default-sort="{prop: 'createTime', order: 'ascending'}"
        >
          <el-table-column
            align="center"
            label="序号"
            width="70"
            type="index"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="empName"
            label="员工名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="考勤时间"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="attDay"
            label="考勤日期"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="puchTime"
            label="打卡时间"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            prop="attType"
            label="状态"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.attType === 0"
                size="small"
                type="danger"
              >旷工</el-tag>
              <el-tag
                v-else-if="scope.row.attType === 1"
                size="small"
                type="success"
              >正常</el-tag>
              <el-tag
                v-else-if="scope.row.attType === 2"
                size="small"
                type="warning"
              >事假</el-tag>
              <el-tag
                v-else-if="scope.row.attType === 3"
                size="small"
                type="info"
              >病假</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="remark"
            label="备注"
          >
          </el-table-column>
        </el-table>
        <AttendanceEdit />
        <AttendanceDetail />
      </template>
      <el-pagination
        class="mainPagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import '../../assets/css/mainStyle.css'
import AttendanceEdit from './AttendanceEdit.vue'
import AttendanceDetail from './AttendanceDetail.vue'
import AttendanceAdd from './AttendanceAdd.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Attendance',
  data() {
    return {
      searchForm: {
        empName: '',
        attType: '',
        attTime: '',
      },
      attendanceList: [],
      dialogFormVisible: false,
      current: 1,
      size: 10,
      total: 0,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      options: [
        {
          value: 3,
          label: '病假'
        },
        {
          value: 2,
          label: '事假'
        },
        {
          value: 1,
          label: '正常'
        },
        {
          value: 0,
          label: '旷工'
        },
      ],
    }
  },
  methods: {
    getAttendance() {

      this.$axios.get('/hrms/attendance/getAttendance', {
        params: {
          empName: this.searchForm.empName,
          attType: this.searchForm.attType,
          startTime: this.searchForm.attTime[0],
          endTime: this.searchForm.attTime[1],
          pageNum: this.current,
          pageSize: this.size
        }
      }).then(res => {

        if (res.data.data !== null) {

          this.attendanceList = res.data.data.records
          this.current = res.data.data.current;
          this.size = res.data.data.size;
          this.total = res.data.data.total;

          this.attendanceList.forEach(attendance => {
            let dayNum = new Date(attendance.createTime).getDay();
            attendance.attDay = this.getAttDay(dayNum);
          })
        } else {
          this.attendanceList = res.data.data
        }
      }
      )
    },
    getAttDay(dayNum) {
      switch (dayNum) {
        case 0:
          return '星期日';
        case 1:
          return '星期一';
        case 2:
          return '星期二';
        case 3:
          return '星期三';
        case 4:
          return '星期四';
        case 5:
          return '星期五';
        case 6:
          return '星期六';
      }
    },
    attendanceAdd() {
      this.$bus.$emit('attendanceAdd');
    },
    attendanceEdit(row) {
      this.$bus.$emit('attendanceEdit', row);
    },
    handleSizeChange(val) {
      this.size = val
      this.getAttendance()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getAttendance()
    },
  },
  mounted() {
    this.$bus.$on('refreshAttendanceList', () => {
      this.getAttendance();
    });
  },
  components: {
    AttendanceEdit,
    AttendanceDetail,
    AttendanceAdd
  },
}
</script>

<style>
.demo-form-inline {
  padding-left: 20px;
  padding-top: 20px;
}
.el-form-item {
  margin-left: 20px;
}
</style>