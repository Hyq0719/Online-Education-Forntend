<template>
  <div class="Homework">
    <div class="Homework-content">
      <div class="Homework-content-content" v-for="(value,index) in this.$store.state.StudentHomework.list"
           v-bind:key="index">
        <div class="icon" @click="DeleteHomework(value.homeworkId)">
          <i class="el-icon-circle-close"></i>
        </div>
        <div class="content">
          <h4>{{ value.task.taskName }}</h4>
          <h6>课程：{{ value.task.courseChapter.course.name }}</h6>
          <h6>章节：{{ value.task.courseChapter.chapterIntro }}</h6>
          <h6 v-if="value.commitTime">提交时间：</h6>
          <h6 v-if="value.commitTime">{{ value.commitTime }}</h6>
          <h6 v-if="!value.commitTime">作业未提交</h6>
        </div>
        <div class="state">
          <el-button v-if="value.commitTime&&value.mark"
                     @click="Task(value.task.courseId,value.task.chapterId,value.taskId)">
            查看
          </el-button>
          <el-button v-if="!value.commitTime" @click="Task(value.task.courseId,value.task.chapterId,value.taskId)">
            做作业
          </el-button>
          <el-button v-if="value.commitTime&&!value.mark"
                     @click="Task(value.task.courseId,value.task.chapterId,value.taskId)">
            修改
          </el-button>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="this.$store.state.StudentHomework.total_element">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Homework",
  data() {
    return {
      currentPage: 1,
    };
  },
  created() {
    this.initHomework();
  },
  methods: {
    initHomework() {
      let a = new URLSearchParams;
      let that = this;
      a.append("page", 1);
      a.append("studentId", this.$store.state.userData.userId);
      axios.post("http://" + this.Api + "/api/Homework/getByStudent?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("当前学生作业", response);
        that.$store.commit('saveStudentHomework', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    handleCurrentChange(currentPage) {
      console.log("当前页", currentPage);
      let a = new URLSearchParams;
      let that = this;
      a.append("page", currentPage);
      a.append("studentId", this.$store.state.userData.userId);
      axios.post("http://" + this.Api + "/api/Homework/getByStudent?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("当前学生作业", response);
        that.$store.commit('saveStudentHomework', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    DeleteHomework(homeworkId) {
      this.$confirm(`确定删除作业？`).then(() => {
        let a = new URLSearchParams;
        let that = this;
        a.append("homeworkId", homeworkId);
        axios.post("http://" + this.Api + "/api/Homework/deleteHomeWork?" + a, null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.JWT,
          }
        }).then(function (response) {
          console.log("删除作业", response);
          that.initHomework();
          that.currentPage = 1;
        }, function (err) {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    Task(courseId, chapterId, taskId) {
      this.$router.push({
        path: '/task',
        query: {courseId: courseId, chapterId: chapterId, taskId: taskId}
      });
    },
  },
}
</script>

<style scoped>
.Homework {
  margin: 50px auto;
  width: 1100px;
}

.icon {
  float: right;
  margin: 5px;
  cursor: pointer;
}

.icon:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.Homework-content {
  display: flex;
  flex-wrap: wrap;
}

.Homework-content-content {
  width: 17%;
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  margin: 10px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.content {
  height: 140px;
  border-radius: 10px;
  margin: 10px;
}

.content h4 {
  margin: 20px 0;
}

.content h6 {
  margin: 10px 0;
}

.state {
  border-radius: 10px;
  height: 50px;
  background: #e8eeda;
  flex-direction: row-reverse;
  display: flex;
}

.state button {
  background: #7b9e31;
  color: white;
  margin: 5px;
}

a {
  text-decoration: none;
  color: #1c1f21;
}

.block {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
