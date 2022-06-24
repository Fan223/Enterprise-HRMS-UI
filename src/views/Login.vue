<template>
  <el-row>
    <el-col :span="24">

      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="rules"
        :status-icon="true"
        :hide-required-asterisk="true"
        @keyup.enter.native="login"
      >
        <el-form-item>
          <div class="el-form-login-title">系统登录</div>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名"
          label-width="80px"
        >
          <el-input
            type="input"
            v-model="loginForm.username"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          label-width="80px"
        >
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="captcha"
          label="验证码"
          label-width="80px"
        >
          <el-input
            type="input"
            v-model="loginForm.captcha"
            autocomplete="off"
            placeholder="请输入验证码"
            style="width: 380px; float: left;"
          ></el-input>
          <el-image
            :src="captchaImg"
            @click="getCaptcha"
            style="margin-left: 15px; border-radius: 5px;"
          ></el-image>
        </el-form-item>
        <el-form-item class="el-form-login-submit">
          <el-button
            type="primary"
            @click="login"
          >登 录</el-button>
          <el-button
            type="primary"
            @click="() => this.$refs.loginForm.resetFields()"
          >重 置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      // 表单数据对象
      loginForm: {
        username: 'admin',
        password: 'admin',
        captcha: '',
        token: '',
      },
      // 表单验证规则
      rules: {
        username: [
          // required 表示是否必填，message 表示提示信息，trigger 表示触发方式
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
      captchaImg: '',
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/hrms/login?' + this.$qs.stringify(this.loginForm)).then((res) => {
            this.$message.success('登录成功')
            // eslint-disable-next-line no-unused-vars
            const jwt = res.headers.authorization
            this.$store.commit('SET_JWT', jwt)
            this.$router.push('/home').catch(() => { })
          })
        } else {
          return false;
        }
      });
    },
    getCaptcha() {
      this.$axios.get('/hrms/api/getCaptcha').then((res) => {
        this.captchaImg = res.data.data.captchaImg;
        this.loginForm.token = res.data.data.token;
        this.loginForm.captcha = '';
      })
    },
  },
  mounted() {
    this.getCaptcha()
  },
}
</script>

<style scoped>
.el-col {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/1.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 600px;
  border-radius: 15px;
  padding: 35px;
  background-color: rgb(0, 0, 0, 0.4);
}
.el-form-login-title {
  margin: 0px auto 20px auto;
  color: #fff;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
::v-deep .el-form-item__label {
  color: #fff;
  font-weight: bold;
}
::v-deep .el-form-item__error {
  font-size: 14px;
}
.el-form-login-submit {
  width: 160px;
  margin: 30px auto 0px auto;
}
</style>
