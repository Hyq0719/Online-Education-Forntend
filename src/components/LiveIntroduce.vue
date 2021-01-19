<template>
  <el-container>
    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="直播介绍" name="first">
          <img src="../assets/courseintroduction.png" alt="图片缺失" style="width: 100%;">
          <img src="../assets/courseintroduction1.png" alt="图片缺失" style="width: 100%;">
        </el-tab-pane>
        <el-tab-pane label="直播评价" name="second">
          <div class="block">
            <classevaluate :evalabel="evaluatelabel" :colors="colors" @pass="fchange"></classevaluate>
            <el-input type="textarea" class="Comment" v-model="textarea" placeholder="请输入内容"></el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-aside width="300px">
      <div>
        <h3>直播老师</h3>
      </div>
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
  border: grey 1px solid;
  color: #333;
  text-align: center;
}

.el-main {
  border-radius: 10px;
  border: 1px grey solid;
  color: #333;
  text-align: center;
  line-height: 30px;
}

.el-container {
  margin: 50px 100px;
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
