<template>
  <el-container>
    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="直播介绍" name="first">
          <img src="../assets/courseintroduction.png" alt="图片缺失" style="height: 380px; width: 100%;">
        </el-tab-pane>
        <el-tab-pane label="直播评价" name="second">
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
            <span class="demonstration">直播环境良好</span>
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
        <h3>直播老师</h3>
      </div>
      <div class="TeacherHead">
        <img src="../assets/teacherhead.png" style="height:100%; width:100%;">
      </div>
      <div class="TeacherName">
        猴博士
      </div>
      <div class="TeacherIntroduce">
        《猴博士爱讲课》视频讲解
      </div>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: "Introduce",
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
  text-align: center;
}

.el-main {
  border-radius: 10px;
  border: 1px black solid;
  color: #333;
  text-align: center;
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
</style>
<style>
.Comment textarea.el-textarea__inner {
  padding: 10px 10px 90px 10px;
}
</style>
