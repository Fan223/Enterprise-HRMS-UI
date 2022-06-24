<template>
  <el-row>
    <el-col :span="24">
      <el-button
        size="mini"
        v-show="!$store.state.isCollapse"
        @click="handleCollapse"
        icon="el-icon-s-fold"
      ></el-button>
      <el-button
        size="mini"
        v-show="$store.state.isCollapse"
        @click="handleCollapse"
        icon="el-icon-s-unfold"
      ></el-button>

      <el-dropdown>
        <el-avatar
          class="el-avatar"
          shape="circle"
          :size="45"
          :src="userInfo.avatar"
        ></el-avatar>
        <span style="color: #ddd; margin-left: 10px;">
          {{userInfo.empName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/userCenter">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'NavHeader',
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    handleCollapse() {
      this.$store.commit('HANDLE_COLLAPSE');
    },
    logout() {
      this.$axios.post('/hrms/logout').then(() => {
        this.$store.commit('LOGOUT');
        this.$router.push('/login');
      });
    },
    getUserInfo() {
      this.$axios.get("/hrms/employee/getUserInfo").then(res => {
        this.userInfo = res.data.data;
      })
    }
  },
  mounted() {
    this.getUserInfo();

    this.$bus.$on('refreshNavHeader', () => {
      this.getUserInfo();
    })
  }
}
</script>

<style scoped>
.el-col {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 60px;
}
.el-button {
  margin-left: -5px;
}
.el-avatar {
  vertical-align: middle;
}
a {
  text-decoration: none;
}
</style>