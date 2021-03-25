<template>
  <div style="min-height: 480px">

    <el-main class="card-wrapper" style="padding: 0">
      <el-row  style="height: auto">
        <el-row class="subtitle">
          <h5 style="margin: 10px 24px;float: left">上传视频</h5>
        </el-row>
        <el-form :inline="true" label-width="80px" style="margin: 20px 0 10px 0">
          <el-form-item label="视频名称" style="width: 300px;margin-bottom: 0">
            <el-input
                placeholder="请输入内容"
                v-model="videoName"
                maxlength="10"
                show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="视频文件" style="width: 300px;margin-bottom: 0">
            <el-col>
              <el-row>
                <el-upload
                    class="upload-demo"
                    action=""
                    :http-request="uploadHttpVideo"
                    accept=".mp4"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileListVideo">
                  <el-button size="small" type="primary" v-loading="loading">点击上传视频</el-button>
                </el-upload>
              </el-row>
              <el-row v-show="progressView">
                <el-progress :text-inside="true" :stroke-width="26" :percentage="p"><span>上传进度</span></el-progress>
              </el-row>
            </el-col>
          </el-form-item>
          <!--          <el-button size="small" type="primary" @click="stop">暂停上传</el-button>-->
          <!--          <el-button size="small" type="primary" @click="resume">续传视频</el-button>-->
          <el-form-item style="width: 300px;margin-bottom: 0">
            <el-button type="primary" @click="sendVideo" style="float: right" v-loading="loading">上传<i
                class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-form>
        <el-row>

        </el-row>
      </el-row>
    </el-main>

    <el-main class="card-wrapper" >


      <el-table :data="videoData">
        <el-table-column prop="videoName" label="视频名称">
        </el-table-column>
        <el-table-column label="操作" width="500px">
          <template slot-scope="scope">

              <el-button type="primary" icon="el-icon-edit" @click="videoInfo=scope.row;dialog2 = true">修改视频</el-button>
              <el-button type="danger" icon="el-icon-delete"
                         @click.native.prevent="deleteVideo(scope.row.courseChapterVideoPK.courseId,scope.row.courseChapterVideoPK.chapterId)">
                删除视频
              </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-drawer
        title="修改视频"
        :with-header="false"
        :before-close="handleClose"
        v-if="dialog2"
        :visible.sync="dialog2"
        direction="rtl"
        ref="drawer"
        size="550px"
    >
      <editVideo @close="drawerClose" :info="videoInfo"></editVideo>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import ossClient from "@/aliyun.oss.client";

