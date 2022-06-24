<template>
  <div>
    <div class="mainHeader">
      <el-form
        :model="searchForm"
        :inline="true"
        class="demo-form-inline"
        size="small"
        ref="searchForm"
        @keyup.enter.native="getAttendanceSheet"
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
            @click="getAttendanceSheet"
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
        <el-col
          :span="4"
          class="mainMessageRight"
        >
          <div>
            <el-button
              size="small"
              type="primary"
              @click="attendanceAdd"
            >
              新增
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="attendanceDelete(null)"
              :disabled="delBatchBtn"
            >删除选中</el-button>
          </div>
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
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#ddd'}"
          max-height="450"
          :default-sort="{prop: 'deptName', order: 'ascending'}"
        >
          <el-table-column
            align="center"
            type="selection"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="empName"
            label="员工姓名"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            prop="attType"
            label="考勤类型"
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
            prop="startTime"
            label="起始时间"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="endTime"
            label="结束时间"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="remark"
            label="事由"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            width="180"
            label="提交时间"
          >
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="320"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                :disabled="scope.row.checkStatus === 1"
                @click="attendanceEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                :disabled="scope.row.checkStatus === 1"
                @click="attendanceDelete(scope.row.attShId)"
              >删除</el-button>
              <el-button
                size="small"
                type="success"
                @click="attendanceDetail(scope.row)"
              >详情</el-button>
              <el-button
                size="small"
                type="primary"
                v-if="scope.row.checkStatus === 0"
                :disabled="scope.row.checkStatus !== 0"
                @click="attendanceCheck(scope.row)"
              >审核</el-button>
              <el-button
                size="small"
                type="primary"
                v-if="scope.row.checkStatus === 1"
                :disabled="scope.row.checkStatus == 1"
              >审核通过</el-button>
              <el-button
                size="small"
                type="danger"
                v-if="scope.row.checkStatus === 2"
                :disabled="scope.row.checkStatus === 2"
              >审核不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
        <AttendanceEdit />
        <AttendanceDetail />
        <AttendanceCheck />
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
import AttendanceCheck from './AttendanceCheck.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Attendance',
  data() {
    return {
      searchForm: {
        empName: '',
        attTime: '',
      },
      attendanceList: [],
      dialogFormVisible: false,
      multipleSelection: [],
      current: 1,
      size: 10,
      total: 0,
      delBatchBtn: true,
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
    }
  },
  methods: {
    getAttendanceSheet() {
      this.$axios.get('/hrms/attendance/getAttendanceSheet', {
        params: {
          empName: this.searchForm.empName,
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
        } else {
          this.attendanceList = res.data.data
        }
      }
      )
    },
    attendanceAdd() {
      this.$bus.$emit('attendanceAdd');
    },
    attendanceEdit(row) {
      this.$bus.$emit('attendanceEdit', row);
    },
    attendanceDelete(attShId) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var attShIds = []
        attShId ? attShIds.push(attShId) : this.multipleSelection.forEach(row => {
          attShIds.push(row.attShId)
        })

        this.$axios.delete('/hrms/attendance/deleteAttendanceSheet', {
          data: {
            attShIds: attShIds
          }
        }).then(() => {
          this.getAttendanceSheet();
        })
      }).catch(() => {
        this.$message.success('已取消删除');
      })
    },
    attendanceCheck(row) {
      this.$bus.$emit('attendanceCheck', row);
    },
    attendanceDetail(row) {
      this.$bus.$emit('attendanceDetail', row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delBatchBtn = val.length == 0
    },
    handleSizeChange(val) {
      this.size = val
      this.getAttendanceSheet()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getAttendanceSheet()
    },
  },
  mounted() {
    this.$bus.$on('refreshAttendanceList', () => {
      this.getAttendanceSheet();
    });
  },
  components: {
    AttendanceEdit,
    AttendanceDetail,
    AttendanceAdd,
    AttendanceCheck
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