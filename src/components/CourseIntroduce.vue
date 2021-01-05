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
            <div class="Summary">
              <div>
                <img src="../assets/logo.png" alt="图片缺失">
                <h3>课程概述</h3>
              </div>
              <p>
                《电路》课程是自动化专业及其相近专业的必修课程，是学生学习和掌握电路基本理论知识和电路分析基本方法的专业基础课程。本课程在教学内容方面侧重于基本知识、基本理论和基本分析方法的讲解；另外独立开设的实验课程培养相应的实践能力。

                本课程内容包括：电路的基本概念与基本定律、电阻电路的等效变换、线性电路的基本分析方法、基本定理、含有理想运放的电路分析、正弦交流电路的稳态分析、含有互感的电路、三相电路、双口网络、一阶电路的时域分析、二阶电路的时域分析等内容。

                该课程不仅为后续专业课的学习打基础，对发展学生科学思维、培养学生分析问题、解决问题也具有十分重要的作用，同时也为学生今后从事自动化专业相关领域的实际工作打下必要的理论基础。
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="课程评价" name="second">
            <div class="block">
              <span class="demonstration">课程难度适合</span>
              <el-rate
                  v-model="value1"
                  :colors="colors"
                  show-score>
              </el-rate>
            </div>
            <div class="block">
              <span class="demonstration">老师风趣幽默</span>
              <el-rate
                  v-model="value2"
                  :colors="colors"
                  show-score>
              </el-rate>
            </div>
            <div class="block">
              <span class="demonstration">老师讲解生动</span>
              <el-rate
                  v-model="value3"
                  :colors="colors"
                  show-score>
              </el-rate>
            </div>
            <div class="block">
              <span class="demonstration">课程氛围良好</span>
              <el-rate
                  v-model="value4"
                  :colors="colors"
                  show-score>
              </el-rate>
            </div>
            <div class="block">
              <span class="demonstration">播放环境良好</span>
              <el-rate
                  v-model="value5"
                  :colors="colors"
                  show-score>
              </el-rate>
            </div>
            <div>
              <el-input type="textarea" class="Comment" v-model="textarea" placeholder="请输入内容"></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside width="300px">
        <div>
          <h3>授课老师</h3>
        </div>
        <div class="TeacherHead">
          <img src="../assets/teacherhead2.png" style="height:100%; width:100%;" alt="图片缺失">
        </div>
        <div class="TeacherName">
          蛙博士
        </div>
        <div class="TeacherIntroduce">
          《蛙博士爱讲课》视频讲解
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "CourseIntroduce",
  data() {
    return {
      activeName: 'first',
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      value5: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      textarea: '',
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
}
</script>

<style scoped>
.el-aside {
  border-radius: 10px;
  border: #99a9bf 1px solid;
  color: #333;
}

.el-main {
  text-align: center;
  border-radius: 10px;
  border: 1px black solid;
  color: #333;
  line-height: 30px;
}

.el-container {
  margin: 50px 100px;
  height: 500px;
}

.TeacherHead {
  height: 100px;
  width: 100px;
  float: left;
  margin: 10px 10px;
}

.TeacherName {
  text-align: center;
  font-size: 20px;
  float: left;
}

.TeacherIntroduce {
  float: left;
  font-size: 14px;
}

.Team {
  text-align: left;
  float: left;
  background: #d3dce6;
}

.TeamName {
  float: right;
}

.Summary {
  text-align: left;
}

.Summary p {
  float: left;
  margin: 0;
}

.Summary h3 {
  float: left;
  margin: 30px 10px 10px 10px;
}

.Summary img {
  float: left;
  height: 40px;
  width: 40px;
  margin: 30px 10px 10px 10px;
}

</style>
<style>
.Comment textarea.el-textarea__inner {
  padding: 10px 10px 90px 10px;
}
</style>
