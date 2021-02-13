<template>
  <el-container>
    <el-main>
      <VideoPlayer></VideoPlayer>
    </el-main>
    <el-aside>
      <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          v-for="(item,index) in this.$store.state.chapterData" v-bind:key="index">
        <el-submenu :index="String(index)">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ item.courseChapterJson.chapterIntro }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="1+String(indexItem)" v-for="(value,indexItem) in item.VideoList"
                          v-bind:key="'1'+indexItem" class="video">
              {{ value.videoName }}
            </el-menu-item>
            <el-menu-item :index="2+String(indexItem)" v-for="(value,indexItem) in item.TaskList"
                          v-bind:key="'2'+indexItem" class="task" @click="TaskMenu(index)">
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
      data: [],
    }
  },
  created() {
    this.Chapter();
  },
  methods: {
    TaskMenu(index) {
      console.log(index);
      this.$router.push({path: '/taskmenu', query: {chapterId: index}});
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
        console.log(response.data.data);
        let data = response.data.data;
        for (let courseChapter in data) {
          let courseChapterJson = JSON.parse(courseChapter)
          let VideoList = data[courseChapter].VideoList;
          let TaskList = data[courseChapter].TaskList;
          let courseInformation = {
            courseChapterJson,
            VideoList,
            TaskList,
          }
          that.data.push(courseInformation)
        }
        that.$store.commit('saveChapterData', that.data)
        console.log(that.data)
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
  width: 300px;
}

.el-main {
  color: #333;
  text-align: center;
  padding: 0;
  overflow: hidden;
}

.el-container {
  margin: 20px auto;
  width: 1100px;
  height: 550px;
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
