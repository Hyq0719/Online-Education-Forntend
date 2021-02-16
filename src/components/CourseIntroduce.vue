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

            <el-card :body-style="{ padding: '20px'}" v-show="evaluateBox"
                     style="position: relative;margin: 20px;overflow: hidden;min-height: 100px">
              <classevaluate :evalabel="evaluateLabel" :colors="colors" @pass="fchange"></classevaluate>
              <div>
                <el-input type="textarea" class="Comment" v-model="textarea" placeholder="请输入内容"></el-input>
              </div>
              <el-button round style="float: right;margin: 20px" @click="commentCourse">评价课程</el-button>
            </el-card>

            <el-card :body-style="{ padding: '20px'}" v-show="evaluateBox2"
                     style="position: relative;margin: 20px;overflow: hidden;min-height: 100px">
              <classevaluate :evalabel="evaluateLabel" :colors="colors" @pass="fchange"></classevaluate>
              <div>
                <el-input type="textarea" class="Comment" v-model="textarea" placeholder="请输入内容"></el-input>
              </div>
              <div>
                <el-button round style="float: right;margin: 20px" @click="commentCourse">评价课程</el-button>
                <el-button round style="float: right;margin: 20px" @click="exitEditComment">取消</el-button>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '5px'}" v-show="currentComment"
                     style="position: relative;margin: 5px;overflow: hidden;min-height: 80px">
              <div style="overflow: hidden">
                <div style="text-align:left;font-size: 12px;margin: 0 10px">
                  <div style="display: inline;margin-right: 20px"> {{ currentUserComment.time }}</div>
                  <div style="display: inline;margin-right: 20px"> 点赞数：{{ currentUserComment.likes }}</div>
                  <el-rate style="display: inline"
                           v-model="currentUserComment.commentMark"
                           disabled
                           show-score
                           text-color="#ff9900"
                           score-template="{value}">
                  </el-rate>
                </div>
              </div>
              <div style="overflow: hidden;text-align:left;margin: 10px 10px">
                <div style="display: inline;color: red;font-size: 16px"> 我的评价：</div>
                <div style="display:inline;font-size: 16px"> {{ currentUserComment.content }}</div>
                <div style="display:inline;width: 400px">
                  <el-button round style="float: right" @click="editComment">编辑</el-button>
                </div>
              </div>
            </el-card>


            <el-card :body-style="{ padding: '5px'}" v-for="(item,index) in comment" :key="index"
                     style="position: relative;margin: 5px;overflow: hidden;min-height: 80px">
              <div>
                <div style="text-align:left;font-size: 12px;margin: 0 10px">
                  <div style="display: inline;margin-right: 20px"> {{ item.time }}</div>

                  <el-rate style="display: inline"
                           v-model="item.commentMark"
                           disabled
                           show-score
                           text-color="#ff9900"
                           score-template="{value}">
                  </el-rate>
                  <div style="float: right;margin-top: 20px">
                    <el-button  circle class="commentStar"
                               @click="commentStar(item,index)">
                      <img src="@/assets/damuzhi.png" width="20px" height="20px">
                    </el-button>
                    <div style="text-align: center"> {{ item.likes }}</div>
                  </div>
                </div>
              </div>
              <div style="overflow: hidden;margin: 10px 10px">
                <div style="float:left;text-align:left;font-size: 16px"> {{ item.content }}</div>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside>
        <div>
          <h3>授课老师</h3>
        </div>
        <el-divider></el-divider>
        <div class="Teacher" v-if="this.$store.state.courseData.teacher">
          <img :src="this.$store.state.courseData.teacher.teacherPicUrl" alt="图片缺失">
          <div class="Teacher-Introduce">
            <div class="TeacherName">
              {{ this.$store.state.courseData.teacher.name }}
            </div>
            <div class="TeacherSchool">
              {{ this.$store.state.courseData.teacher.school }}
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
          <router-link :to="{path:'/course',query:{courseId:item.courseId}}" @click.native="Chapter()">
            <div class="grid-content">
              <img :src="item.src" alt="图片缺失">
              <h4>{{ item.name }}</h4>
              <h6>{{ item.teacher.name }}</h6>
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
      value: [null],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      textarea: '',
      evaluateLabel: ["课程打分"],
      comment: this.$store.state.commentData,
      evaluateBox: true,
      evaluateBox2: false,
      currentComment: false,
      currentUserComment: {},
    };
  },
  methods: {
    async commentStar(item, index) {
      let that = this;
      if (that.$store.state.isLogin !== false){
      let JWT = that.$store.state.JWT;
      document.getElementsByClassName('commentStar')[index].classList.toggle("pink");
      if (document.getElementsByClassName('commentStar')[index].classList[4] !== "pink") {          //取消点赞
        let a = new URLSearchParams();
        a.append('commentId', item.commentId);
        a.append('user_id', that.$store.state.userData.userId);
        item.likes = item.likes - 1;
        await axios.post("http://" + that.Api + "/api/Student/dislikeComment", a, {
          headers: {
            'Authorization': JWT,
          }
        }).then(function (response) {
          // console.log(response);
          if (response.data.code === 1000) {
            console.log("取消点赞成功");
          }
        }, function (err) {
          console.log(err);
        });
      } else {  //点赞
        let a = new URLSearchParams();
        a.append('commentId', item.commentId);
        a.append('user_id', that.$store.state.userData.userId);
        item.likes++;
        await axios.post("http://" + that.Api + "/api/Student/likeComment", a, {
          headers: {
            'Authorization': JWT,
          }
        }).then(function (response) {
          // console.log(response);
          if (response.data.code === 1000) {
            console.log("点赞成功");
          }
        }, function (err) {
          console.log(err);
        });}
      }
      else {
        that.$message.error('请登陆后评论');
        that.$router.push('/login');
      }
    },
    editComment() {
      this.textarea = this.currentUserComment.content;
      this.evaluateBox2 = true;
      this.currentComment = false;
    },
    exitEditComment() {
      this.textarea = '';
      this.evaluateBox2 = false;
      this.currentComment = true;
    },
    Chapter() {
      this.$router.go(0);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    fchange(num, index) {               //接受子组件传递来的评价
      this.value = num;
      console.log(this.value, index);
    },
    commentCourse() {
      let that = this;
      if (that.value[0] === null & that.textarea === '') {
        that.$notify.info({
          title: '警告',
          message: '请输入评价或打分',
          type: 'warning',
        });
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
                // console.log(response);
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
                    // console.log(response);
                    if (response.data.code === 1000) {
                      if (response.data.data == null) ;
                      else {
                        that.currentUserComment = response.data.data;
                        that.evaluateBox = false;
                        that.evaluateBox2 = false;
                        that.currentComment = true;
                        that.displayComment();
                      }
                      that.comment = that.$store.state.commentData;

                    }
                  }, function (err) {
                    console.log(err);
                  });
                }
              }, function (err) {
                console.log(err);
              });
            });
      }
    },
    //发送评论
    async displayComment() {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('courseId', that.$route.query.courseId);
      a.append('page', 1);
      a.append('sort', 1);
      await axios.post("http://" + that.Api + "/api/Course/getCourseComments", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        if (response.data.code === 1000) {
          that.$store.commit("saveCommentData", response.data.data.list);
          that.comment = that.$store.state.commentData;

          if (that.$store.state.isLogin !== false) {
          let clist = new Array();
          console.log("查看全部评论：", that.comment);
          let c = that.comment;
          for (let i = 0; i < c.length; i++) {
            clist[i] = c[i].commentId;
          }
          console.log("查看评论的ID:", clist);
          let pa = new URLSearchParams();
          let params = clist;
          // pa.append('commentIds', JSON.stringify(clist));
          let id = that.$store.state.userData.userId;
          pa.append('user_id', that.$store.state.userData.userId);
          axios.post("http://" + that.Api + "/api/Student/getStudentIsLikedComments?user_id=" + id, params, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': JWT,
            }
          }).then(function (response) {
            console.log("查看点赞成功", response);
            if (response.data.code === 1000) {
              for (let j = 0; j < c.length; j++) {
                for (let k = 0; k < response.data.data.length; k++) {
                  if (c[j].commentId === response.data.data[k].commentId) {
                    document.getElementsByClassName('commentStar')[j].classList.add("pink");
                  }
                }
              }
            }
          }, function (err) {
            console.log(err);
          });}

        }
      }, function (err) {
        console.log(err);
      });
    },
  },
  components: {
    classevaluate,
  },
  mounted: function () {
    let that = this;
    let JWT = that.$store.state.JWT;
    that.displayComment();
    console.log("用户信息："+that.$store.state.userData);
    if (that.$store.state.isLogin !== false) {
      let b = new URLSearchParams();
      b.append('course_id', that.$route.query.courseId);
      b.append('user_id', that.$store.state.userData.userId);
      axios.post("http://" + that.Api + "/api/Student/getCourseCommentByStudentAndCourse", b, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("获取评论成功");
        if (response.data.code === 1000) {
          if (response.data.data == null) ;
          else {
            that.currentUserComment = response.data.data;
            that.evaluateBox = false;
            that.currentComment = true;
          }
          that.comment = that.$store.state.commentData;
        }
      }, function (err) {
        console.log(err);
      });
    }
    else
    {
      that.evaluateBox= false;
      console.log("关闭评论")
    }
  },
};
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

.pink {
  background-color: #00CCFF;
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

.Comment textarea.el-textarea__inner {
  padding: 10px 10px 90px 10px;
}
</style>
