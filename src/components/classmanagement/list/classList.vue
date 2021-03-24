<template>
  <div style="min-height: 480px">
    <el-main style="overflow:hidden;position: relative;min-height: 780px">
      <el-table :data="classData.list">
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

            <el-button type="primary" icon="el-icon-edit" @click="openChapter(scope.row.courseId)">管理章节</el-button>
            <el-button type="warning"
                       @click="courseId=scope.row.courseId;dialogClassEdit = true">修改课程
            </el-button>
            <el-button type="danger" icon="el-icon-delete"
                       @click.native.prevent="deleteClass(scope.row.courseId)">删除课程
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <div>
        <el-button circle @click="dialogClassBuild = true" style="position: fixed;bottom: 180px;left: 240px">
          <i class="el-icon-circle-plus-outline"></i>
        </el-button>
        <el-pagination style="position: absolute;bottom: 0;left: 410px"
                       background
                       layout="prev, pager, next"
                       @current-change="handleCurrentChange"
                       :total="this.$store.state.teacherData.teacherClassData.total_element">
        </el-pagination>
      </div>
    </el-main>

    <el-dialog title="创建课程" v-if="dialogClassBuild" :visible.sync="dialogClassBuild">
      <build-class-page @close="closeDialog"></build-class-page>
    </el-dialog>

    <el-dialog title="修改课程" v-if="dialogClassEdit" :visible.sync="dialogClassEdit">
      <build-class-page @close="closeDialog" :isEdit="true" :courseId="courseId"></build-class-page>

    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "classList",
  components:{
    buildClassPage: () => import('@/components/classmanagement/tools/buildClassPage'),
  },
  data() {
    return {
      classData: this.$store.state.teacherData.teacherClassData,
      dialogClassBuild: false,
      dialogClassEdit: false,
      currentPage: 1,
    }
  },
  methods:{
    closeDialog() {
      let that = this;
      this.dialogClassBuild = false;
      this.dialogClassEdit = false;
      this.getCourse(that.currentPage);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getCourse(val);
      this.currentPage = val;
    },

    async deleteClass(a) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let b = new URLSearchParams();
      b.append('courseId', a);

      await axios.post("http://" + that.Api + "/api/Course/deleteCourseById",b, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除课程", response);
      }, function (err) {
        console.log(err);
      });
    },  //删除课程

    async openChapter(id) {
      let that = this;
      that.$store.commit("saveCourseId",id);
      await axios.get("http://" + that.Api + "/api/Course/getCourseChapter/" + id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        console.log("章节信息", res);
        that.$store.commit("saveTeacherChapterData", res.data.data);
      })
      that.chapterData = that.$store.state.teacherData.teacherChapterData;

      that.$router.push('/Classmanagement/chapterList');
    },   //打开章节时调用

    async getCourse(val) {
      let that = this;
      let b = new URLSearchParams();
      let c = that.$store.state.userData.userId;
      b.append("teacherId", c);
      b.append("sort", 1);
      b.append("page", val);
      await axios.post('http://' + that.Api + "/api/Course/getCourseByTeacherId", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
            console.log("老师的课程信息", res);
            if (res.data.code === 1000) {
              that.$store.commit('saveTeacherClassData', res.data.data);
              that.classData = that.$store.state.teacherData.teacherClassData;
            }
          }, function (err) {
            console.log(err);
          }
      );
    },   //刷新课程用
  },
  mounted() {
    this.getCourse(this.currentPage);
    let breadcrumb = [
      {
        link: '/Classmanagement/blank',
        title: '课程管理'
      },
      {
        link: '/Classmanagement/classList',
        title: '列表管理'
      },
    ]
    this.$store.commit("savebreadcrumb", breadcrumb)
  }
}
</script>

<style scoped>
button:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}
</style>
