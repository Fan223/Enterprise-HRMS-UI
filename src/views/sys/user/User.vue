<template>
  <div>
    <div class="mainHeader">
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="small"
        :model="searchForm"
        ref="searchForm"
        @submit.native.prevent="getEmployeeList"
      >
        <el-form-item
          label="姓名"
          prop="empName"
        >
          <el-input
            v-model="searchForm.empName"
            placeholder="请输入用户姓名"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="getEmployeeList"
          >查询</el-button>
          <el-button
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
      <el-table
        class="mainTable"
        ref="multipleTable"
        border
        :fit="true"
        :header-cell-style="{background:'#ddd'}"
        max-height="420"
        :data="employeeList"
        :default-sort="{prop: 'empName', order: 'ascending'}"
      >
        <el-table-column
          label="头像"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar
              size="small"
              :src="scope.row.avatar"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="empName"
          label="用户名"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="角色名称"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag
              style="margin-right: 5px;"
              size="small"
              type="info"
              v-for="item in scope.row.sysRoleDOS"
              :key="item.empId"
            >{{item.roleName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="empCode"
          label="工号"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="idcardNo"
          label="身份证号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.valiFlag === 0"
              size="small"
              type="danger"
            >禁用</el-tag>
            <el-tag
              v-else-if="scope.row.valiFlag === 1"
              size="small"
              type="success"
            >正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="userRole(scope.row)"
              v-if="hasAuth('employee:role')"
            >分配角色</el-button>
            <el-button
              size="small"
              type="danger"
              @click="rePassword(scope.row)"
              v-if="hasAuth('employee:resetPassword')"
            >重置密码</el-button>
            <el-button
              size="small"
              type="success"
              @click="userEdit(scope.row)"
              v-if="hasAuth('employee:update')"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <UserEdit />
    <UserRole />
  </div>
</template>

<script>
import '../../../assets/css/mainStyle.css'
import UserEdit from './UserEdit'
import UserRole from './UserRole'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  data() {
    return {
      searchForm: {
        empName: ''
      },
      current: 1,
      total: 0,
      size: 10,
      dialogFormVisible: false,
      employeeList: [],
    }
  },
  methods: {
    getEmployeeList() {
      this.$axios.get('/hrms/employee/getEmployeeList', {
        params: {
          empName: this.searchForm.empName,
          pageNum: this.current,
          pageSize: this.size,
          valiFlag: 1
        }
      }).then(res => {
        this.employeeList = res.data.data.records
        this.current = res.data.data.current
        this.size = res.data.data.size
        this.total = res.data.data.total
      })
    },
    handleSizeChange(val) {
      this.size = val
      this.getEmployeeList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getEmployeeList()
    },
    userEdit(row) {
      this.$bus.$emit('UserEdit', row)
    },
    userRole(row) {
      this.$bus.$emit('UserRole', row)
    },
    rePassword(row) {
      this.$confirm('将重置用户【' + row.empName + '】的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/hrms/employee/resetPassword", row.empId).then(() => {
          this.$message.success('重置密码成功')
        })
      }).catch(() => {
        this.$message.success('已取消重置密码')
      })
    }
  },
  created() {
    this.getEmployeeList()
  },
  mounted() {
    this.$bus.$on('refreshEmployeeList', () => this.getEmployeeList())
  },
  components: {
    UserEdit,
    UserRole
  }
}
</script>