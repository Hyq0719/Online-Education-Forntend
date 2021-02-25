<template>
  <div>
    <el-main   style="overflow:hidden;position: relative;min-height: 580px">
      <el-table :data="classData.list" >
        <el-table-column prop="name" label="课程名称">
        </el-table-column>
        <el-table-column  label="是否需要VIP">
          <template slot-scope="props">
            {{ props.row.needVip ? "需要" : "不需要" }}
          </template>
        </el-table-column>
        <el-table-column prop="uploadTime" label="更新时间" >
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="props">
            {{ props.row.prefer.major.majorContent }}-{{ props.row.prefer.preferContent }}
          </template>
        </el-table-column>
        <el-table-column  label="老师">
          <template slot-scope="props">
            {{ props.row.teacher.school }}-{{ props.row.teacher.name }}
          </template>
        </el-table-column>

        <el-table-column  label="更多">
          <template slot-scope="scope">
            <el-popover
                placement="right"
                trigger="hover">
              <el-image :src="scope.row.coursePic">
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

            <el-button type="primary" icon="el-icon-check" @click="pass(scope.row.courseId)">审核通过</el-button>

            <el-button type="danger" icon="el-icon-close"
                       @click.native.prevent="fail(scope.row.courseId)">不通过
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-pagination style="position: absolute;bottom: 0;left: 380px"
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
name: "classAudit",
  data(){
  return{
    classData:[],
    page:1,
    currentPage:1,
  }
  },
  methods:{
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.getClass(val);
      this.currentPage=val;
    },
    async getClass(val){
      let that=this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('page', val);
      await axios.post("http://" + that.Api + "/api/Course/getCourseByStatus0" ,a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("审核课程", response);
        that.classData=response.data.data;
        that.page=that.classData.total_element;
      }, function (err) {
        console.log(err);
      });
    },
    async pass(val){
      let that=this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('courseId', val);
      a.append('status', 1);
      await axios.post("http://" + that.Api + "/api/Course/updateCourseStatus" ,a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("课程认证成功", response);
        that.getClass(that.currentPage);
      }, function (err) {
        console.log(err);
      });
    },
    async fail(val){
      let that=this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('courseId', val);
      a.append('status', 2);
      await axios.post("http://" + that.Api + "/api/Course/updateCourseStatus" ,a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("课程驳回成功", response);
        that.getClass(that.currentPage);
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
        link: {name: 'classAudit'},
        title: '课程审核'
      }
    ];
    this.$store.commit("savebreadcrumb", breadcrumb);
    this.getClass(this.currentPage);
  },
}
</script>

<style scoped>

</style>
