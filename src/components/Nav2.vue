<template>
  <div class="NAV2">
    <h2>全部直播</h2>
    <div class="Course-content" v-if="this.$store.state.MainMenuLiveData">
      <Menu v-for="(item,index) in this.$store.state.MainMenuLiveData.list.slice(0, 4)"
            v-bind:key="index" @click.native="Live(item.liveId)"
            :name="item.liveName" :teacherName="item.intro" :liveDate="item.liveDate"
            :coursePic="item.livePicUrl" style="width: 23%"></Menu>
    </div>
    <h2>好课推荐</h2>
    <div class="Course-content" v-if="this.$store.state.MainMenuCourseData">
      <Menu v-for="(item,index) in this.$store.state.MainMenuCourseData.slice(0, 4)"
            v-bind:key="index" @click="Course(item.courseId)"
            :name="item.name" :teacherName="item.teacher.name" :coursePic="item.coursePic" :isFree="1"
            :VIP="item.needVip" style="width: 23%"></Menu>
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
    Live(liveId) {
      this.$router.push({path: '/live', query: {courseId: liveId}});
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
  padding: 32px 0;
  clear: both;
}

.NAV2 h2 {
  text-align: left;
  margin: 60px 20px 40px 20px;
  letter-spacing: 2px;
}

.Course-content {
  display: flex;
  flex-wrap: wrap;
}
</style>

