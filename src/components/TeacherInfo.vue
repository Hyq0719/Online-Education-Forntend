<template>
  <div class="teacher">
    <div class="teacher-info">
      <div class="teacher-info-img">
        <img :src="this.$store.state.TeacherInfo.teacherPicUrl" alt="">
      </div>
      <div class="teacher-info-content">
        <h2>{{ this.$store.state.TeacherInfo.name }}</h2>
        <h6>{{ this.$store.state.TeacherInfo.school }}</h6>
        <h6>{{ this.$store.state.TeacherInfo.intro }}</h6>
      </div>
    </div>
    <div class="new-best-hot">
      <el-radio-group v-model="radio">
        <el-radio-button @click.native="CourseChoose($event,1)" label="最新课程"></el-radio-button>
        <el-radio-button @click.native="CourseChoose($event,2)" label="最好课程"></el-radio-button>
        <el-radio-button @click.native="CourseChoose($event,3)" label="最热课程"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="Course-content">
        <Menu v-for="(item,index) in this.$store.state.TeacherMenuCourseData.list"
              v-bind:key="index" @click.native="Course(item.courseId)"
              :name="item.name" :teacherName="item.teacher.name" :coursePic="item.coursePic" :isFree="1"
              :VIP="item.needVip" :courseWatches="item.courseWatches" :courseAvgMark="item.courseAvgMark"
              style="width: 18%"></Menu>
    </div>
    <div class="block">
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="this.$store.state.MenuCourseData.total_element">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Menu from './childcpn/Menu';

export default {
  name: "TeacherInfo",
  components: {
    Menu,
  },
  data() {
    return {
      sort: 1,
      currentPage: 1,
      radio: '最新课程',
    }
  },
  created() {
    this.initTeacherCourse();
    this.initTeacherInfo();
  },
  methods: {
    initTeacherInfo(){
      let that = this;
      let a = new URLSearchParams;
      a.append("user_id", this.$route.query.teacherId);
      axios.post("http://" + this.Api + "/api/Teacher/getTeacherById?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取老师信息", response);
        that.$store.commit('saveTeacherInfo', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    Course(courseId) {
      this.$router.push({path: '/course', query: {courseId: courseId}});
    },
    handleCurrentChange(currentPage) {
      console.log("当前页", currentPage);
      let that = this;
      let a = new URLSearchParams;
      a.append("page", currentPage);
      a.append("sort", this.sort);
      a.append("teacherId", this.$route.query.teacherId);
      axios.post("http://" + this.Api + "/api/Course/getCourseByTeacherId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取老师课程", response);
        that.$store.commit('saveTeacherMenuCourseData', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    initTeacherCourse() {
      let that = this;
      let a = new URLSearchParams;
      a.append("page", 1);
      a.append("sort", 1);
      a.append("teacherId", this.$route.query.teacherId);
      axios.post("http://" + this.Api + "/api/Course/getCourseByTeacherId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取老师课程", response);
        that.$store.commit('saveTeacherMenuCourseData', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    CourseChoose(e, sort) {
      if (e.target.tagName === 'INPUT') return // 因为原生click事件会执行两次，第一次在label标签上，第二次在input标签上，故此处理
      let that = this;
      let a = new URLSearchParams;
      a.append("page", 1);
      a.append("sort", sort);
      a.append("teacherId", this.$route.query.teacherId);
      axios.post("http://" + this.Api + "/api/Course/getCourseByTeacherId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取老师课程", response);
        that.$store.commit('saveTeacherMenuCourseData', response.data.data);
      }, function (err) {
        console.log(err);
      });
      this.sort = sort;
      this.currentPage = 1;
    },
  },
}
</script>

<style scoped>
.teacher {
  margin: 20px auto;
  width: 1100px;
}

.teacher-info {
  display: flex;
  background: #EBEEF5;
}

.teacher-info-img {
  margin: 20px;
  height: 150px;
  width: 150px;
}

.teacher-info-img img {
  height: 100%;
  width: 100%;
  border-radius: 100px;
}

.teacher-info-content {
  margin: auto 30px;
  text-align: left;
}

.new-best-hot {
  text-align: left;
  margin: 20px auto;
}

.el-radio-button {
  margin: auto 10px;
}

/deep/ .el-radio-button__inner {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}

.Course-content {
  display: flex;
  flex-wrap: wrap;
}

.block {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
