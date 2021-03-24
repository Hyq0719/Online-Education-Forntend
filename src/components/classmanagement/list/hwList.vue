<template>
  <div>
    <el-main style="min-height: 480px;background-color: #ffffff;box-shadow: 0 0 10px #4d555d;border-radius: 5px;">

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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "hwList",
  components:{
    correctHw: () => import('@/components/classmanagement/tools/correctHw')
  },
  data(){
    return{
      hwInfo: {},
      dialogHw: false,
      radio:1,
      homeworkData: this.$store.state.teacherData.homeworkData,
      courseId: this.$store.state.teacherData.courseId,
      chapterId: this.$store.state.teacherData.chapterId,
      taskId: this.$store.state.teacherData.taskId,
    }
  },
  methods:{
    closeDialogHw() {
      this.dialogHw = false;
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
            }
          }, function (err) {
            console.log(err);
          }
      );
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
        link: '/Classmanagement/taskList',
        title: '任务管理'
      },
      {
        link: '/Classmanagement/hwList',
        title: '作业管理'
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
