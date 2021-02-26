<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Course></Course>
    <CourseIntroduce></CourseIntroduce>
  </div>
</template>

<script>
import Header from "../components/Header";
import Course from "../components/Course";
import Sidebar from "../components/Sidebar";
import CourseIntroduce from "../components/CourseIntroduce";
import axios from "axios";

export default {
  components: {
    Header,
    Course,
    Sidebar,
    CourseIntroduce,
  },
  data() {
    return {
      courseId: this.$route.query.courseId,
      data: [],
    };
  },
  watch: {
    '$route'(to, from) {
      this.courseId = this.$route.query.courseId;
      this.Chapter();
      this.Course();
      this.RelatedCourse();
    }
  },
  created() {
    this.Chapter();
    this.Course();
    this.RelatedCourse();
  },
  methods: {
    //获取该学生的历史观看信息
    CourseHistory() {
      let that = this;
      if (this.$store.state.isLogin) {
        let a = new URLSearchParams;
        a.append("courseId", this.courseId);
        a.append("user_id", this.$store.state.userData.userId);
        axios.post("http://" + this.Api + "/api/Student/getWatchRecordByStudentAndCourse?" + a, null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.JWT,
          }
        }).then(function (response) {
          if (response.data.data != null) {
            console.log("获取学生对该课程的历史记录", response);
            that.$store.commit('saveVideo', {
              chapterId: response.data.data.courseChapterVideo.courseChapterVideoPK.chapterId,
              videoUrl: response.data.data.courseChapterVideo.videoUrl,
              videoId: response.data.data.courseChapterVideo.courseChapterVideoPK.videoId
            });
            that.$notify.info({
              title: '消息',
              message: '已为你定位到上次播放'
            });
          } else {
            console.log("自动播放第一个视频");
            that.$store.commit('saveVideo', {
              chapterId: that.data[0].VideoList[0].courseChapterVideoPK.chapterId,
              videoUrl: that.data[0].VideoList[0].videoUrl,
              videoId: that.data[0].VideoList[0].courseChapterVideoPK.videoId
            });
            let params = {
              chapterId: that.data[0].VideoList[0].courseChapterVideoPK.chapterId,
              courseId: that.courseId,
              studentId: that.$store.state.userData.userId,
              videoId: that.data[0].VideoList[0].courseChapterVideoPK.videoId,
            };
            axios.post("http://" + that.Api + "/api/Student/addWatchRecords", params, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': that.$store.state.JWT,
              }
            }).then(function (response) {
              console.log("成功添加历史记录", response);
            }, function (err) {
              console.log(err);
            });
          }
        }, function (err) {
          console.log(err);
        })
      } else {
        console.log("自动播放第一个视频");
        that.$store.commit('saveVideo', {
          chapterId: that.data[0].VideoList[0].courseChapterVideoPK.chapterId,
          videoUrl: that.data[0].VideoList[0].videoUrl,
          videoId: that.data[0].VideoList[0].courseChapterVideoPK.videoId
        });
      }
    },
    //获取章节及视频任务信息
    Chapter() {
      // console.log(this.courseId);
      let that = this;
      let a = new URLSearchParams();
      a.append('courseId', this.courseId);
      axios.post("http://" + this.Api + "/api/Course/getCourseDisplay", a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        // console.log(response.data.data);
        that.data = [];
        let data = response.data.data;
        for (let courseChapter in data) {
          let courseChapterJson = JSON.parse(courseChapter)
          let VideoList = data[courseChapter].VideoList;
          let TaskList = data[courseChapter].TaskList;
          let courseInformation = {
            courseChapterJson,
            VideoList,
            TaskList,
          };
          that.data.push(courseInformation);
        }
        that.$store.commit('saveChapterData', that.data);
        console.log("获取章节信息", that.data);
      }, function (err) {
        console.log(err);
      }).then(function () {
        that.CourseHistory();
      })
    },
    Course() {
      // console.log(this.courseId);
      let that = this;
      let a = new URLSearchParams();
      a.append('courseId', this.courseId);
      axios.post("http://" + this.Api + "/api/Course/getCourseById?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        // console.log(response.data.data);
        that.$store.commit('saveCourseData', response.data.data);
        console.log("获取课程信息", response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    //获取相关课程信息
    RelatedCourse() {
      let that = this;
      let a = new URLSearchParams;
      a.append("courseId", this.courseId);
      axios.post("http://" + this.Api + "/api/Course/getRelatedCourses?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取相关课程", response);
        that.$store.commit('saveRelatedCourses', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
