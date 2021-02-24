<template>
  <div class="task">
    <div class="task-title">
      <h2>{{ this.$store.state.TaskInfo.taskName }}</h2>
      <div>
        <el-button icon="el-icon-download" type="text" @click="dialogVisibleTask = true">点击查看任务文件</el-button>
        <el-button icon="el-icon-caret-left" type="text" @click="backToTaskMenu">返回</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="task-details">
      <p>开始时间：{{ this.$store.state.TaskInfo.startTime }} | 截止时间：{{ this.$store.state.TaskInfo.endTime }}</p>
    </div>
    <div class="task-homework">
      <div class="task-homework-content">
        <p>{{ this.$store.state.TaskInfo.content }}</p>
      </div>
    </div>
    <div class="task-answer">
      <div class="task-answer-title">
        <div class="task-answer-title-left">
          <h4 v-if="this.$store.state.HomeworkInfo.status==3">查看你的答案</h4>
          <h4 v-if="this.$store.state.HomeworkInfo.status!=3">请填写答案</h4>
        </div>
        <div class="task-answer-title-right">
          <el-button icon="el-icon-download" type="text" @click="dialogVisibleHomework = true">点击查看已上传的作业文件</el-button>
        </div>
      </div>
      <div class="task-answer-content">
        <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 12}"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        <el-upload
            class="upload-demo"
            drag
            action=""
            :on-success="onsuccess"
            :before-remove="beforeRemove"
            :http-request="uploadHttp"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </div>
    <div class="submit">
      <el-button v-if="this.$store.state.HomeworkInfo.status!=3" @click="submit($store.state.HomeworkInfo.status)">
        暂时保存
      </el-button>
      <el-button v-if="this.$store.state.HomeworkInfo.status==0" type="primary" @click="submit(2)">提交作业</el-button>
      <el-button v-if="this.$store.state.HomeworkInfo.status==1||this.$store.state.HomeworkInfo.status==2"
                 type="primary" @click="submit(2)">修改作业
      </el-button>
    </div>

    <el-dialog
        title="任务文件"
        :visible.sync="dialogVisibleTask"
        width="40%"
        center>
      <div class="taskFile" v-for="(item,index) in this.$store.state.TaskFile" v-bind:key="index">
        <el-link type="primary" @click="downFile(item.fileUrl)">{{ item.fileName }}</el-link>
      </div>
      <span slot="footer" class="dialog-footer"><el-button type="primary"
                                                           @click="dialogVisibleTask = false">关 闭</el-button></span>
    </el-dialog>
    <el-dialog
        title="已上传的作业文件"
        :visible.sync="dialogVisibleHomework"
        width="40%"
        center>
      <div class="taskFile" v-for="(item,index) in this.$store.state.HomeworkFile" v-bind:key="index">
        <el-link type="primary" @click="downFile(item.fileUrl)">{{ item.fileName }}</el-link>
        <el-button icon="el-icon-delete" type="text" @click="deleteHomeworkFile(item.homeworkFileId,item.homeworkId)">
          删除
        </el-button>
      </div>
      <span slot="footer" class="dialog-footer"><el-button type="primary"
                                                           @click="dialogVisibleHomework = false">关 闭</el-button></span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import ossClient from "@/aliyun.oss.client";