export default {
  name: "VideoList",
  components:{
    editVideo: () => import('@/components/classmanagement/tools/editVideo'),
  },
  data(){
    return{
      uploadConf: {
        endpoint: "https://oss-accelerate.aliyuncs.com",
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAI4GGsTQ35tQcWWDVNKwqG',
        accessKeySecret: 'reWjqrK73PE0ZvJQH0Hwjr9eyuWbuc',
        bucket: 'shu-online-edu',
      },
      videoInfo:{},
      partSize: 1024 * 1024, // 每个分片大小(byte)
      parallel: 3, // 同时上传的分片数
      checkpoints: {}, // 所有分片上传文件的检查点
      p:0,
      progressView: false,
      fileListVideo: [],
      videoName: '',
      loading: false,
      dialog2: false,
      videoData: this.$store.state.teacherData.teacherVideoData,
      courseId: this.$store.state.teacherData.courseId,
      chapterId: this.$store.state.teacherData.chapterId,
    }
  },
  methods: {
    async deleteVideo(course, chapter) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('courseId', course);
      a.append('chapterId', chapter);
      await axios.post("http://" + that.Api + "/api/Course/deleteCourseChapter", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除课程", response);

        that.newVideo();

      }, function (err) {
        console.log(err);
      });
    },  //删除视频

    async newVideo() {
      let that = this;
      await axios.post("http://" + that.Api + "/api/Course/getCourseChapterViedo?chapterId=" + that.chapterId + "&courseId=" + that.courseId, {
        headers: {
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        that.$store.commit("saveTeacherVideoData", res.data.data);
        that.videoData = that.$store.state.teacherData.teacherVideoData;
        console.log("更新视频", res);
      })
    }, //刷新视频列表

    async sendVideo() {
      let that = this;
      let JWT = that.$store.state.JWT;
      let videoId;
      if (that.videoData.length === 0) {
        videoId = 1;
      } else {
        videoId = that.videoData[that.videoData.length - 1].courseChapterVideoPK.videoId + 1;
      }
      console.log(that.fileListVideo);
      let params = {
        videoId: videoId,
        videoName: that.videoName,
        videoUrl: that.fileListVideo[0].url,
      }
      await axios.post("http://" + that.Api + "/api/Course/addCourseChapterViedo?courseId=" + that.courseId + "&videoId=" + videoId + "&chapterId=" + that.chapterId, params, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("上传视频成功", response);
        that.$alert('任务视频成功', '提示', {
          confirmButtonText: '确定',
        });
        that.progressView = false;
        that.p = 0;                          //初始化进度条
        that.videoName = '';
        that.fileListVideo = [];
        that.newVideo();
      }, function (err) {
        console.log(err);
      });
    },  //创建视频

    uploadHttpVideo({file}) {
      // const file=this.imgFile;
      console.log(file);
      let that = this;
      that.loading = true;
      let f = file;
      console.log(f);
      let fileName = `${that.courseId}_courseId/${that.chapterId}_chapterId/${file.name}`;  //定义唯一的文件名
      fileName = `video/Course/` + fileName;
      if (f.size < that.partSize) {         //文件较小则直接上传
        ossClient(this.uploadConf).put(fileName, file).then(({res, url, name}) => {
          if (res && res.status === 200) {
            console.log(url);
            that.fileListVideo.push({
              name: f.name,
              url: url,
            });
            console.log(`阿里云OSS上传成功回调`, res, url, name);
            that.loading = false;
          }
        }).catch((err) => {
          console.log(`阿里云OSS上传失败回调`, err);
        });
      } else {    //较大分片上传
        that.multipartUpload(file, fileName);
      }
    },  //上传至阿里云
    async multipartUpload(file, fileName) {
      let that = this;
      that.progressView = true;
      return ossClient(that.uploadConf).multipartUpload(fileName, file, {
        parallel: that.parallel,
        partSize: that.partSize,
        progress: that.onMultipartUploadProgress
      }).then(result => {
        // 生成文件下载地址
        const url = `http://${that.uploadConf.bucket}.${that.uploadConf.region}.aliyuncs.com/${fileName}`;
        console.log(`Multipart upload ${file.name} succeeded, url === `, url);
        that.loading = false;
        that.fileListVideo.push({
          name: file.name,
          url: url,
        });
      }).catch(err => {
        console.log(`Multipart upload ${file.name} failed === `, err);
      });
    },    //分片上传
    onMultipartUploadProgress(p, _checkpoint) {
      console.log("上传进度", p);
      this.p = p * 100;
      console.log("断点信息", _checkpoint);
    },
    handleExceed() {
      this.$message.warning(`每次只能上传一个视频`);
    },

    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('未保存，确定要退出吗？')
          .then(_ => {
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 400);
          })
          .catch(_ => {
          });
    },
    drawerClose(data) {
      this.dialog2 = data;
      this.newVideo();
    },
  },
  mounted() {
    let breadcrumb = [
      {
        link: '/Classmanagement/blank',
        title: '课程管理'
      },
      {
        link: '/Classmanagement/classList',
        title: '列表管理'
      },
      {
        link: '/Classmanagement/chapterList',
        title: '章节管理'
      },
      {
        link: '/Classmanagement/videoList',
        title: '视频管理'
      },
    ]
    this.$store.commit("savebreadcrumb", breadcrumb);
  }
}
</script>

<style scoped>
button:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.subtitle {
  background-color: #6fadff;
}

.card-wrapper{
  background-color: #ffffff;
  box-shadow: 0 0 10px #4d555d;
  border-radius: 5px;
  margin: 0 0 20px 0;
}
</style>
