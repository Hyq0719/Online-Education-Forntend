<template>
  <div>
    <el-main>
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
              <el-button type="primary" @click="deleteTask(scope.row.taskId);" icon="el-icon-delete">删除任务</el-button>
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
  </div>
</template>

<script>
import axios from "axios";
import ossClient from "@/aliyun.oss.client";

export default {
  name: "taskList",
  components:{
    buildTaskPage: () => import('@/components/classmanagement/tools/buildTaskPage'),
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
      fileListTask: [],
      dialogTaskAdd: false,
      loading: false,
      dialogTaskBuild: false,
      dialogTaskEdit: false,
      taskData: this.$store.state.teacherData.taskData,
      courseId: this.$store.state.teacherData.courseId,
      chapterId: this.$store.state.teacherData.chapterId,
    }
  },
  methods: {
    closeDialogTask() {
      let that = this;
      this.dialogTaskBuild = false;
      this.dialogTaskEdit = false;
      this.openTask(that.courseId, that.chapterId);
    },  //关掉弹窗

    async deleteTask(task) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('taskId', task);
      await axios.post("http://" + that.Api + "/api/Task/deleteTaskById", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除任务", response);
        this.openTask(that.courseId, that.chapterId);
      }, function (err) {
        console.log(err);
      });
    },//删除任务

    async openHomework(task) {
      let that = this;
      that.$store.commit("saveTaskId", task);
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
              that.$router.push('/Classmanagement/hwList');
            }
          }, function (err) {
            console.log(err);
          }
      );
    }, //打开作业

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
    },   //发送任务文件

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

    async openTask(course, chapter) {
      let that = this;
      that.$store.commit("saveChapterId", chapter);
      that.chapterId = chapter;
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
            }
          }, function (err) {
            console.log(err);
          }
      );
    },  //打开任务，刷新任务列表
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
        link: '/Classmanagement/taskList',
        title: '任务管理'
      },
    ]
    this.$store.commit("savebreadcrumb", breadcrumb)
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

</style>
