<template>
  <div>

    <el-main v-show="classview" style="overflow:hidden;position: relative;min-height: 780px">
      <el-table :data="classData.list" :row-class-name="tableRowClassName">
        <el-table-column prop="name" label="课程名称">
        </el-table-column>
        <el-table-column label="是否为vip课程">
          <template slot-scope="props">
            {{ props.row.needVip ? "需要" : "不需要" }}
          </template>
        </el-table-column>
        <el-table-column prop="uploadTime" label="更新时间">
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="props">
            {{ props.row.prefer.major.majorContent }}-{{ props.row.prefer.preferContent }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">

            <el-button type="primary" icon="el-icon-edit" @click="openChapter(scope.row.courseId)">管理章节</el-button>
            <el-button type="warning"
                       @click="courseId=scope.row.courseId;dialogClassEdit = true">修改课程
            </el-button>
            <el-button type="danger" icon="el-icon-delete"
                       @click.native.prevent="deleteClass(scope.row.courseId)">删除课程
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <div>
        <el-button circle @click="dialogClassBuild = true" style="position: fixed;bottom: 180px;left: 240px">
          <i class="el-icon-circle-plus-outline"></i>
        </el-button>
        <el-pagination style="position: absolute;bottom: 0;left: 300px"
                       background
                       layout="prev, pager, next"
                       @current-change="handleCurrentChange"
                       :total="this.$store.state.teacherData.teacherClassData.total_element">
        </el-pagination>
      </div>
    </el-main>

    <el-dialog title="创建课程" v-if="dialogClassBuild" :visible.sync="dialogClassBuild">
      <build-class-page @close="closeDialog"></build-class-page>
    </el-dialog>

    <el-dialog title="修改课程" v-if="dialogClassEdit" :visible.sync="dialogClassEdit">
      <build-class-page @close="closeDialog" :isEdit="true" :courseId="courseId"></build-class-page>

    </el-dialog>

    <el-main v-show="chapterview">
      <el-row class="box-wrapper" style="height: auto">
        <el-row class="subtitle">
          <h5 style="margin: 10px 24px;float: left">创建章节</h5>
        </el-row>
        <el-form :inline="true" label-width="80px" style="margin: 20px 0 10px 0">
          <el-form-item label="章节名称" style="width: 300px;margin-bottom: 0">
            <el-input v-model="chapterIntro"
                      placeholder="请输入内容"
                      maxlength="10"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item style="width: 300px;margin-bottom: 0">
            <el-button type="primary" @click="sendChapter()" style="float: right">创建<i
                class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-form>
        <el-row>

        </el-row>
      </el-row>
      <el-table :data="chapterData">
        <el-table-column label="章节号">
          <template slot-scope="scope">
            {{ scope.row.courseChapterPK.chapterId }}
          </template>
        </el-table-column>
        <el-table-column prop="chapterIntro" label="章节名称">
        </el-table-column>
        <el-table-column label="操作" width="500px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit"
                         @click="openVideo(scope.row.courseChapterPK.courseId,scope.row.courseChapterPK.chapterId)">
                管理视频
              </el-button>
              <el-button type="primary" icon="el-icon-edit"
                         @click="openTask(scope.row.courseChapterPK.courseId,scope.row.courseChapterPK.chapterId)">
                管理任务
              </el-button>
              <el-button type="primary"
                         @click="dialog1 = true;courseId = scope.row.courseChapterPK.courseId;chapterId=scope.row.courseChapterPK.chapterId ">
                修改章节
              </el-button>
              <el-button type="primary" icon="el-icon-delete"
                         @click.native.prevent="deleteChapter(scope.row.courseChapterPK.courseId,scope.row.courseChapterPK.chapterId)">
                删除章节
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-main v-show="videoview">
      <el-row class="box-wrapper" style="height: auto">
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

      <el-table :data="videoData">
        <el-table-column prop="videoName" label="视频名称">
        </el-table-column>
        <el-table-column label="操作" width="500px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit" @click="videoInfo=scope.row;dialog2 = true">修改视频</el-button>
              <el-button type="primary" icon="el-icon-delete"
                         @click.native.prevent="deleteVideo(scope.row.courseChapterVideoPK.courseId,scope.row.courseChapterVideoPK.chapterId)">
                删除视频
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-main v-show="taskView">
      <el-table :data="taskData">
        <el-table-column prop="taskName" label="任务名称">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
        </el-table-column>
        <el-table-column label="操作" width="500px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" @click="taskId=scope.row.taskId;dialogTaskEdit = true" icon="el-icon-edit">
                修改任务
              </el-button>
              <el-button type="primary" @click="taskId=scope.row.taskId;dialogTaskAdd = true">上传任务文件</el-button>
              <el-button type="primary" @click="openHomework(scope.row.taskId);">查看作业</el-button>
              <el-button type="primary" icon="el-icon-delete">删除任务</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <el-button circle @click="dialogTaskBuild = true" style="position: fixed;bottom: 180px;left: 240px">
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
    </el-main>

    <el-dialog title="上传任务文件" v-if="dialogTaskAdd" :visible.sync="dialogTaskAdd">
      <el-upload
          style="margin: 20px 0"
          class="upload-demo"
          action=""
          multiple
          :http-request="uploadHttpTask"
          :file-list="fileListTask">
        <el-button size="small" type="primary" v-loading="loading">点击上传</el-button>
      </el-upload>
      <el-button @click="sendTaskFile" v-loading="loading">确认上传</el-button>
    </el-dialog>

    <el-dialog title="创建任务" v-if="dialogTaskBuild" :visible.sync="dialogTaskBuild">
      <build-task-page @close="closeDialogTask" :courseId="courseId" :chapterId="chapterId"></build-task-page>
    </el-dialog>

    <el-dialog title="修改任务" v-if="dialogTaskEdit" :visible.sync="dialogTaskEdit">
      <build-task-page @close="closeDialogTask" :isEdit="true" :taskId="taskId"></build-task-page>
    </el-dialog>

    <el-main v-show="homeworkView" style="min-height: 480px">

      <template>
        <el-radio-group v-model="radio" style="float: left;margin: 5px 20px">
          <el-radio :label="1" @change="openHomework(taskId)">全部作业</el-radio>
          <el-radio :label="2" @change="displayHomeworkData(taskId,0)">未上传</el-radio>
          <el-radio :label="3" @change="displayHomeworkData(taskId,1)">已驳回</el-radio>
          <el-radio :label="4" @change="displayHomeworkData(taskId,2)">已上传</el-radio>
          <el-radio :label="5" @change="displayHomeworkData(taskId,3)">已批改</el-radio>
        </el-radio-group>
      </template>

      <el-table :data="homeworkData.list">
        <el-table-column prop="studentId" label="学生学号">
        </el-table-column>
        <el-table-column prop="commitTime" label="提交时间">
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" @click="dialogHw=true;hwInfo=scope.row" icon="el-icon-edit">批改作业</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-dialog title="批改作业" v-if="dialogHw" :visible.sync="dialogHw">
      <correct-hw @close="closeDialogHw" :info="hwInfo"></correct-hw>
    </el-dialog>

    <el-drawer
        title="修改章节"
        :with-header="false"
        :before-close="handleClose"
        v-if="dialog1"
        :visible.sync="dialog1"
        direction="rtl"
        ref="drawer"
        size="600px"

    >
      <editChapter @close="drawerClose" :courseId="courseId" :chapterId="chapterId"></editChapter>
    </el-drawer>

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
  name: "Classmanagement_class",
  props: ['id'],
  data() {
    return {
      uploadConf: {
        endpoint: "https://oss-accelerate.aliyuncs.com",
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAI4GGsTQ35tQcWWDVNKwqG',
        accessKeySecret: 'reWjqrK73PE0ZvJQH0Hwjr9eyuWbuc',
        bucket: 'shu-online-edu',
      },
      videoName: '',
      fileListTask: [],
      fileListVideo: [],
      loading: false,
      hwInfo: {},   //Info都是用来向子组件传数据的
      videoInfo:{},
      dialogTaskAdd: false,
      dialogHw: false,
      dialogTaskBuild: false,
      dialogTaskEdit: false,
      radio: 1,
      homeworkView: false,
      taskView: false,
      dialogClassEdit: false,
      dialog1: false,
      dialog2: false,
      classview: true,
      chapterview: false,
      videoview: false,
      dialogClassBuild: false,
      classData: this.$store.state.teacherData.teacherClassData,
      chapterData: this.$store.state.teacherData.teacherChapterData,
      videoData: this.$store.state.teacherData.teacherVideoData,
      taskData: this.$store.state.teacherData.taskData,
      homeworkData: this.$store.state.teacherData.homeworkData,
      chapterIntro: "",
      courseId: this.$store.state.teacherData.courseId,  //临时传参用
      chapterId: this.$store.state.teacherData.chapterId,
      taskId: this.$store.state.teacherData.taskId,
      currentPage: null,
      partSize: 1024 * 1024, // 每个分片大小(byte)
      parallel: 3, // 同时上传的分片数
      checkpoints: {}, // 所有分片上传文件的检查点
      p:0,
      progressView: false,
    }
  },
  components: {
    editChapter: () => import('@/components/classmanagement/tools/editchapter'),
    editVideo: () => import('@/components/classmanagement/tools/editVideo'),
    buildClassPage: () => import('@/components/classmanagement/tools/buildClassPage'),
    buildTaskPage: () => import('@/components/classmanagement/tools/buildTaskPage'),
    correctHw: () => import('@/components/classmanagement/tools/correctHw')
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getCourse(val);
      this.currentPage = val;
    },
    tableRowClassName({row}) {
      if (row.status === 1) {
        return 'success-row';
      } else if (row.status === 0) {
        return 'warning-row';
      }
      return '';
    },
    closeDialog() {
      let that = this;
      this.dialogClassBuild = false;
      this.dialogClassEdit = false;
      this.getCourse(that.currentPage);
    },
    closeDialogTask() {
      let that = this;
      this.dialogTaskBuild = false;
      this.dialogTaskEdit = false;
      this.openTask(that.courseId, that.chapterId);
    },
    closeDialogHw() {
      this.dialogHw = false;
    },

    uploadHttpTask({file}) {
      // const file=this.imgFile;
      console.log(file);
      let that = this;
      let f = file;
      that.loading = true;
      console.log(f);
      let fileName = `${that.courseId}_courseId/${that.chapterId}_chapterId/${file.name}`;  //定义唯一的文件名
      fileName = `pic/Course/` + fileName;
      ossClient(this.uploadConf).put(fileName, file).then(({res, url, name}) => {
        if (res && res.status === 200) {
          console.log(url);
          that.fileListTask.push({
            name: f.name,
            url: url,
          });
          console.log(`阿里云OSS上传成功回调`, res, url, name);
          that.loading = false;
        }
      }).catch((err) => {
        console.log(`阿里云OSS上传失败回调`, err);
      });
    },  //上传至阿里云

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
        that.multipartUpload(file,fileName);
      }
    },  //上传至阿里云

    // stop() {
    //   if (ossClient) ossClient.cancel();
    // },
    //
    //  // 续传
    // resume() {
    //   console.log(ossClient);
    //   if (ossClient) this.resumeMultipartUpload();
    // },

    onMultipartUploadProgress(p, _checkpoint) {
      console.log("上传进度", p);
      this.p=p*100;
      console.log("断点信息", _checkpoint);
    },

    handleExceed() {
      this.$message.warning(`每次只能上传一个视频`);
    },

    async multipartUpload(file,fileName) {
      let that = this;
      that.progressView=true;
      return ossClient(that.uploadConf).multipartUpload(fileName, file, {
        parallel: that.parallel,
        partSize: that.partSize,
        progress: that.onMultipartUploadProgress
      }).then(result => {
        // 生成文件下载地址
        const url = `http://${that.uploadConf.bucket}.${that.uploadConf.region}.aliyuncs.com/${fileName}`;
        console.log(`Multipart upload ${file.name} succeeded, url === `, url);
        that.loading=false;
        that.fileListVideo.push({
          name: file.name,
          url: url,
        });
      }).catch(err => {
        console.log(`Multipart upload ${file.name} failed === `, err);
      });
    },    //分片上传

    // async resumeMultipartUpload() {          //断点续传
    //   let that = this;
    //   Object.values(that.checkpoints).forEach((checkpoint) => {
    //     const {uploadId, file, name} = checkpoint;
    //     ossClient.multipartUpload(uploadId, file, {
    //       parallel: that.parallel,
    //       partSize: that.partSize,
    //       progress: that.onMultipartUploadProgress,
    //       checkpoint
    //     }).then(result => {
    //       console.log('before delete checkpoints === ', that.checkpoints);
    //       delete that.checkpoints[checkpoint.uploadId];
    //       console.log('after delete checkpoints === ', that.checkpoints);
    //       const url = `http://${that.uploadConf.bucket}.${that.uploadConf.region}.aliyuncs.com/${name}`;
    //       console.log(`Resume multipart upload ${file.name} succeeded, url === `, url)
    //     }).catch(err => {
    //       console.log('Resume multipart upload failed === ', err);
    //     });
    //   });
    // },

    async sendTaskFile() {
      let that = this;
      let JWT = that.$store.state.JWT;
      console.log(that.fileListTask);
      let c = that.fileListTask.map(item => ({taskFileName: item.name, taskFileUrl: item.url, taskId: that.taskId}));
      await axios.post("http://" + that.Api + "/api/Task/addTaskFileByTasks", c, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("上传任务文件成功", response);
        that.$alert('任务文件上传成功', '提示', {
          confirmButtonText: '确定',
        });
        that.dialogTaskAdd = false;
        that.fileListTask = [];
      }, function (err) {
        console.log(err);
      });
    },
    async deleteClass(a) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let b = new URLSearchParams();
      b.append('courseId', a);

      await axios.post("http://" + that.Api + "/api/Course/deleteCourseChapter?chapterId=14&courseId=1", {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除课程", response);
      }, function (err) {
        console.log(err);
      });
    },  //删除课程
    async deleteChapter(course, chapter) {
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
        console.log("删除章节", response);
      }, function (err) {
        console.log(err);
      });

      await axios.get("http://" + that.Api + "/api/Course/getCourseChapter/" + course, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        // console.log(res);
        that.$store.commit("saveTeacherChapterData", res.data.data)
      })
      that.chapterData = that.$store.state.teacherData.teacherChapterData;
    },  //删除章节
    async deleteVideo(course,chapter) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('courseId', course);
      a.append('chapterId', chapter);
      await axios.post("http://" + that.Api + "/api/Course/deleteCourseChapter" ,a, {
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
    //删除任务
    //删除作业
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

    async openChapter(id) {
      let that = this;
      that.$store.commit("saveCourseId",id);
      that.courseId = id;
      await axios.get("http://" + that.Api + "/api/Course/getCourseChapter/" + id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        console.log("章节信息", res);
        that.$store.commit("saveTeacherChapterData", res.data.data);
      })
      that.chapterData = that.$store.state.teacherData.teacherChapterData;

      that.$router.push({name: 'classManagementClass', params: {id: 2}});
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '课程列表'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        }
      ]
      this.$store.commit("savebreadcrumb", breadcrumb)
    },   //打开章节时调用

    async openVideo(course, chapter) {
      let that = this;
      that.$store.commit("saveChapterId",chapter);
      that.chapterId=that.$store.state.teacherData.chapterId;
      await axios.post("http://" + that.Api + "/api/Course/getCourseChapterViedo?chapterId=" + chapter + "&courseId=" + course, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        that.$store.commit("saveTeacherVideoData", res.data.data);
        console.log(res)
      })
      that.videoData = that.$store.state.teacherData.teacherVideoData;

      that.$router.push({name: 'classManagementClass', params: {id: 3}});
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '列表管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 3}},
          title: '视频管理'
        },
      ]
      this.$store.commit("savebreadcrumb", breadcrumb)
    },   //打开视频时调用

    async openTask(course, chapter) {
      let that = this;
      that.$store.commit("saveChapterId",chapter);
      that.chapterId=chapter;
      let b = new URLSearchParams();

      b.append("courseId", course);
      b.append("chapterId", chapter);

      await axios.post('http://' + that.Api + "/api/Task/getTaskByCourseChapter", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
            console.log("课程的任务信息", res);
            if (res.data.code === 1000) {
              that.$store.commit('saveTaskData', res.data.data);
              that.taskData = that.$store.state.teacherData.taskData;

              that.$router.push({name: 'classManagementClass', params: {id: 4}});
              let breadcrumb = [
                {
                  link: '/Classmanagement/blank',
                  title: '课程管理'
                },
                {
                  link: {name: 'classManagementClass', params: {id: 1}},
                  title: '列表管理'
                },
                {
                  link: {name: 'classManagementClass', params: {id: 2}},
                  title: '章节管理'
                },
                {
                  link: {name: 'classManagementClass', params: {id: 4}},
                  title: '任务管理'
                },
              ]
              that.$store.commit("savebreadcrumb", breadcrumb)
            }
          }, function (err) {
            console.log(err);
          }
      );
    },

    drawerClose(data) {
      this.dialog1 = data;
      this.dialog2 = data;
      this.newVideo();
    },

    async newVideo(){
      let that=this;
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
        that.progressView=false;
        that.p=0;                          //初始化进度条
        that.videoName='';
        that.fileListVideo = [];
        that.newVideo();
      }, function (err) {
        console.log(err);
      });
    },  //创建视频

    async sendChapter() {
      let that = this;
      let a = new URLSearchParams();
      let course;
      let chapter;
      let intro;
      console.log(that.chapterData);
      if (that.chapterData.length === 0) {
        course = that.courseId;
        chapter = 1;
        intro = that.chapterIntro;
      } else {
        course = that.chapterData[0].courseChapterPK.courseId;
        chapter = that.chapterData[that.chapterData.length - 1].courseChapterPK.chapterId + 1;
        intro = that.chapterIntro;
      }
      a.append('courseId', course);
      a.append('chapterId', chapter);
      a.append('intro', intro);
      await axios.post("http://" + that.Api + "/api/Course/addCourseChapter", a, {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        console.log(res);
      })
      await axios.get("http://" + that.Api + "/api/Course/getCourseChapter/" + course, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        // console.log(res);
        that.$store.commit("saveTeacherChapterData", res.data.data)
      })
      that.chapterData = that.$store.state.teacherData.teacherChapterData;
    },  //创建章节

    async getCourse(val) {
      let that = this;
      let b = new URLSearchParams();
      let c = that.$store.state.userData.userId;
      b.append("teacherId", c);
      b.append("sort", 1);
      b.append("page", val);
      await axios.post('http://' + that.Api + "/api/Course/getCourseByTeacherId", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
            console.log("老师的课程信息", res);
            if (res.data.code === 1000) {
              that.$store.commit('saveTeacherClassData', res.data.data);
              that.classData = that.$store.state.teacherData.teacherClassData;
            }
          }, function (err) {
            console.log(err);
          }
      );
    },

    async openHomework(task) {
      let that = this;
      that.$store.commit("saveTaskId",task);
      that.taskrId=task;
      let b = new URLSearchParams();

      b.append("taskId", task);
      b.append("page", 1);

      await axios.post('http://' + that.Api + "/api/Homework/getByTask", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
            console.log("任务的作业信息", res);
            if (res.data.code === 1000) {
              that.$store.commit('saveHomeworkData', res.data.data);
              that.homeworkData = that.$store.state.teacherData.homeworkData;
              console.log(that.$store.state.teacherData.homeworkData);
              that.$router.push({name: 'classManagementClass', params: {id: 5}});

            }
          }, function (err) {
            console.log(err);
          }
      );
    },

    async displayHomeworkData(task, status) {
      let that = this;
      console.log("任务号 状态", task, status);
      let b = new URLSearchParams();
      b.append("taskId", task);
      b.append("page", 1);
      b.append("status", status);
      await axios.post('http://' + that.Api + "/api/Homework/getByTaskAndStatus", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
            console.log("各种状态的作业信息", res);
            if (res.data.code === 1000) {
              that.$store.commit('saveHomeworkData', res.data.data);
              that.homeworkData = that.$store.state.teacherData.homeworkData;
              console.log(that.$store.state.teacherData.homeworkData);

            }
          }, function (err) {
            console.log(err);
          }
      );
    },
  },
  mounted: function () {
    this.getCourse(1);
    // console.log(this.classData);
    let that = this;
    let a = that.$route.params.id;
    if (a == 1) {
      that.classview = true;
      that.chapterview = false;
      that.videoview = false;
      that.taskView = false;
      that.homeworkView = false;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '课程列表'
        }
      ]
      this.$store.commit("savebreadcrumb", breadcrumb);
    } else if (a == 2) {
      that.classview = false;
      that.chapterview = true;
      that.videoview = false;
      that.taskView = false;
      that.homeworkView = false;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '课程列表'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        }
      ]
      this.$store.commit("savebreadcrumb", breadcrumb)
    } else if (a == 3) {
      that.classview = false;
      that.chapterview = false;
      that.videoview = true;
      that.taskView = false;
      that.homeworkView = false;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '列表管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 3}},
          title: '视频管理'
        },
      ]
      this.$store.commit("savebreadcrumb", breadcrumb)
    } else if (a == 4) {
      that.classview = false;
      that.chapterview = false;
      that.videoview = false;
      that.taskView = true;
      that.homeworkView = false;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '列表管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 4}},
          title: '任务管理'
        },
      ]
      that.$store.commit("savebreadcrumb", breadcrumb)
    } else if (a == 5) {
      that.classview = false;
      that.chapterview = false;
      that.videoview = false;
      that.taskView = false;
      that.homeworkView = true;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '列表管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 4}},
          title: '任务管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 5}},
          title: '作业管理'
        },
      ]
      that.$store.commit("savebreadcrumb", breadcrumb)
    }

  },
  watch: {
    id(id) {
      let that = this;
      let a = id;
      console.log(a);
      if (a == 1) {
        that.classview = true;
        that.chapterview = false;
        that.videoview = false;
        that.taskView = false;
        that.homeworkView = false;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 1}},
            title: '课程列表'
          }
        ]
        this.$store.commit("savebreadcrumb", breadcrumb);
      } else if (a == 2) {
        that.classview = false;
        that.chapterview = true;
        that.videoview = false;
        that.taskView = false;
        that.homeworkView = false;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 1}},
            title: '课程列表'
          },
          {
            link: {name: 'classManagementClass', params: {id: 2}},
            title: '章节管理'
          }
        ]
        this.$store.commit("savebreadcrumb", breadcrumb)
      } else if (a == 3) {
        that.classview = false;
        that.chapterview = false;
        that.videoview = true;
        that.taskView = false;
        that.homeworkView = false;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 1}},
            title: '列表管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 2}},
            title: '章节管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 3}},
            title: '视频管理'
          },
        ]
        this.$store.commit("savebreadcrumb", breadcrumb)
      } else if (a == 4) {
        that.classview = false;
        that.chapterview = false;
        that.videoview = false;
        that.taskView = true;
        that.homeworkView = false;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 1}},
            title: '列表管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 2}},
            title: '章节管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 4}},
            title: '任务管理'
          },
        ]
        that.$store.commit("savebreadcrumb", breadcrumb)
      } else if (a == 5) {
        that.classview = false;
        that.chapterview = false;
        that.videoview = false;
        that.taskView = false;
        that.homeworkView = true;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 1}},
            title: '列表管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 2}},
            title: '章节管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 4}},
            title: '任务管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 5}},
            title: '作业管理'
          },
        ]
        that.$store.commit("savebreadcrumb", breadcrumb)
      }

    },
  },
}
</script>

<style scoped>

button:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.box-wrapper {
  border: #1c1f21 solid 1px;
  border-radius: 6px;
  margin: 16px 30px;
  width: 1000px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.subtitle {
  background-color: #6fadff;
}

</style>
