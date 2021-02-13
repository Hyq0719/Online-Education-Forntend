<template>
  <div>
    <el-container>
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程介绍" name="first">
            <div class="Team">
              <p>
                《电路》课程是电气工程及其自动化专业、自动化专业、测控技术与仪器专业的专业基础必修课。通过本课程的学习，使学生掌握电路理论的基本知识、基本分析计算方法和基本实验技能，为学习后继相关课程准备必要的电路理论知识，为从事工程技术工作、科学研究以及开拓性技术领域打下坚实的基础。
              </p>
              <div class="TeamName">
                <p>
                  —— 课程团队
                </p>
              </div>
            </div>
            <div class="content">
              <div>
                <img src="../assets/logo.png" alt="图片缺失">
                <h3>课程概述</h3>
              </div>
              <div class="clear"></div>
              <p>
                《电路》课程是自动化专业及其相近专业的必修课程，是学生学习和掌握电路基本理论知识和电路分析基本方法的专业基础课程。本课程在教学内容方面侧重于基本知识、基本理论和基本分析方法的讲解；另外独立开设的实验课程培养相应的实践能力。

                本课程内容包括：电路的基本概念与基本定律、电阻电路的等效变换、线性电路的基本分析方法、基本定理、含有理想运放的电路分析、正弦交流电路的稳态分析、含有互感的电路、三相电路、双口网络、一阶电路的时域分析、二阶电路的时域分析等内容。

                该课程不仅为后续专业课的学习打基础，对发展学生科学思维、培养学生分析问题、解决问题也具有十分重要的作用，同时也为学生今后从事自动化专业相关领域的实际工作打下必要的理论基础。
              </p>
            </div>
            <div class="content">
              <div>
                <img src="../assets/logo.png" alt="图片缺失">
                <h3>授课目标</h3>
              </div>
              <div class="clear"></div>
              <ul>
                <li>增强学生对恶意代码攻击机理的理解</li>
                <li>促进学生掌握恶意代码检测机理</li>
                <li>提升学生恶意代码分析能力</li>
                <li>帮助学生进一步构建网络攻防博弈思维</li>
                <li>提升学生在恶意代码领域的创新思维与综合实践能力</li>
              </ul>
            </div>
            <div class="content">
              <div>
                <img src="../assets/logo.png" alt="图片缺失">
                <h3>预备知识</h3>
              </div>
              <div class="clear"></div>
              <ul>
                <li>操作系统基础知识</li>
                <li>基本的汇编基础</li>
                <li>基本的脚本语言基础</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="课程评价" name="second">

            <el-card :body-style="{ padding: '20px'}" v-show="evaluateBox"
                     style="position: relative;margin: 20px;overflow: hidden;min-height: 100px">
              <classevaluate :evalabel="evaluateLabel" :colors="colors" @pass="fchange"></classevaluate>
              <div>
                <el-input type="textarea" class="Comment" v-model="textarea" placeholder="请输入内容"></el-input>
              </div>
              <el-button round style="float: right;margin: 20px" @click="commentCourse">评价课程</el-button>
            </el-card>

            <el-card :body-style="{ padding: '20px'}" v-show="currentComment"
                     style="position: relative;margin: 20px;overflow: hidden;min-height: 100px">
              <div style="float:left;overflow: hidden">
                <div style="text-align:left"> 我的评价：</div>
              </div>
              <div style="float:left;overflow: hidden">
                <div style="text-align:left"> {{ currentUserComment.content }}</div>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px'}" v-for="(item,index) in comment" :key="index"
                     style="position: relative;margin: 20px;overflow: hidden;min-height: 100px">
              <div style="float:left;overflow: hidden">
                <div style="text-align:left"> {{ item.content }}</div>
              </div>
            </el-card>
            <!--            <el-card :body-style="{ padding: '20px'}" style="position: relative;margin: 20px;overflow: hidden;min-height: 100px">-->
            <!--              <div style="float: left;width: 100px;overflow: hidden">-->
            <!--                <img src="@/assets/user1.jpg" width="60px" height="60px" style="vertical-align: top">-->
            <!--              </div>-->
            <!--              <div >-->
            <!--                <div style="text-align: left"> 老师讲的很好</div>-->
            <!--              </div>-->
            <!--            </el-card>-->
            <!--            <el-card :body-style="{ padding: '20px'}" style="position: relative;margin: 20px;overflow: hidden;min-height: 100px">-->
            <!--              <div style="float: left;width: 100px;overflow: hidden">-->
            <!--                <img src="@/assets/user1.jpg" width="60px" height="60px" style="vertical-align: top">-->
            <!--              </div>-->
            <!--              <div >-->
            <!--                <div style="text-align: left"> 我想问一个问题</div>-->
            <!--              </div>-->
            <!--            </el-card>-->

          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside>
        <div>
          <h3>授课老师</h3>
        </div>
        <el-divider></el-divider>
        <div class="Teacher">
          <img src="../assets/teacherhead.png" alt="图片缺失">
          <div class="TeacherName">
            猴博士
          </div>
          <div class="TeacherIntroduce">
            《猴博士爱讲课》视频讲解
          </div>
        </div>
        <div class="Teacher">
          <img src="../assets/teacherhead2.png" alt="图片缺失">
          <div class="TeacherName">
            青蛙博士
          </div>
          <div class="TeacherIntroduce">
            《青蛙博士爱讲课》视频讲解
          </div>
        </div>
      </el-aside>
    </el-container>
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
      value: [null, null, null, null, null],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      textarea: '',
      evaluateLabel: ["课程打分"],
      comment: this.$store.state.commentData,
      evaluateBox: true,
      currentComment: false,
      currentUserComment: {},
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    fchange(num, index) {               //接受子组件传递来的评价
      this.value = num;
      console.log(this.value, index);
    },
    commentCourse() {
      let that = this;
      if (that.value[0] == null & that.textarea == '') {
        that.$notify.info({
          title: '警告',
          message: '请输入评价或打分',
          type: 'warning',
        })
      } else {
        that.$confirm('确定要提交评论吗？')
            .then(_ => {
              let that = this;
              let JWT = that.$store.state.JWT;
              let params = {
                comment: that.textarea,
                commentMark: that.value[0],
                courseId: that.$route.query.courseId,
                studentId: that.$store.state.userData.userId,
              };
              axios.post("http://" + that.Api + "/api/Student/commentCourseByCourseId", params, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': JWT,
                }
              }).then(function (response) {
                console.log(response);
                if (response.data.code === 1000) {
                  console.log("提交成功");

                  let b = new URLSearchParams();
                  b.append('course_id', that.$route.query.courseId);
                  b.append('user_id', that.$store.state.userData.userId);
                  axios.post("http://" + that.Api + "/api/Student/getCourseCommentByStudentAndCourse", b, {
                    headers: {
                      'Authorization': JWT,
                    }
                  }).then(function (response) {
                    console.log(response);
                    if (response.data.code === 1000) {
                      if (response.data.data == null) ;
                      else {
                        that.currentUserComment = response.data.data;
                        that.evaluateBox = false;
                        that.currentComment = true;
                      }
                      that.comment = this.$store.state.commentData;

                    }
                  }, function (err) {
                    console.log(err);
                  });
                }
              }, function (err) {
                console.log(err);
              })
            })
      }
    },
  },
  components: {
    classevaluate,
  },
  mounted: function () {
    let that = this;
    let JWT = that.$store.state.JWT;
    let a = new URLSearchParams();
    a.append('courseId', that.$route.query.courseId);
    a.append('page', 1);
    a.append('sort', 1);
    axios.post("http://" + that.Api + "/api/Course/getCourseComments", a, {
      headers: {
        'Authorization': JWT,
      }
    }).then(function (response) {
      console.log(response);
      if (response.data.code === 1000) {
        that.$store.commit("saveCommentData", response.data.data.list);
        console.log(that.$store.state.commentData);
        that.comment = this.$store.state.commentData;
      }
    }, function (err) {
      console.log(err);
    });

    let b = new URLSearchParams();
    b.append('course_id', that.$route.query.courseId);
    b.append('user_id', that.$store.state.userData.userId);
    axios.post("http://" + that.Api + "/api/Student/getCourseCommentByStudentAndCourse", b, {
      headers: {
        'Authorization': JWT,
      }
    }).then(function (response) {
      console.log(response);
      if (response.data.code === 1000) {
        if (response.data.data == null) ;
        else {
          that.currentUserComment = response.data.data;
          that.evaluateBox = false;
          that.currentComment = true;
        }
        that.comment = this.$store.state.commentData;
      }
    }, function (err) {
      console.log(err);
    });
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
}

.Teacher img {
  height: 100px;
  width: 35%;
  margin: 10px 10px;
  float: left;
  clear: left;
}

.TeacherName {
  text-align: center;
  font-size: 20px;
  float: left;
  margin-bottom: 10px;
}

.TeacherIntroduce {
  float: left;
  font-size: 14px;
  width: 55%;
}

.Team {
  text-align: left;
  float: left;
  background: #d3dce6;
}

.TeamName {
  float: right;
}

.content {
  text-align: left;
}

.content p {

}

.content h3 {
  float: left;
  margin: 30px 10px 10px 10px;
}

.content img {
  float: left;
  height: 40px;
  width: 40px;
  margin: 30px 10px 10px 10px;
}

.content ul {
  margin-top: 0;
}

.clear {
  clear: both;
}
</style>
<style>
.Comment textarea.el-textarea__inner {
  padding: 10px 10px 90px 10px;
}
</style>
