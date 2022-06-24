<template>
  <div>
    <div class="mainHeader">
      <el-form
        :model="searchForm"
        :inline="true"
        class="demo-form-inline"
        size="small"
        ref="searchForm"
        @keyup.enter.native="getEmployeeList"
      >
        <el-form-item
          label="姓名"
          prop="empName"
        >
          <el-input
            v-model="searchForm.empName"
            placeholder="请输入姓名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="工号"
          prop="empCode"
        >
          <el-input
            v-model="searchForm.empCode"
            placeholder="请输入工号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="状态"
          prop="valiFlag"
        >
          <el-select
            v-model="searchForm.valiFlag"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="option in searchForm.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="getEmployeeList"
            icon="el-icon-search"
          >查询</el-button>
          <el-button
            @click="() => this.$refs['searchForm'].resetFields()"
            icon="el-icon-refresh-right"
            size="small"
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
              @click="employeeAdd"
              v-if="hasAuth('employee:add')"
            >
              新增
            </el-button>
            <el-button
              size="small"
              type="danger"
              :disabled="delBatchBtn"
              @click="employeeDelete(null)"
              v-if="hasAuth('employee:delete')"
            >删除选中</el-button>
          </div>
        </el-col>
      </el-row>
      <EmployeeAdd />
      <template>
        <el-table
          class="mainTable"
          border
          :fit="true"
          :data="employeeList"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#ddd'}"
          max-height="420"
          :default-sort="{prop: 'empCode', order: 'ascending'}"
        >
          <el-table-column
            type="selection"
            align="center"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="empCode"
            label="工号"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="empName"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="gender"
            label="性别"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            prop="idcardNo"
            label="身份证号"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="phone"
            label="手机号"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="地址"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="deptId"
            label="部门"
          >
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="employeeEdit(scope.row)"
                v-if="hasAuth('employee:update')"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="employeeDelete(scope.row.empId)"
                :disabled="!scope.row.valiFlag"
                v-if="hasAuth('employee:delete')"
              >删除</el-button>
              <el-button
                size="small"
                type="success"
                @click="employeeDetail(scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <EmployeeEdit />
        <EmployeeDetail />
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
import EmployeeEdit from './EmployeeEdit.vue'
import EmployeeDetail from './EmployeeDetail.vue'
import EmployeeAdd from './EmployeeAdd.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Employee',
  data() {
    return {
      searchForm: {
        empName: '',
        empCode: '',
        valiFlag: '1',
        options: [
          {
            value: '1',
            label: '在职'
          },
          {
            value: '0',
            label: '离职'
          },
        ]
      },
      employeeList: [],
      dialogFormVisible: false,
      multipleSelection: [],
      current: 1,
      size: 10,
      total: 0,
      delBatchBtn: true,
    }
  },
  methods: {
    getEmployeeList() {
      this.$axios.get('/hrms/employee/getEmployeeList', {
        params: {
          empName: this.searchForm.empName,
          empCode: this.searchForm.empCode,
          valiFlag: this.searchForm.valiFlag,
          pageNum: this.current,
          pageSize: this.size
        }
      }).then(res => {
        this.employeeList = res.data.data.records
        this.current = res.data.data.current;
        this.size = res.data.data.size;
        this.total = res.data.data.total;
      }
      )
    },
    employeeAdd() {
      this.$bus.$emit('employeeAdd');
    },
    employeeEdit(row) {
      this.$bus.$emit('employeeEdit', row);
    },
    employeeDelete(empId) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var empIds = []
        empId ? empIds.push(empId) : this.multipleSelection.forEach(row => {
          empIds.push(row.empId)
        })
        this.$axios.delete('/hrms/employee/deleteEmployee', {
          data: {
            empIds: empIds
          }
        }).then(() => {
          this.$message.success('删除成功')
          this.getEmployeeList();
        })
      }).catch(() => {
        this.$message.success('已取消删除');
      })
    },
    employeeDetail(row) {
      this.$bus.$emit('employeeDetail', row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delBatchBtn = val.length == 0
    },
    handleSizeChange(val) {
      this.size = val
      this.getEmployeeList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getEmployeeList()
    },
  },
  mounted() {
    this.$bus.$on('refreshEmployeeList', () => {
      this.getEmployeeList();
    });
  },
  components: {
    EmployeeEdit,
    EmployeeDetail,
    EmployeeAdd
  },
}
</script>