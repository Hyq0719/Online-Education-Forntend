<template>
  <div class="collect">
    <div class="collect-course" v-for="(item,index) in this.$store.state.StudentCollect.list" v-bind:key="index">
      <div class="collect-time">
        <p>收藏时间：{{ item.time }}</p>
        <div class="collect-icon">
          <el-button type="primary" icon="el-icon-star-off" circle
                     @click="DeleteCollect(item.course.courseId)"></el-button>
        </div>
        <div class="collect-teacher">
          <img :src="item.course.teacher.teacherPicUrl" alt="图片缺失">
          <p>{{ item.course.teacher.name }} | {{ item.course.teacher.intro }}</p>
        </div>
      </div>
      <div class="collect-content">
        <div class="collect-img"
             @click="Course(item.course.courseId)">
          <img v-if="item.course.coursePic" :src="item.course.coursePic" alt="图片缺失">
          <img v-if="!item.course.coursePic" src="../assets/SHUlogo.jpg" alt="图片缺失">
        </div>
        <div class="collect-text">
          <div class="collect-text-title"
               @click="Course(item.course.courseId)">
            <h3>{{ item.course.name }}</h3>
          </div>
          <h4>{{ item.course.intro }}</h4>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="this.$store.state.StudentCollect.total_element">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Collect",
  data() {
    return {
      currentPage: 1,
    };
  },
  created() {
    this.collect();
  },
  methods: {
    handleCurrentChange(currentPage) {
      console.log("当前页", currentPage);
      let that = this;
      let a = new URLSearchParams;
      a.append("page", currentPage);
      a.append("user_id", this.$store.state.userData.userId);
      axios.post("http://" + this.Api + "/api/Student/getStudentLikedCourse?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("当前学生收藏记录", response);
        that.currentPage = currentPage;
        that.$store.commit('saveStudentCollect', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    Course(courseId) {
      this.$router.push({path: '/course', query: {courseId: courseId}});
    },
    collect() {
      let a = new URLSearchParams;
      let that = this;
      a.append("page", 1);
      a.append("user_id", this.$store.state.userData.userId);
      axios.post("http://" + this.Api + "/api/Student/getStudentLikedCourse?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("当前学生收藏记录", response);
        that.$store.commit('saveStudentCollect', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    DeleteCollect(courseId) {
      let that = this;
      let a = new URLSearchParams;
      a.append("courseId", courseId);
      a.append("user_id", this.$store.state.userData.userId);
      axios.post("http://" + this.Api + "/api/Student/cancelLikeCourse?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("成功删除收藏记录", response);
        that.currentPage = 1;
        that.collect();
      }, function (err) {
        console.log(err);
      });
    }
  },
};
</script>

<style scoped>
.collect {
  margin: 50px auto;
  width: 1100px;
}

.collect-course {
  text-align: left;
  margin: 20px auto;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  box-shadow: 0 0 3px rgba(95, 101, 105, 0.15);
  background: #F2F6FC;
}

.collect-course:hover {
  background-color: #E4E7ED;
}

.collect-time {
  text-align: right;
  float: right;
  font-size: 13px;
  margin: 20px 20px 0 0;
}

.collect-icon {
  margin: 10px;
}

.collect-teacher {
  display: flex;
}

.collect-teacher img {
  border-radius: 50px;
  margin: 5px;
  height: 30px;
  width: 30px;
}

.collect-content {
  display: flex;
  text-align: left;
}

.collect-img {
  cursor: pointer;
  height: 130px;
  width: 230px;
  margin: 20px;
}

.collect-img img {
  width: 100%;
  height: 100%;
}

.collect-text {
  text-align: left;
}

.collect-text-title {
  cursor: pointer;
}

.block {
  margin-top: 20px;
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #1c1f21;
}
</style>
