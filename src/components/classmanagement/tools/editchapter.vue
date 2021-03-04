<template>
  <div>

    <div class="title" style="overflow: hidden;width: 500px;margin-top: 20px" >
      <h3 style="display: inline">
        修改章节
      </h3>
      <el-button type="primary" class="headerbutton" @click="closed" :loading="loading">
        {{ loading ? '提交中 ...' : '确认修改' }}
      </el-button>
      <el-divider></el-divider>
    </div>

    <el-main>
      <div style="width: 500px">
        <el-form label-width="160px">
          <el-form-item label="章节名称" >
            <el-input
                show-word-limit
                maxlength="20"
                placeholder="请输入内容"
                v-model="intro"
                >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-main>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "editChapter",
  props:{
    courseId:{
      type:Number,
    },
    chapterId:{
      type:Number,
    },
  },
  data() {
    return {
      loading:false,
      intro:'',
      }
  },
  methods: {
    async sendChapter() {
      let that = this;
      let a = new URLSearchParams();
      let course ;
      let chapter ;
      let intro;
        course = that.courseId;
        chapter = that.chapterId;
        intro = that.intro;
      a.append('courseId', course);
      a.append('chapterId', chapter);
      a.append('intro', intro);
      await axios.post("http://" + that.Api + "/api/Course/addCourseChapter", a, {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        console.log("章节修改成功",res);
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
    },
    closed(){
      this.sendChapter()
      this.$alert('上传成功，待审核', '提示', {
        confirmButtonText: '确定',
      });
      this.$emit('close',false);
    },
  },
}
</script>

<style scoped>

.headerbutton {
  cursor: pointer;
  float: right;
  margin-top: 0;
}


.emphasize {
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  font-size: 13px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.el-drawer__header{
  margin-bottom: 10px;
}
.title {
  margin: 10px 30px;
  text-align: left;
}
</style>
