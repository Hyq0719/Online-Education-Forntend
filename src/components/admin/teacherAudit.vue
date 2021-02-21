<template>
 <div>
   <el-main   style="overflow:hidden;position: relative;height: 780px">
     <el-table :data="teacherData" >
       <el-table-column prop="name" label="课程名称">
       </el-table-column>
       <el-table-column prop="phone" label="是否为vip课程">
       </el-table-column>
       <el-table-column prop="uploadTime" label="更新时间">
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

   </el-main>
 </div>
</template>

<script>
export default {
  name: "teacherAudit",
  data(){
    return{
      teacherData:[
        {
          name:"张三",
          phone:"13673839874",
          uploadTime:"2021/1/19",
          prefer:{
            preferContent:"计算机",
            major:{
              majorContent:"计算机",
            },
          }
        },
        {
          name:"李四",
          phone:"13674387574",
          uploadTime:"2021-1-19",
          prefer:{
            preferContent:"计算机",
            major:{
              majorContent:"计算机",
            },
          }
        },
        {
          name:"王五",
          phone:"13673236474",
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
        link: {name: 'teacherAudit'},
        title: '教师账号审核'
      }
    ];
    this.$store.commit("savebreadcrumb", breadcrumb);
  },
}
</script>

<style scoped>

</style>
