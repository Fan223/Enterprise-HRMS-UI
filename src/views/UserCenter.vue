<template>
  <el-row>
    <el-col :span="8">
      <el-card
        shadow="always"
        class="el-card-left"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <span><b>基本信息</b></span>
        </div>
        <div class="alignContainer">
          <el-image
            :src="userInfo.avatar"
            :preview-src-list="srcList"
          >
          </el-image>
        </div>
        <el-upload
          action=""
          class="alignContainer"
          :http-request="upload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <div class="avatar-update">修改头像</div>
        </el-upload>
        <div
          class="leftContainerInfo"
          style="margin-top: 20px;"
        >姓名：{{userInfo.empName}} </div>
        <div class="leftContainerInfo">工号：{{userInfo.empCode}} </div>
        <div class="leftContainerInfo">部门：{{userInfo.deptId}} </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card
        shadow="always"
        class="el-card-right"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <span><b>个人资料</b></span>
        </div>

        <el-tabs
          v-model="activeName"
          type="card"
        >
          <!-- 个人资料 Tab -->
          <el-tab-pane
            label="个人资料"
            name="information"
          >
            <el-form
              :model="userInfo"
              ref="userInfo"
              :disabled="formStatus"
            >
              <el-form-item
                label="姓名"
                :label-width="formLabelWidth"
                prop="empName"
              >
                <el-input
                  v-model="userInfo.empName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="性别"
                :label-width="formLabelWidth"
                prop="gender"
              >
                <el-radio-group v-model="userInfo.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="身份证号"
                :label-width="formLabelWidth"
                prop="idcardNo"
              >
                <el-input
                  v-model="userInfo.idcardNo"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="手机号"
                :label-width="formLabelWidth"
                prop="phone"
              >
                <el-input
                  v-model="userInfo.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="地址"
                :label-width="formLabelWidth"
                prop="editress"
              >
                <el-input
                  v-model="userInfo.address"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="邮箱"
                :label-width="formLabelWidth"
                prop="email"
              >
                <el-input
                  v-model="userInfo.email"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="alignContainer">
              <el-button
                type="success"
                v-if="formStatus"
                @click="formStatus = !formStatus"
              >编 辑</el-button>
              <el-button
                type="success"
                v-if="!formStatus"
                @click="formStatus = !formStatus"
              >取 消</el-button>
              <el-button
                type="primary"
                @click="updateUserInfo"
                :disabled="formStatus"
              >保 存</el-button>
            </div>
          </el-tab-pane>

          <!-- 修改密码 Tab -->
          <el-tab-pane
            label="修改密码"
            name="password"
          >
            <el-form
              :model="passwordForm"
              ref="passwordForm"
              status-icon
              :rules="rules"
              @keyup.enter.native="updatePassword"
            >
              <el-form-item
                label="旧密码"
                prop="currentPassword"
                :label-width="formLabelWidth"
              >
                <el-input
                  type="password"
                  v-model="passwordForm.currentPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="新密码"
                prop="newPassword"
                :label-width="formLabelWidth"
              >
                <el-input
                  type="password"
                  v-model="passwordForm.newPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码"
                prop="checkPassword"
                :label-width="formLabelWidth"
              >
                <el-input
                  type="password"
                  v-model="passwordForm.checkPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="alignContainer">
              <el-button
                type="primary"
                @click="updatePassword"
              >确 定</el-button>
              <el-button @click="() => this.$refs.passwordForm.resetFields()">重 置</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios"

export default {
  name: 'UserCenter',
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userInfo: {},
      srcList: [],
      formLabelWidth: '120px',
      activeName: 'information',
      formStatus: true,
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        checkPassword: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        currentPassword: [
          { required: true, message: '请输入当前密码', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    updateUserInfo() {
      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          this.$axios.put('/hrms/employee/updateUserInfo', this.userInfo).then(() => {
            this.$message.success('修改个人信息成功');
            this.formStatus = true;
          })
        } else {
          return false
        }
      })
    },
    updatePassword() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          this.userInfo.currentPassword = this.passwordForm.currentPassword;
          this.userInfo.newPassword = this.passwordForm.newPassword;

          this.$axios.put('/hrms/employee/updatePassword', this.userInfo).then(() => {
            this.$message.success('修改密码成功，请重新登录');
            this.$store.commit('LOGOUT');
            this.$router.push('/login');
          })
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
    },
    beforeAvatarUpload(file) {

      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }

      return isJPG;
    },
    upload(file) {
      const formData = new FormData()
      formData.append('smfile', file.file)

      axios.post('/api/v2/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'DKOwDQZIzbTCvcStycffNU4Yh1D98sju'
        }
      }, { timeout: 30000 }).then(res => {
        if (res.data.code === 'image_repeated') {
          this.userInfo.avatar = res.data.images;
        } else {
          this.userInfo.avatar = res.data.data.url;
        }

        this.$axios.put('/hrms/employee/updateEmployee', this.userInfo).then(() => {
          this.$message.success('修改头像成功');
          this.$bus.$emit('refreshNavHeader');
        })
      })
    }
  },
  mounted() {
    this.$axios.get("/hrms/employee/getUserInfo").then(res => {
      this.userInfo = res.data.data;
      this.srcList.push(this.userInfo.avatar)
    })
  }
}
</script>

<style scoped>
.el-card-left {
  width: 90%;
  height: 550px;
  margin-top: 20px;
}
.el-card-right {
  width: 100%;
  height: 650px;
  margin-left: -10px;
}
::v-deep .el-card__header {
  background-color: #ddd;
}
.alignContainer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-image {
  width: 280px;
  height: 280px;
  border-radius: 50%;
}
.leftContainerInfo {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.avatar-update {
  color: #409eff;
  margin-top: -10px;
}
.el-form {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
.el-input {
  width: 90%;
  background-color: #ddd;
}
</style>