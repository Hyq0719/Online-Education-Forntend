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
        <el-table-column prop="name" label="课程名称" width="140">
        </el-table-column>
        <el-table-column prop="couresId" label="课程号" width="120">
        </el-table-column>
        <el-table-column prop="needVip" label="是否为vip课程">
        </el-table-column>
        <el-table-column prop="stutas" label="更新状态">
        </el-table-column>
        <el-table-column prop="preferId" label="类型">
        </el-table-column>
        <el-table-column label="">
          <button class="search-bottom">删除管理</button>
        </el-table-column>
        <el-table-column label="">
          <button class="search-bottom">更新管理</button>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Classmanagement_class",
  data() {
    const item = {
      courseId: '20190502',
      name: '线性代数',
      status: '更新中',    //更新状态
      needVip: '是',
      preferId: '数学',
      teacherId: 0
    };
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style scoped>

.search-bottom {
  cursor: pointer;
  float: left;
  color: #fff;
  background: #00a1d6;
  font-size: 14px;
  letter-spacing: 2px;
  line-height: 20px;
  text-align: center;
  width: 90px;
  border-radius: 4px;
  border: none;
}

button:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}
</style>
