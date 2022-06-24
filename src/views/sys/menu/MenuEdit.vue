<template>
  <el-dialog
    title="菜单信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    class="el-dialog-menu"
  >
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editForm"
    >
      <el-form-item
        label="上级菜单"
        prop="parentId"
        label-width="100px"
      >
        <!--模拟树形下拉框-->
        <el-select
          v-model="editForm.parentId"
          placeholder="请选择上级菜单"
        >
          <template v-for="item in menuList">
            <el-option
              :key="item.menuId"
              :label="item.menuName"
              :value="item.menuId"
            ></el-option>
            <template v-for="child in item.children">
              <el-option
                :key="child.menuId"
                :label="child.menuName"
                :value="child.menuId"
              >
                <span>{{ '- ' + child.menuName }}</span>
              </el-option>
            </template>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item
        label="菜单名称"
        prop="menuName"
        label-width="100px"
      >
        <el-input
          v-model="editForm.menuName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="权限编码"
        prop="permission"
        label-width="100px"
      >
        <el-input
          v-model="editForm.permission"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="图标"
        prop="icon"
        label-width="100px"
      >
        <el-input
          v-model="editForm.icon"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="菜单URL"
        prop="path"
        label-width="100px"
      >
        <el-input
          v-model="editForm.path"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="菜单组件"
        prop="component"
        label-width="100px"
      >
        <el-input
          v-model="editForm.component"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
        label-width="100px"
      >
        <el-radio-group v-model="editForm.type">
          <el-radio :label=0>目录</el-radio>
          <el-radio :label=1>菜单</el-radio>
          <el-radio :label=2>按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="valiFlag"
        label-width="100px"
      >
        <el-radio-group v-model="editForm.valiFlag">
          <el-radio :label=0>禁用</el-radio>
          <el-radio :label=1>正常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="排序号"
        prop="orderNum"
        label-width="100px"
      >
        <el-input-number
          v-model="editForm.orderNum"
          :min="1"
          label="排序号"
        >1</el-input-number>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="resetForm('editForm')">取 消</el-button>
      <el-button
        type="primary"
        @click="submitEditForm('editForm')"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'MenuEdit',
  data() {
    return {
      dialogFormVisible: false,
      menuList: [],
      editForm: {},
      editFormRules: {
        menuName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        permission: [
          { required: true, message: '请输入权限编码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '请填入排序号', trigger: 'blur' }
        ],
        valiFlag: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('/hrms/sys/menu/updateMenu', this.editForm).then(() => {
            this.dialogFormVisible = false;
            this.$message.success('修改成功');
            this.$bus.$emit('refreshMenuList')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$bus.$emit('refreshMenuList')
      this.dialogFormVisible = false
    }
  },
  mounted() {
    this.$bus.$on('menuEdit', (menuList, menu) => {
      this.dialogFormVisible = true
      this.menuList = menuList
      this.editForm = menu
    })
  }
}
</script>

<style>
.el-dialog-menu {
  width: 100%;
  margin-top: -90px;
  overflow: hidden;
}
</style>