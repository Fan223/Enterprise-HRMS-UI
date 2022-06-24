<template>
  <div>
    <div class="mainHeader">
      <el-form
        :model="searchForm"
        :inline="true"
        class="demo-form-inline"
        size="small"
        ref="searchForm"
        @keyup.enter.native="getSalary"
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
          label="月份"
          prop="salMonth"
        >
          <div class="block">
            <el-date-picker
              v-model="searchForm.salMonth"
              type="month"
              placeholder="选择月份"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="getSalary"
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
          style="margin-right: 7px;"
        >
          <div>
            <el-button
              type="primary"
              size="small"
              @click="salaryAdd"
            >新增</el-button>
            <el-button
              type="success"
              size="small"
              @click="exportExcel"
            >导出</el-button>
          </div>
        </el-col>
      </el-row>
      <SalaryAdd />
      <template>
        <el-table
          class="mainTable"
          id="out-table"
          border
          :fit="true"
          :data="salaryList"
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
            prop="baseSal"
            label="基础工资"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="meritpay"
            label="绩效工资"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="时间"
          >
          </el-table-column>
        </el-table>
        <SalaryDetail />
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
import SalaryDetail from './SalaryDetail.vue'
import SalaryAdd from './SalaryAdd.vue'

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'salaryList',
  data() {
    return {
      searchForm: {
        empName: '',
        salMonth: '',
      },
      salaryList: [],
      dialogFormVisible: false,
      current: 1,
      size: 10,
      total: 0,
    }
  },
  methods: {
    getSalary() {
      this.$axios.get('/hrms/salary/getSalary', {
        params: {
          empName: this.searchForm.empName,
          salMonth: this.searchForm.salMonth,
          pageNum: this.current,
          pageSize: this.size
        }
      }).then(res => {

        if (res.data.data !== null) {
          this.salaryList = res.data.data.records
          this.current = res.data.data.current;
          this.size = res.data.data.size;
          this.total = res.data.data.total;
        } else {
          this.salaryList = res.data.data
        }
      })
    },
    salaryAdd() {
      this.$bus.$emit('salaryAdd');
    },
    handleSizeChange(val) {
      this.size = val
      this.getSalary()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getSalary()
    },
    exportExcel() {
      /* 从表生成工作簿对象 */
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          //设置导出文件名称
          'sheetjs.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  },
  mounted() {
    this.$bus.$on('refreshSalaryList', () => {
      this.getSalary();
    });
  },
  components: {
    SalaryDetail,
    SalaryAdd
  },
}
</script>

<style>
</style>