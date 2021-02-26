<template>
  <el-container>
    <el-main>
      <VideoPlayer></VideoPlayer>
    </el-main>
    <el-aside>
      <el-menu
          class="el-menu-vertical-demo"
          :default-openeds="[($store.state.Video.chapterId - 1).toString()]"
          @open="handleOpen"
          @close="handleClose"
          v-for="(item,index) in this.$store.state.chapterData" v-bind:key="index">
        <el-submenu :index="String(index)">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ item.courseChapterJson.chapterIntro }}</span>
          </template>
          <el-menu-item-group>
            <el-radio-group v-model="$store.state.Video.videoId">
              <div :index="1+String(indexItem)" v-for="(value,indexItem) in item.VideoList"
                   v-bind:key="'1'+indexItem" class="video"
                   @click="Video($event,value.courseChapterVideoPK.videoId,value.videoUrl,value.courseChapterVideoPK.chapterId,value.courseChapterVideoPK.courseId)">
                <el-radio-button :label="value.courseChapterVideoPK.videoId">{{ value.videoName }}</el-radio-button>
              </div>
            </el-radio-group>
            <el-menu-item :index="2+String(indexItem)" v-for="(value,indexItem) in item.TaskList"
                          v-bind:key="'2'+indexItem" class="task"
                          @click="TaskMenu(item.courseChapterJson.courseChapterPK.courseId,item.courseChapterJson.courseChapterPK.chapterId)">
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
    };
  },
  methods: {
    TaskMenu(courseId, chapterId) {
      if (this.$store.state.isLogin) {
        console.log(courseId, chapterId);
        this.$router.push({path: '/taskmenu', query: {courseId: courseId, chapterId: chapterId}});
      }
      else{
        this.$message.error('请登录后查看课程任务');
      }
    },
    Video(e, videoId, videoUrl, chapterId, courseId) {
      if (e.target.tagName === 'INPUT') return // 因为原生click事件会执行两次，第一次在label标签上，第二次在input标签上，故此处理
      console.log(videoId, videoUrl, chapterId);
      this.$store.commit('saveVideo', {videoUrl: videoUrl, videoId: videoId, chapterId: chapterId});
      if (this.$store.state.isLogin) {
        let params = {
          chapterId: chapterId,
          courseId: courseId,
          studentId: this.$store.state.userData.userId,
          videoId: videoId,
        };
        axios.post("http://" + this.Api + "/api/Student/addWatchRecords", params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.JWT,
          }
        }).then(function (response) {
          console.log("成功添加历史记录", response);
        }, function (err) {
          console.log(err);
        });
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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

/deep/ .el-radio-button__inner {
  border: 0;
  width: 280px;
}

.video {
  color: #409EFF;
}

.task {
  color: #67C23A;
  text-align: center;
}
</style>
