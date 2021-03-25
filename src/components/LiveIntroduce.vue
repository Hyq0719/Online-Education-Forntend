<template>
  <div>
    <el-container>
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="直播介绍" name="first">
            <div class="content">
              <div class="content-Title">
                <i class="el-icon-menu"></i>
                <h3>课程概述</h3>
              </div>
              {{ this.$store.state.LiveAllData.intro }}
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside>
        <div>
          <h3>直播老师</h3>
        </div>
        <div class="Teacher" v-if="this.$store.state.LiveAllData">
          <img :src="this.$store.state.LiveAllData.teacher.teacherPicUrl" alt="图片缺失"
               @click="Teacher($store.state.LiveAllData.teacherId)">
          <div class="Teacher-Introduce">
            <div class="TeacherName" @click="Teacher($store.state.LiveAllData.teacherId)">
              {{ this.$store.state.LiveAllData.teacher.name }}
            </div>
            <div class="TeacherSchool">
              {{ this.$store.state.LiveAllData.teacher.school }}
            </div>
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
    Teacher(teacherId) {
      this.$router.push({path: '/TeacherInfo', query: {teacherId: teacherId}});
    },
  },
  components: {
    classevaluate,
  },
};
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

.content-Title i {
  margin: 35px 0 10px 10px;
}

.content-Title h3 {
  margin: 30px 10px 10px 10px;
}

.Teacher {
  text-align: left;
  display: flex;
}

.Teacher img {
  cursor: pointer;
  height: 100px;
  width: 100px;
  margin: 10px 10px;
}

.TeacherName {
  cursor: pointer;
  font-size: 20px;
  margin: 10px;
}

.TeacherSchool {
  margin: 10px;
  font-size: 14px;
}

</style>
<style>
.Comment textarea.el-textarea__inner {
  padding: 10px 10px 90px 10px;
}
</style>
