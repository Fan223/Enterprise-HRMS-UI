<template>
  <div>
    <el-row type="flex">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <h1 style="font-size: 32px">欢迎使用企业人力资源管理系统！</h1>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h1 style="font-size: 24px">Welcome！</h1>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <h1>技术栈：</h1>
          <ul>
            <li>核心框架：Spring Boot</li>
            <li>安全框架：Spring Security</li>
            <li>持久层框架：MyBatis-Plus</li>
            <li>数据库连接池：Druid</li>
            <li>前端框架：Vue2 + Element UI</li>
            <li>更多…</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home'
}
</script>

<style>
</style>