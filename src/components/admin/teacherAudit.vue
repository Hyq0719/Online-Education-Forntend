<template>
 <div>
   <el-main   style="overflow:hidden;position: relative" class="card-wrapper">
     <el-table :data="teacherData.list" >
       <el-table-column prop="name" label="课程名称">
       </el-table-column>
       <el-table-column prop="school" label="学校">
       </el-table-column>
       <el-table-column  label="专业">
         <template slot-scope="scope">
           {{scope.row.major.majorContent}}
         </template>
       </el-table-column>
       <el-table-column prop="sex" label="性别">
       </el-table-column>

       <el-table-column  label="更多">
         <template slot-scope="scope">
           <el-popover
               placement="right"
               trigger="hover">
             <el-image :src="scope.row.teacherPicUrl">
               <div slot="error" class="image-slot">
                 <i class="el-icon-picture-outline"></i>
                 图片加载失败
               </div>
             </el-image>
             <div>{{scope.row.intro}}</div>
             <el-button slot="reference">图片介绍</el-button>
           </el-popover>
         </template>
       </el-table-column>

       <el-table-column label="操作" width="400px">
         <template slot-scope="scope">

           <el-button type="primary" icon="el-icon-check" @click="pass(scope.row.userId)">审核通过</el-button>

           <el-button type="danger" icon="el-icon-close"
                      @click.native.prevent="fail(scope.row.userId)">不通过
           </el-button>

         </template>
       </el-table-column>
     </el-table>

     <el-pagination style="left: 410px;margin: 20px 0 0 0"
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="page">
     </el-pagination>
   </el-main>
 </div>
</template>

<script>
import axios from "axios";
export default {
  name: "teacherAudit",
  data(){
    return{
      teacherData:[],
      page:1,
      currentPage:1,
    }
  },
  methods:{
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.getTeacher(val);
      this.currentPage=val;
    },
   async getTeacher(val){
      let that=this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('page', val);
      await axios.post("http://" + that.Api + "/api/Teacher/getTeacherByStatus0" ,a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("审核教师", response);
        that.teacherData=response.data.data;
        that.page=that.teacherData.total_element;
      }, function (err) {
        console.log(err);
      });
    },
   async pass(val){
     let that=this;
     let JWT = that.$store.state.JWT;
     let a = new URLSearchParams();
     a.append('user_id', val);
     a.append('status', 1);
     await axios.post("http://" + that.Api + "/api/Teacher/updateTeacherStatus" ,a, {
       headers: {
         'Authorization': JWT,
       }
     }).then(function (response) {
       console.log("教师认证成功", response);
       that.getTeacher(that.currentPage);
     }, function (err) {
       console.log(err);
     });
   },
   async fail(val){
     let that=this;
     let JWT = that.$store.state.JWT;
     let a = new URLSearchParams();
     a.append('user_id', val);
     a.append('status', 0);
     await axios.post("http://" + that.Api + "/api/Teacher/updateTeacherStatus" ,a, {
       headers: {
         'Authorization': JWT,
       }
     }).then(function (response) {
       console.log("教师驳回成功", response);
       that.getTeacher(that.currentPage);
     }, function (err) {
       console.log(err);
     });
   },
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
    this.getTeacher(this.currentPage);
  },
}
</script>

<style scoped>
.card-wrapper{
  background-color: #ffffff;
  box-shadow: 0 0 10px #4d555d;
  border-radius: 5px;
  margin: 0 0 20px 0;
}
</style>
