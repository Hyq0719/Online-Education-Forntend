<template>
  <el-container>
    <el-main>
      <VideoPlayer></VideoPlayer>
    </el-main>
    <el-aside width="300px">
      <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          v-for="(item,index) in this.$store.state.chapterData" v-bind:key="index">
        <el-submenu :index="String(index)">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ JSON.parse(index).chapterIntro }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="1+String(index1)" v-for="(value,index1) in item.VideoList"
                          v-bind:key="'1'+index1" class="video">
              {{ value.videoName }}
            </el-menu-item>
            <el-menu-item :index="2+String(index1)" v-for="(value,index1) in item.TaskList"
                          v-bind:key="'2'+index1" class="task" @click="TaskMenu">
              {{ value.taskName }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios";

export default {
  name: "Course",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      input: '',
      courseId: this.$route.query.courseId,
    }
  },
  created() {
    this.Chapter();
  },
  methods: {
    TaskMenu() {
      this.$router.push('/taskmenu');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    Chapter() {
      console.log(this.courseId);
      let that = this;
      let a = new URLSearchParams();
      a.append('courseId', this.courseId);
      axios.post("http://" + this.Api + "/api/Course/getCourseDisplay", a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        that.$store.commit('saveChapterData', response.data.data)
      }, function (err) {
        console.log(err);
      })
    },
  },
}
</script>

<style scoped>
.el-aside {
  text-align: left;
  line-height: 20px;
  font-size: 10px;
}

.el-main {
  color: #333;
  text-align: center;
  padding: 0;
}

.el-container {
  margin: 20px 100px;
  height: 580px;
  border: #C0C4CC 1px solid;
  border-radius: 10px;
}

.video {
  color: #409EFF;
}

.task {
  color: #67C23A;
}
</style>
