<template>
  <div>
    <el-main   style="overflow:hidden;position: relative;height: 780px">
    <el-table :data="classData" >
      <el-table-column prop="name" label="课程名称">
      </el-table-column>
      <el-table-column label="是否为vip课程">
        <template slot-scope="props">
          {{ props.row.needVip ? "需要" : "不需要" }}
        </template>
      </el-table-column>
      <el-table-column prop="uploadTime" label="更新时间">
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="props">
          {{ props.row.prefer.major.majorContent }}-{{ props.row.prefer.preferContent }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400px">
        <template slot-scope="scope">

          <el-button type="primary" icon="el-icon-check" @click="openChapter(scope.row.courseId)">审核通过</el-button>

          <el-button type="danger" icon="el-icon-close"
                     @click.native.prevent="deleteClass(scope.row.courseId)">不通过
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <div>
      <el-button circle @click="dialogClassBuild = true" style="position: fixed;bottom: 180px;left: 240px">
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
      <el-pagination style="position: absolute;bottom: 0;left: 300px"
                     background
                     layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :total="page">
      </el-pagination>
    </div>
    </el-main>
  </div>
</template>

<script>
export default {
name: "classAudit",
  data(){
  return{
    classData:[
      {
        name:"数据结构",
        needVip:true,
        uploadTime:"2021/1/19",
        prefer:{
          preferContent:"计算机",
          major:{
            majorContent:"计算机",
          },
        }
      },
      {
        name:"计算机组成原理",
        needVip:true,
        uploadTime:"2021-1-19",
        prefer:{
          preferContent:"计算机",
          major:{
            majorContent:"计算机",
          },
        }
      },
      {
        name:"计算机网络",
        needVip:true,
        uploadTime:"2021-1-19",
        prefer:{
          preferContent:"计算机",
          major:{
            majorContent:"计算机",
          },
        }
      },
    ],
  }
  },
  mounted() {
    let breadcrumb = [
      {
        title: '审核管理'
      },
      {
        link: {name: 'classAudit'},
        title: '课程审核'
      }
    ];
    this.$store.commit("savebreadcrumb", breadcrumb);
  },
}
</script>

<style scoped>

</style>
