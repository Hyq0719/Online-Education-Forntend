<template>
  <div>
    <div class="search-box">
      <div class="search-wrap">
        <img src="@/assets/logo.png" alt="找不到图片">
        <input class="search-word" type="text" placeholder="请输入要查找的课程ID" v-model="input" @keyup.enter="findComment"/>
        <div>
          <button class="search-bottom" @click="findComment">搜索课程</button>
        </div>
      </div>
    </div>
    <el-container>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "commentAnalyze",
  data() {
    return {
      input: null,
    }
  },
  methods: {
    findComment() {
      this.$router.push('/Classmanagement/commentAnalyze/commentList')
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('courseId', that.input);
      a.append('page', 1);
      a.append('sort', 1);
      axios.post("http://" + that.Api + "/api/Course/getCourseComments", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log(response);
        if (response.data.code === 1000) {
          that.$store.commit("saveCommentData", response.data.data.list);
          console.log(that.$store.state.commentData);
          that.comment = this.$store.state.commentData;
        }
      }, function (err) {
        console.log(err);
      });
    }
  },
  mounted() {
    let breadcrumb = [
      {
        link: '/Classmanagement',
        title: '课程管理'
      },
      {
        link: '/Classmanagement/commentAnalyze',
        title: '评论搜索'
      },
    ]
    this.$store.commit("savebreadcrumb", breadcrumb)
  },
}
</script>

<style scoped>
.search-wrap {
  height: 44px;
  margin: 0 auto;
  position: relative;
  width: 587px;
}

.search-word {
  height: 18px;
  box-shadow: none;
  padding: 11px 15px;
  background: transparent;
  width: 296px;
  border: 2px solid #ccd0d7;
  border-radius: 4px;
  font-size: 16px;
  color: #222;
  float: left;
  margin-right: 10px;
}

.search-bottom {
  cursor: pointer;
  float: left;
  color: #fff;
  background: #00a1d6;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 42px;
  text-align: center;
  width: 90px;
  border-radius: 4px;
  border: none;
}

.search-box {
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  padding-top: 40px;
  overflow: hidden;
  clear: both;
}

img {
  height: 60px;
  float: left;
  margin-right: 40px;
}
</style>
