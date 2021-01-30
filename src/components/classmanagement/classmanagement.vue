<template>
  <el-container style="height: 700px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>课程管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <router-link to="/Classmanagement/class">课程列表</router-link>
            </el-menu-item>
            <el-menu-item index="1-1">
              <router-link to="/Classmanagement/Upload">课程上传</router-link>
            </el-menu-item>

          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <router-view></router-view>
  </el-container>
</template>

<style>

.el-carousel__item img {
  height: 100%;
  width: 100%;
}

</style>

<script>

export default {
  name: 'Classmanagement',
  data() {
    const item = {
      studentID: '20190502',
      name: '王小虎',
      grade: '98'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  components: {}
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
  color: #ffd04b;
}

a {
  text-decoration: none;
  color: #99a9bf;
}
</style>
