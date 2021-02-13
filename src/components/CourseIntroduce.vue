<template>
  <div>
    <el-container>
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程介绍" name="first">
            <div class="content">
              <div class="content-Title">
                <img src="../assets/logo.png" alt="图片缺失">
                <h3>课程概述</h3>
              </div>
              <p>
                《电路》课程是自动化专业及其相近专业的必修课程，是学生学习和掌握电路基本理论知识和电路分析基本方法的专业基础课程。本课程在教学内容方面侧重于基本知识、基本理论和基本分析方法的讲解；另外独立开设的实验课程培养相应的实践能力。

                本课程内容包括：电路的基本概念与基本定律、电阻电路的等效变换、线性电路的基本分析方法、基本定理、含有理想运放的电路分析、正弦交流电路的稳态分析、含有互感的电路、三相电路、双口网络、一阶电路的时域分析、二阶电路的时域分析等内容。

                该课程不仅为后续专业课的学习打基础，对发展学生科学思维、培养学生分析问题、解决问题也具有十分重要的作用，同时也为学生今后从事自动化专业相关领域的实际工作打下必要的理论基础。
              </p>
            </div>
            <div class="content">
              <div class="content-Title">
                <img src="../assets/logo.png" alt="图片缺失">
                <h3>授课目标</h3>
              </div>
              <ul>
                <li>增强学生对恶意代码攻击机理的理解</li>
                <li>促进学生掌握恶意代码检测机理</li>
                <li>提升学生恶意代码分析能力</li>
                <li>帮助学生进一步构建网络攻防博弈思维</li>
                <li>提升学生在恶意代码领域的创新思维与综合实践能力</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="课程评价" name="second">
            <classevaluate :evalabel="evaluatelabel" :colors="colors" @pass="fchange"></classevaluate>
            <div>
              <el-input type="textarea" class="Comment" v-model="textarea" placeholder="请输入内容"></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside>
        <div>
          <h3>授课老师</h3>
        </div>
        <el-divider></el-divider>
        <div class="Teacher">
          <img :src="data[0].courseChapterJson.course.teacher.teacherPicUrl" alt="图片缺失">
          <div class="Teacher-Introduce">
            <div class="TeacherName">
              {{ data[0].courseChapterJson.course.teacher.name }}
            </div>
            <div class="TeacherSchool">
              {{ data[0].courseChapterJson.course.teacher.school }}
            </div>
          </div>
        </div>
      </el-aside>
    </el-container>
    <div class="RelatedCourses">
      <div class="RelatedCourses-Title">
        <h3>
          相关课程
        </h3>
      </div>
      <el-row :gutter="25">
        <el-col :span="6" v-for="(item,index) in this.$store.state.RelatedCourses" v-bind:key="index">
          <router-link :to="{path:'/course',query:{courseId:item.courseId}}">
            <div class="grid-content">
              <img :src="item.src" alt="图片缺失">
              <h4>{{ item.name }}</h4>
              <h6>{{ item.teacherId }}</h6>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import classevaluate from "./childcpn/classevaluate";
import axios from "axios";

export default {
  name: "CourseIntroduce",
  data() {
    return {
      activeName: 'first',
      data: this.$store.state.chapterData,
      value: [null, null, null, null, null],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      textarea: '',
      evaluatelabel: ["课程难度适合", "老师风趣幽默", "老师讲解生动", "课程氛围良好", "播放环境良好"],
    };
  },
  created() {
    this.RelatedCourse();
  },
  methods: {
    RelatedCourse() {
      let that = this;
      let a = new URLSearchParams;
      a.append("courseId", this.data[0].courseChapterJson.course.courseId)
      axios.post("http://" + this.Api + "/api/Course/getRelatedCourses?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log(response);
        that.$store.commit('saveRelatedCourses', response.data.data);
      }, function (err) {
        console.log(err);
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    fchange(num, index) {               //接受子组件传递来的评价
      this.value = num;
      console.log(this.value, index);
    }
  },
  components: {
    classevaluate,
  }
}
</script>

<style scoped>
.el-aside {
  border-radius: 10px;
  border: #C0C4CC 1px solid;
  color: #333;
  width: 300px;
}

.el-main {
  text-align: center;
  border-radius: 10px;
  border: 1px #C0C4CC solid;
  color: #333;
  line-height: 30px;
}

.el-container {
  margin: 50px auto;
  width: 1100px;
}

.Teacher {
  text-align: left;
  display: flex;
}

.Teacher img {
  height: 100px;
  width: 100px;
  margin: 10px 10px;
}

.TeacherName {
  font-size: 20px;
  margin: 10px;
}

.TeacherSchool {
  margin: 10px;
  font-size: 14px;
}

.content {
  text-align: left;
}

.content-Title {
  display: flex;
}

.content h3 {
  margin: 30px 10px 10px 10px;
}

.content img {
  height: 40px;
  width: 40px;
  margin: 30px 10px 10px 10px;
}

.content ul {
  margin-top: 0;
}

.RelatedCourses {
  margin: 50px auto;
  width: 1100px;
}

.RelatedCourses-Title {
  margin: 50px 20px 30px 20px;
  text-align: left;
}

.grid-content {
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  height: 240px;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.grid-content img {
  border-radius: 10px;
  width: 100%;
}

.grid-content h4 {
  margin: 10px;
}

.grid-content h6 {
  margin: 10px 10px 20px 10px;
}

.grid-content:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

a {
  text-decoration: none;
  color: #1c1f21;
}
</style>
<style>
.Comment textarea.el-textarea__inner {
  padding: 10px 10px 90px 10px;
}
</style>
