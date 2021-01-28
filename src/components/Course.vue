<template>
  <el-container>
    <el-main>
      <VideoPlayer></VideoPlayer>
    </el-main>
    <el-aside width="300px">
      <el-menu
          class="el-menu-vertical-demo"
          @open="Chapter(item.courseChapterPK.chapterId,item.courseChapterPK.courseId,item.courseChapterPK,item.chapterIntro,index)"
          @close="handleClose"
          v-for="(item,index) in this.$store.state.chapterData" v-bind:key="index">
        <el-submenu :index="String(index)">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ item.chapterIntro }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="1+String(index1)" v-for="(value,index1) in item.video"
                          v-bind:key="index1">
              {{ value.videoName }}
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
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    Chapter(chapterId, courseId, courseChapterPK, chapterIntro, index) {
      // console.log(courseId);
      // console.log(courseChapterPK);
      let that = this;
      let a = new URLSearchParams();
      a.append('chapterId', chapterId);
      a.append('courseId', courseId);
      axios.post("http://" + this.Api + "/api/Course/getCourseChapterViedo", a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log(response);
        that.$store.commit('saveVideo', {video: response.data.data, chapterIntro, courseChapterPK, index})
        console.log(index);
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
</style>
