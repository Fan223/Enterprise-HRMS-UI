<template>
  <div>
    <div class="mainHeader">
      <el-form
        :model="searchForm"
        :inline="true"
        class="demo-form-inline"
        size="small"
        ref="searchForm"
        @submit.native.prevent="getRecruitment"
      >
        <el-form-item
          label="招聘信息"
          prop="recrTitle"
        >
          <el-input
            v-model="searchForm.recrTitle"
            placeholder="输入招聘信息"
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="getRecruitment"
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
              @click="recruitmentAdd"
            >
              新增
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="recruitmentDelete(null)"
              :disabled="delBatchBtn"
            >删除选中</el-button>
          </div>
        </el-col>
      </el-row>
      <RecruitmentAdd />
      <template>
        <el-table
          class="mainTable"
          border
          :fit="true"
          :data="recruitmentList"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#ddd'}"
          max-height="450"
          :default-sort="{prop: 'recrId', order: 'ascending'}"
        >
          <el-table-column
            type="selection"
            align="center"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="recrTitle"
            label="招聘信息"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="recrRequire"
            label="招聘要求"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            prop="recrNumber"
            label="招聘人数"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="发布时间"
            sortable
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
                @click="recruitmentEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="recruitmentDelete(scope.row.recrId)"
              >删除</el-button>
              <el-button
                size="small"
                type="success"
                @click="recruitmentDetail(scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <RecruitmentEdit />
        <RecruitmentDetail />
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
import RecruitmentEdit from './RecruitmentEdit.vue'
import RecruitmentDetail from './RecruitmentDetail.vue'
import RecruitmentAdd from './RecruitmentAdd.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Recruitment',
  data() {
    return {
      searchForm: {
        recrTitle: '',
      },
      recruitmentList: [],
      dialogFormVisible: false,
      multipleSelection: [],
      current: 1,
      size: 10,
      total: 0,
      delBatchBtn: true,
    }
  },
  methods: {
    getRecruitment() {
      this.$axios.get('/hrms/recruitment/getRecruitment', {
        params: {
          recrTitle: this.searchForm.recrTitle,
          pageNum: this.current,
          pageSize: this.size
        }
      }).then(res => {
        this.recruitmentList = res.data.data.records
        this.current = res.data.data.current;
        this.size = res.data.data.size;
        this.total = res.data.data.total;
      }
      )
    },
    recruitmentAdd() {
      this.$bus.$emit('recruitmentAdd');
    },
    recruitmentEdit(row) {
      this.$bus.$emit('recruitmentEdit', row);
    },
    recruitmentDelete(recrId) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var recrIds = []
        recrId ? recrIds.push(recrId) : this.multipleSelection.forEach(row => {
          recrIds.push(row.recrId)
        })

        this.$axios.delete('/hrms/recruitment/deleteRecruitment', {
          data: {
            recrIds: recrIds
          }
        }).then(() => {
          this.getRecruitment();
        })
      }).catch(() => {
        this.$message.success('已取消删除');
      })
    },
    recruitmentDetail(row) {
      this.$bus.$emit('recruitmentDetail', row);
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
    this.$bus.$on('refreshRecruitmentList', () => {
      this.getRecruitment();
    });
  },
  components: {
    RecruitmentEdit,
    RecruitmentDetail,
    RecruitmentAdd
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