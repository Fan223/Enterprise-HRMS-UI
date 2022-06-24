<template>
  <div>
    <div class="mainHeader">
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="small"
        :model="searchForm"
        ref="searchForm"
        @submit.native.prevent="getRoleList"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="searchForm.roleName"
            placeholder="请输入角色名称"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="getRoleList()"
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
        <el-col
          :span="4"
          class="mainMessageRight"
        >
          <div>
            <el-button
              size="small"
              type="primary"
              @click="roleAdd"
              v-if="hasAuth('sys:role:add')"
            >
              新增
            </el-button>
            <el-button
              size="small"
              type="danger"
              :disabled="delBatchBtn"
              @click="delRole(null)"
              v-if="hasAuth('sys:role:delete')"
            >删除选中</el-button>
          </div>
        </el-col>
      </el-row>
      <RoleAdd />

      <template>
        <el-table
          ref="multipleTable"
          class="mainTable"
          border
          :fit="true"
          :data="roleList"
          max-height="420"
          :header-cell-style="{background:'#ddd'}"
          @selection-change="handleSelectionChange"
          :default-sort="{prop: 'roleName', order: 'ascending'}"
        >
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            prop="roleName"
            align="center"
            sortable
            label="名称"
          >
          </el-table-column>
          <el-table-column
            prop="code"
            align="center"
            label="唯一编码"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            align="center"
            label="描述"
            width="500"
          >
          </el-table-column>
          <el-table-column
            prop="valiFlag"
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
            label="操作"
            align="center"
            width="320"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="rolePermission(scope.row)"
                v-if="hasAuth('sys:role:permission')"
              >分配权限</el-button>
              <el-button
                size="small"
                type="success"
                @click="roleEdit(scope.row)"
                v-if="hasAuth('sys:role:update')"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="delRole(scope.row.roleId)"
                v-if="hasAuth('sys:role:delete')"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <RolePermission />
        <RoleEdit />
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
import '../../../assets/css/mainStyle.css';
import RoleAdd from './RoleAdd.vue';
import RolePermission from './RolePermission.vue';
import RoleEdit from './RoleEdit.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Role",
  data() {
    return {
      searchForm: {
        roleName: ''
      },
      roleList: [],
      multipleSelection: [],
      delBatchBtn: true,
      current: 1,
      size: 10,
      total: 0,
    }
  },
  methods: {
    roleAdd() {
      this.$bus.$emit('roleAdd')
    },
    rolePermission(row) {
      this.$bus.$emit('RolePermission', row)
    },
    roleEdit(row) {
      this.$bus.$emit('RoleEdit', row)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delBatchBtn = val.length == 0
    },
    getRoleList() {
      this.$axios.get('/hrms/sys/role/getRoleList', {
        params: {
          roleName: this.searchForm.roleName,
          valiFlag: '',
          current: this.current,
          size: this.size
        }
      }).then(res => {
        this.roleList = res.data.data.records;
        this.current = res.data.data.current;
        this.size = res.data.data.size;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(val) {
      this.size = val
      this.getRoleList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getRoleList()
    },
    delRole(roleId) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var roleIds = []
        roleId ? roleIds.push(roleId) : this.multipleSelection.forEach(row => {
          roleIds.push(row.roleId)
        })
        this.$axios.delete("/hrms/sys/role/deleteRole", {
          data: {
            roleIds: roleIds
          }
        }).then(() => {
          this.$message.success('删除角色成功')
          this.getRoleList()
        })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消删除'
        });
      });
    },
  },
  created() {
    this.getRoleList()
  },
  mounted() {
    this.$bus.$on('refreshRoleList', () => {
      this.getRoleList()
    })
  },
  components: {
    RoleAdd,
    RolePermission,
    RoleEdit
  }
}
</script>