<template>
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
</template>

<script>
export default {
  name: "Classmanagement_student",
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
}
</script>
