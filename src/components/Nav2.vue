<template>
  <div class="NAV2">
    <div class="Title">
      <img src="../assets/HotIcon.png" alt="">
      <h2>全部直播</h2>
    </div>
    <div class="Course-content" v-if="this.$store.state.MainMenuLiveData">
      <Menu v-for="(item,index) in this.$store.state.MainMenuLiveData.list.slice(0, 4)"
            v-bind:key="index" @click.native="Live(item.liveId,item.liveDate)"
            :name="item.liveName" :teacherName="item.teacher.name" :liveDate="item.liveDate"
            :coursePic="item.livePicUrl" style="width: 23%"></Menu>
    </div>
    <div class="Title">
      <img src="../assets/TapIcon.png" alt="">
      <h2>好课推荐</h2>
    </div>
    <div class="Course-content" v-if="this.$store.state.MainMenuCourseData">
      <Menu v-for="(item,index) in this.$store.state.MainMenuCourseData.slice(0, 4)"
            v-bind:key="index" @click.native="Course(item.courseId)"
            :name="item.name" :teacherName="item.teacher.name" :coursePic="item.coursePic" :isFree="1"
            :VIP="item.needVip" :courseWatches="item.courseWatches" :courseAvgMark="item.courseAvgMark"
            style="width: 23%"></Menu>
    </div>
  </div>
</template>

<script>

import Menu from "@/components/childcpn/Menu";
import axios from "axios";

export default {
  name: 'nav2',
  components: {
    Menu,
  },
  data() {
    return {};
  },
  created() {
    this.initCourse();
    this.initLive();
  },
  methods: {
    initCourse() {
      let that = this;
      if (this.$store.state.isLogin) {
        let a = new URLSearchParams;
        a.append("user_id", this.$store.state.userData.userId);
        axios.post("http://" + this.Api + "/api/Student/getStudentItemCF?" + a, null, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.JWT,
          }
        }).then(function (response) {
          console.log("获取首页学生协同过滤课程菜单", response);
          that.$store.commit('saveMainMenuCourseData', response.data.data);
        }, function (err) {
          console.log(err);
        });
      } else {
        axios.post("http://" + this.Api + "/api/Course/getAllCoursesOrderByWatches", null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log("获取首页默认课程菜单", response);
          that.$store.commit('saveMainMenuCourseData', response.data.data);
        }, function (err) {
          console.log(err);
        });
      }
    },
    initLive() {
      let that = this;
      let a = new URLSearchParams;
      a.append("page", 1);
      axios.get("http://" + this.Api + "/api/Live/findAllValidLive?" + a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取首页直播菜单", response);
        that.$store.commit('saveMainMenuLiveData', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    Live(liveId,liveDate) {
      if(Date.parse(new Date().toLocaleDateString()) < Date.parse(liveDate)){
        this.$message.error('直播未开始');
      }
      else {
        this.$router.push({path: '/live', query: {liveId: liveId}});
      }
    },
    Course(courseId) {
      this.$router.push({path: '/course', query: {courseId: courseId}});
    },
  },
};
</script>

<style scoped>
.NAV2 {
  width: 1100px;
  margin: auto;
}

.Title{
  display: flex;
}

.Title img{
  height: 60px;
  width: 90px;
  margin: 20px 0 40px 0;
}

.Title h2{
  margin: 35px 0 40px 10px;
}

.Course-content {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto 50px auto;
}
</style>

