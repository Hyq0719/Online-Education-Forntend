<template>
  <el-container style="height: 700px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>班级管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">班级一</el-menu-item>
            <el-menu-item index="1-2">班级二</el-menu-item>
          </el-menu-item-group>
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
        <el-table :data="tableData">
          <el-table-column prop="studentID" label="学号" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="grade" label="成绩">
          </el-table-column>
        </el-table>
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
  }
};
</script>
