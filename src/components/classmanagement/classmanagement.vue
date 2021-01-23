<template>
  <el-container style="height: 700px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>学生管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><router-link to="/Classmanagement/student">班级一</router-link></el-menu-item>
            <el-menu-item index="1-2"><router-link to="/Classmanagement/student">班级二</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i><router-link to="/Classmanagement/class">班级管理</router-link></template>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>课程一</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>

.el-carousel__item img {
  height: 100%;
  width: 100%;
}

</style>

<script>
// import student from "@/components/classmanagement/student";
// import class1 from "@/components/classmanagement/class";
export default {
  name: 'Classmanagement',
  // components: {
  //   class1,
  //   student,
  // },
  data() {
    const item = {
      studentID: '20190502',
      name: '王小虎',
      grade: '98'
    };
    return {
      tableData: Array(20).fill(item)
    }
  }
};
</script>
