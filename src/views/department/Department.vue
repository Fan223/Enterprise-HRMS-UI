<template>
  <div>
    <div class="mainHeader">
      <el-form
        :model="searchForm"
        :inline="true"
        class="demo-form-inline"
        size="small"
        ref="searchForm"
        @submit.native.prevent="getDepartment"
      >
        <el-form-item
          label="部门名称"
          prop="deptName"
        >
          <el-input
            v-model="searchForm.deptName"
            placeholder="输入部门名称"
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="getDepartment"
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
              @click="departmentAdd"
            >
              新增
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="departmentDelete(null)"
              :disabled="delBatchBtn"
            >删除选中</el-button>
          </div>
        </el-col>
      </el-row>
      <DepartmentAdd />
      <template>
        <el-table
          class="mainTable"
          border
          :fit="true"
          :data="departmentList"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#ddd'}"
          max-height="450"
          :default-sort="{prop: 'deptName', order: 'ascending'}"
        >
          <el-table-column
            type="selection"
            align="center"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="deptName"
            label="部门名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="position"
            label="部门职位"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            label="状态"
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
            align="center"
            prop="createTime"
            label="创建时间"
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
                @click="departmentEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="departmentDelete(scope.row.deptId)"
              >删除</el-button>
              <el-button
                size="small"
                type="success"
                @click="departmentDetail(scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <DepartmentEdit />
        <DepartmentDetail />
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
import DepartmentEdit from './DepartmentEdit.vue'
import DepartmentDetail from './DepartmentDetail.vue'
import DepartmentAdd from './DepartmentAdd.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Department',
  data() {
    return {
      searchForm: {
        deptName: '',
      },
      departmentList: [],
      dialogFormVisible: false,
      multipleSelection: [],
      current: 1,
      size: 10,
      total: 0,
      delBatchBtn: true,
    }
  },
  methods: {
    getDepartment() {
      this.$axios.get('/hrms/department/getDepartment', {
        params: {
          deptName: this.searchForm.deptName,
          pageNum: this.current,
          pageSize: this.size
        }
      }).then(res => {
        this.departmentList = res.data.data.records
        this.current = res.data.data.current;
        this.size = res.data.data.size;
        this.total = res.data.data.total;
      }
      )
    },
    departmentAdd() {
      this.$bus.$emit('departmentAdd');
    },
    departmentEdit(row) {
      this.$bus.$emit('departmentEdit', row);
    },
    departmentDelete(deptId) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var deptIds = []
        deptId ? deptIds.push(deptId) : this.multipleSelection.forEach(row => {
          deptIds.push(row.deptId)
        })

        this.$axios.delete('/hrms/department/deleteDepartment', {
          data: {
            deptIds: deptIds
          }
        }).then(() => {
          this.getDepartment();
        })
      }).catch(() => {
        this.$message.success('已取消删除');
      })
    },
    departmentDetail(row) {
      this.$bus.$emit('departmentDetail', row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delBatchBtn = val.length == 0
    },
    handleSizeChange(val) {
      this.size = val
      this.getDepartment()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getDepartment()
    },
  },
  mounted() {
    this.$bus.$on('refreshDepartmentList', () => {
      this.getDepartment();
    });
  },
  components: {
    DepartmentEdit,
    DepartmentDetail,
    DepartmentAdd
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