export default {
  name: "Task",
  data() {
    return {
      dialogVisibleTask: false,
      dialogVisibleHomework: false,
      textarea: this.$store.state.HomeworkInfo.content,
      uploadConf: {
        // endpoint: "https://oss-accelerate.aliyuncs.com",
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAI4GGsTQ35tQcWWDVNKwqG',
        accessKeySecret: 'reWjqrK73PE0ZvJQH0Hwjr9eyuWbuc',
        bucket: 'shu-online-edu',
      },
      homeworkFileDtos: [],
    }
  },
  watch: {
    '$store.state.HomeworkInfo.content'() {
      this.textarea = this.$store.state.HomeworkInfo.content;
    }
  },
  created() {
    this.taskInfo();
    this.homeworkInfo();
  },
  methods: {
    deleteHomeworkFile(homeworkFileId, homeworkId) {
      let that = this;
      let a = new URLSearchParams;
      a.append("homeworkFileId", homeworkFileId);
      axios.post("http://" + this.Api + "/api/Homework/deleteHomeworkFile?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("删除作业文件", response);
        let b = new URLSearchParams;
        b.append("homeworkId", homeworkId);
        axios.post("http://" + that.Api + "/api/Homework/getFilesByHomework?" + b, null, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': that.$store.state.JWT,
          }
        }).then(function (response) {
          console.log("获取学生作业文件信息", response);
          that.$store.commit('saveHomeworkFile', response.data.data);
        }, function (err) {
          console.log(err);
        });
      }, function (err) {
        console.log(err);
      });
    },
    onsuccess(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadHttp({file}) {
      let that = this;
      console.log(file);
      let homeworkId = this.$store.state.HomeworkInfo.homeworkId;
      let homeworkFileName = file.name;
      let fileName = `file/Homework/${this.$store.state.userData.userId}/${Date.parse(new Date())}.docx`;  //定义唯一的文件名
      ossClient(this.uploadConf).put(fileName, file).then(({res, url, name}) => {
        if (res && res.status == 200) {
          console.log(`阿里云OSS上传文件成功回调`, res, url, name);
          let homeworkFileUrl = url;
          that.homeworkFileDtos.push({
            homeworkId: homeworkId,
            homeworkFileName: homeworkFileName,
            homeworkFileUrl: homeworkFileUrl
          });
        }
      }).catch((err) => {
        console.log(`阿里云OSS上传文件失败回调`, err);
      });
    },
    submit(status) {
      let params = {
        content: this.textarea,
        status: status,
        studentId: this.$store.state.userData.userId,
        taskId: this.$route.query.taskId,
      };
      axios.post("http://" + this.Api + "/api/Homework/studentHomework", params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("提交作业", response);
      }, function (err) {
        console.log(err);
      });
      axios.post("http://" + this.Api + "/api/Homework/addHomeworkFiles", this.homeworkFileDtos, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("提交作业文件", response);
      }, function (err) {
        console.log(err);
      });
    },
    downFile(fileUrl) {
      let a = document.createElement('a')
      a.href = `${fileUrl}`
      a.click()
    },
    homeworkInfo() {
      let that = this;
      let a = new URLSearchParams;
      a.append("studentId", this.$store.state.userData.userId);
      a.append("taskId", this.$route.query.taskId);
      axios.post("http://" + this.Api + "/api/Homework/getByTaskAndStudent?" + a, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("获取学生作业信息", response);
        that.$store.commit('saveHomeworkInfo', response.data.data);
        let b = new URLSearchParams;
        b.append("homeworkId", response.data.data.homeworkId);
        axios.post("http://" + that.Api + "/api/Homework/getFilesByHomework?" + b, null, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': that.$store.state.JWT,
          }
        }).then(function (response) {
          console.log("获取学生作业文件信息", response);
          that.$store.commit('saveHomeworkFile', response.data.data);
        }, function (err) {
          console.log(err);
        });
      }, function (err) {
        console.log(err);
      });
    },
    taskInfo() {
      let that = this;
      let a = new URLSearchParams;
      a.append("taskId", this.$route.query.taskId);
      axios.post("http://" + this.Api + "/api/Task/getTaskById?" + a, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log("获取任务信息", response);
        that.$store.commit('saveTaskInfo', response.data.data);
      }, function (err) {
        console.log(err);
      });
      axios.post("http://" + this.Api + "/api/Task/getTaskFileByTask?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function (response) {
        console.log("获取任务文件", response.data.data);
        that.$store.commit('saveTaskFile', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    backToTaskMenu() {
      this.$router.push({
        path: '/taskMenu',
        query: {courseId: this.$route.query.courseId, chapterId: this.$route.query.chapterId}
      });
    }
  },
};
</script>

<style scoped>
.task {
  width: 1000px;
  margin: 20px auto;
}

.task-title {
  display: flex;
  justify-content: space-between;
}

.task-details {
  display: flex;
  text-align: left;
  font-size: 12px;
}

.task-homework {
  margin: 30px auto;
}

.task-homework-content {
  display: flex;
  text-align: left;
}

.task-answer {
  text-align: left;
}

.task-answer-title {
  display: flex;
  justify-content: space-between;
}

.task-answer-title-right {
  display: flex;
  flex-direction: column-reverse;
}

.task-answer-content {
  display: flex;
}

.el-textarea {
  width: 64%;
}

.upload-demo {
  width: 24%;
}

.submit {
  margin: 30px auto;
}

.taskFile {
  justify-content: space-between;
  display: flex;
  margin: 20px;
}
</style>
