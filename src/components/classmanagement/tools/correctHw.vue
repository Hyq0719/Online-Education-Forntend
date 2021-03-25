<template>
  <div>
    <el-main>
      <div>
        {{ info.content }}
      </div>

      <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          multiple
          :file-list="fileList">
        <div slot="tip" class="el-upload__tip">作业文件：</div>
      </el-upload>

      <div style="float: right;overflow: hidden;clear: both;">
        提交时间： {{ info.commitTime }}
      </div>
      <div style="float: left;overflow: hidden;clear: both;">
        <el-form :inline="true" v-model="input" class="demo-form-inline">
          <el-form-item label="评分:">
            <el-input v-model="input"> placeholder="请打分"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="float: left;overflow: hidden;clear: both;font-size: 14px">
        评语：
      </div>
      <div>
        <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
      </div>

      <el-button type="primary" class="headerbutton" @click="closed1" :loading="loading"
                 style="text-align: center;margin: 20px 20px 0 0">
        {{ loading ? '提交中 ...' : '确认批改' }}
      </el-button>

      <el-button type="primary" class="headerbutton" @click="closed2" :loading="loading"
                 style="text-align: center;margin: 20px 0 0 20px">
        {{ loading ? '提交中 ...' : '驳回作业' }}
      </el-button>

    </el-main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "correctHw",
  props: {info: {}},
  // commitTime: "2021-02-13 23:03:04"
  // content: "content"
  // homeworkId: 1
  // likes: 0
  // mark: 100
  // reply: "string"
  // status: 0
  // studentId: 1
  // taskId: 1
  data() {
    return {
      loading: false,
      input: null,
      textarea: "",
      fileList: [],
    };
  },
  methods: {

    handlePreview(file, fileList) {
      let params = {}
      console.log(file);
      params = file.url;

//在當前瀏覽器頁面直接下載
//         document.location.href = params.url;

//圖片會直接在瀏覽器中打開所以，打開新的頁面
      window.open(params, 'hello');

    },
    closed1() {
      let that = this;
      if (Number(this.input)>100)
        that.$notify.info({
          title: '警告',
          message: '打分请小于100',
          type: 'warning',
        });
      else {
      let params = {
        homeworkId: this.info.homeworkId,
        mark: Number(this.input),
        reply: this.textarea,
        status: 3,
      };
      console.log(params);
      let JWT = this.$store.state.JWT;

      axios.post("http://" + this.Api + "/api/Homework/teacherHomework", params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("批改成功", response);
        that.$alert('批改成功', '提示', {
          confirmButtonText: '确定',
        });
        that.$emit('close', false);
      }, function (err) {
        console.log(err);
      });};
    },
    closed2() {
      let that = this;

      let params = {
        homeworkId: this.info.homeworkId,
        mark: Number(this.input),
        reply: this.textarea,
        status: 1,
      };
      console.log(params);
      let JWT = this.$store.state.JWT;

      axios.post("http://" + this.Api + "/api/Homework/teacherHomework", params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("驳回成功", response);
        that.$alert('驳回成功', '提示', {
          confirmButtonText: '确定',
        });
        that.$emit('close', false);
      }, function (err) {
        console.log(err);
      });
    },
  },
  async mounted() {

    let that = this;
    let b = new URLSearchParams();
    b.append("homeworkId", that.info.homeworkId);
    await axios.post('http://' + that.Api + "/api/Homework/getFilesByHomework", b,
        {
          headers: {
            'Authorization': that.$store.state.JWT,
          }
        }
    ).then(function (res) {
          console.log("作业文件", res);
          if (res.data.code === 1000) {
            that.fileList = res.data.data.map(item => ({name: item.fileName, url: item.fileUrl}));
          }
        }, function (err) {
          console.log(err);
        }
    );
  },

}
</script>

<style scoped>

</style>
