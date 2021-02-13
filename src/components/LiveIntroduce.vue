<template>
  <div>
    <el-container>
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="直播介绍" name="first">
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
          <el-tab-pane label="直播评价" name="second">
            <div class="block">
              <classevaluate :evalabel="evaluatelabel" :colors="colors" @pass="fchange"></classevaluate>
              <el-input type="textarea" class="Comment" v-model="textarea" placeholder="请输入内容"></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside>
        <div>
          <h3>直播老师</h3>
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
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import classevaluate from "@/components/childcpn/classevaluate";

export default {
  name: "LiveIntroduce",
  data() {
    return {
      activeName: 'first',
      value: [null, null, null, null, null],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      textarea: '',
      evaluatelabel: ["课程难度适合", "老师风趣幽默", "老师讲解生动", "课程氛围良好", "播放环境良好"],
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
  text-align: center;
  width: 300px;
}

.el-main {
  border-radius: 10px;
  border: 1px #C0C4CC solid;
  color: #333;
  text-align: center;
  line-height: 30px;
}

.el-container {
  width: 1100px;
  margin: 50px auto;
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
</style>
<style>
.Comment textarea.el-textarea__inner {
  padding: 10px 10px 90px 10px;
}
</style>
