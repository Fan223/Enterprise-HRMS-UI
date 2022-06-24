<template>
  <div>
    <div
      class="mainHeader"
      style="height: 630px;"
    >
      <el-row
        type="flex"
        justify="space-between"
        class="mainMessage"
      >
        <el-col class="mainMessageLeft">
          <div><b>菜单管理</b></div>
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
              @click="$bus.$emit('menuAdd', menuList)"
              v-if="hasAuth('sys:menu:add')"
            >新增</el-button>
            <el-button
              type="success"
              size="small"
              @click="exportExcel"
            >导出</el-button>
          </div>
        </el-col>
      </el-row>
      <!--列表-->
      <el-table
        :data="menuList"
        id="out-table"
        class="mainTable"
        :header-cell-style="{background:'#ddd'}"
        max-height="520"
        border
        :fit="true"
        row-key="menuId"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="menuName"
          label="名称"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="permission"
          label="权限编码"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="icon"
          label="图标"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.type === 0"
              size="small"
            >目录</el-tag>
            <el-tag
              v-else-if="scope.row.type === 1"
              size="small"
              type="success"
            >菜单</el-tag>
            <el-tag
              v-else-if="scope.row.type === 2"
              size="small"
              type="info"
            >按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="path"
          label="菜单URL"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="component"
          label="菜单组件"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序号"
          align="center"
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
          width="200"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="$bus.$emit('menuEdit', menuList, scope.row)"
              v-if="hasAuth('sys:menu:update')"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              slot="reference"
              @click="menuDel(scope.row.menuId)"
              v-if="hasAuth('sys:menu:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <MenuAdd />
      <MenuEdit />
    </div>
  </div>
</template>
<script>
import MenuAdd from './MenuAdd'
import MenuEdit from './MenuEdit'
import '../../../assets/css/mainStyle.css'

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Menu',
  data() {
    return {
      menuList: [],
      dialogFormVisible: false,
    }
  },
  methods: {
    getMenuTree() {
      this.$axios.get('/hrms/sys/menu/getMenuList?valiFlag=').then(res => {
        this.menuList = res.data.data;
      })
    },
    menuDel(menuId) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete("/hrms/sys/menu/deleteMenu/" + menuId).then(() => {
          this.$message.success("删除成功")
          this.getMenuTree()
        })
      }).catch(() => {
        this.$message.success('已取消删除');
      })
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
    this.$bus.$on('refreshMenuList', () => {
      this.getMenuTree();
    });
  },
  created() {
    this.getMenuTree();
  },
  components: {
    MenuAdd,
    MenuEdit,
  }
}
</script>
<style>
</style>