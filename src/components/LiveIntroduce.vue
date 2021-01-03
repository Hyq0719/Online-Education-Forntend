<template>
  <el-container>
    <el-main>Main</el-main>
    <el-aside width="300px">Aside</el-aside>
  </el-container>
</template>

<script>
export default {
  name: "LiveIntroduce"
}
</script>

<style scoped>
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  margin: 50px 100px;
  height: 350px;
}
</style>
