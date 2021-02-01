<template>
  <div class="taskTitle">
    <el-button @click="GoBackCourse">返回课程</el-button>
    <div class="task" v-for="(item,index) in this.$store.state.chapterData" v-bind:key="index">
      <h3>{{ JSON.parse(index).chapterIntro }}</h3>
      <el-divider></el-divider>
      <el-row :gutter="25">
        <el-col :span="6" v-for="(value,indexTask) in item.TaskList" v-bind:key="indexTask">
          <div class="grid-content">
            <div class="content">
              <h4>{{ value.taskName }}</h4>
              <h6>开始时间：2021-01-21 10:00</h6>
              <h6>截止时间：2021-02-24 12:00</h6>
              <h6>作业状态：待做</h6>
            </div>
            <div class="state">
              <el-button @click="Task">做作业</el-button>
            </div>
            <div class="clear"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: "TaskMenu",
  methods: {
    GoBackCourse() {
      this.$router.push('/course')
    },
    Task() {
      this.$router.push('/task')
    },
  },
}
</script>

<style scoped>
.taskTitle {
  margin: 20px 150px;
}

.taskTitle button {
  float: right;
  background: #409eff;
  color: white;
  margin: 0 20px;
}

.task h3 {
  margin: 50px 20px;
  text-align: left;
}

.grid-content {
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.content {
  margin: 10px;
}

.content h4 {
  margin: 20px 0;
}

.content h6 {
  margin: 15px 0;
}

.state {
  height: 50px;
  background: #e8eeda;
}

.state button {
  float: right;
  background: #7b9e31;
  color: white;
  margin: 5px;
}

a {
  text-decoration: none;
  color: #1c1f21;
}

.router-link-active {
  text-decoration: none;
}

.clear {
  clear: both;
}
</style>
