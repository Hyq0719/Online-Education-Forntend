<template>
  <div style="min-height: 480px;">

    <el-main class="card-wrapper" style="padding: 0">
      <el-row  style="height: auto">
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
    </el-main>



    <el-main class="card-wrapper" >
      <el-table :data="chapterData">
        <el-table-column label="章节号" width="150px">
          <template slot-scope="scope">
            {{ scope.row.courseChapterPK.chapterId }}
          </template>
        </el-table-column>
        <el-table-column prop="chapterIntro" label="章节名称" width="300px">
        </el-table-column>
        <el-table-column label="操作" min-width="532px">
          <template slot-scope="scope">

              <el-button type="primary" icon="el-icon-edit"
                         @click="openVideo(scope.row.courseChapterPK.courseId,scope.row.courseChapterPK.chapterId)">
                管理视频
              </el-button>
              <el-button type="success" icon="el-icon-edit"
                         @click="openTask(scope.row.courseChapterPK.courseId,scope.row.courseChapterPK.chapterId)">
                管理任务
              </el-button>
              <el-button type="warning"
                         @click="dialog1 = true;courseId = scope.row.courseChapterPK.courseId;chapterId=scope.row.courseChapterPK.chapterId ">
                修改章节
              </el-button>
              <el-button type="danger" icon="el-icon-delete"
                         @click.native.prevent="deleteChapter(scope.row.courseChapterPK.courseId,scope.row.courseChapterPK.chapterId)">
                删除章节
              </el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-main>

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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "chapterList",
  data(){
    return{
      chapterIntro: "",
      chapterData: this.$store.state.teacherData.teacherChapterData,
      courseId: this.$store.state.teacherData.courseId,
      dialog1: false,
    }
  },
  components:{
    editChapter: () => import('@/components/classmanagement/tools/editchapter'),
  },
  methods: {
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

    async openVideo(course, chapter) {
      let that = this;
      that.$store.commit("saveChapterId", chapter);
      that.chapterId = that.$store.state.teacherData.chapterId;
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

      that.$router.push('/Classmanagement/videoList');
    },   //打开视频时调用

    async openTask(course, chapter) {
      let that = this;
      that.$store.commit("saveChapterId", chapter);
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
              that.$router.push('/Classmanagement/taskList');
            }
          }, function (err) {
            console.log(err);
          }
      );
    },  //打开任务，可用来刷新

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

    async drawerClose(data) {
      let that=this;
      this.dialog1 = data;
      await axios.get("http://" + that.Api + "/api/Course/getCourseChapter/" + that.courseId, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
         console.log("刷新",res);
        that.$store.commit("saveTeacherChapterData", res.data.data);
        that.chapterData = that.$store.state.teacherData.teacherChapterData;
      })

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
