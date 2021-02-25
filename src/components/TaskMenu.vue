<template>
  <div class="taskMenu">
    <div class="BackCourse-button">
      <el-button @click="GoBackCourse">返回课程</el-button>
    </div>
    <el-menu
        default-active="1"
        :default-openeds="[($route.query.chapterId - 1).toString()]"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        v-for="(item,index) in this.$store.state.chapterData" v-bind:key="index">
      <el-submenu :index="String(index)">
        <template slot="title">
          <div class="el-submenu-title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.courseChapterJson.chapterIntro }}</span>
          </div>
        </template>
        <div class="task">
          <el-row :gutter="25">
            <el-col :span="6" v-for="(value,indexTask) in item.TaskList" v-bind:key="indexTask">
              <div class="grid-content">
                <div class="content">
                  <h4>{{ value.taskName }}</h4>
                  <h6>开始时间：{{ value.startTime }}</h6>
                  <h6>截止时间：{{ value.endTime }}</h6>
                  <h6 v-if="Date.parse(new Date()) <= Date.parse(value.endTime)">作业状态：待做</h6>
                  <h6 v-if="Date.parse(new Date()) > Date.parse(value.endTime)">作业状态：已过期</h6>
                </div>
                <div class="state">
                  <el-button @click="Task(value.taskId)" v-if="Date.parse(new Date()) <= Date.parse(value.endTime)">
                    做作业
                  </el-button>
                  <el-button @click="Task(value.taskId)" v-if="Date.parse(new Date()) > Date.parse(value.endTime)">查看
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: "TaskMenu",
  data() {
    return {};
  },
  methods: {
    GoBackCourse() {
      this.$router.push({path: '/course', query: {courseId: this.$route.query.courseId}});
    },
    Task(taskId) {
      this.$router.push({
        path: '/task',
        query: {courseId: this.$route.query.courseId, chapterId: this.$route.query.chapterId, taskId: taskId}
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.taskMenu {
  margin: 20px auto;
  width: 1100px;
  text-align: left;
}

.BackCourse-button {
  display: flex;
  flex-direction: row-reverse;
}

.taskMenu button {
  background: #409eff;
  color: white;
  margin: 0 20px;
}

.el-menu-vertical-demo {
  border-right: 0;
  margin: 20px auto;
}

.el-submenu-title {
  font-size: 18px;

}

.task {
  margin: 30px auto;
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

.router-link-active {
  text-decoration: none;
}
</style>
