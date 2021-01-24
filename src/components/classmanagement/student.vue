<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="studentID" label="学号" width="140">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="grade" label="成绩">
      </el-table-column>
    </el-table>
  </div>
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
