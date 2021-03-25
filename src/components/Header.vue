<template>
  <div class="Header">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <slot>
        <div class="header-img">
          <img src="../assets/SHUCESlogo.jpeg" alt="图片缺失">
        </div>
        <div class="Header-search">
          <el-autocomplete
              class="inline-input"
              v-model="input"
              :fetch-suggestions="querySearch"
              placeholder="请输入搜索的课程"
              :trigger-on-focus="false"
              @select="handleSelectSearch"
              @keyup.enter.native="Search">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
            <template slot-scope="{ item }">
              <div class="name" v-html="item.name"></div>
              <span class="intro">{{ item.intro }}</span>
            </template>
          </el-autocomplete>
        </div>
      </slot>
      <el-submenu index="2" v-if="isLogin||isLoginTeacher" class="avatar">
        <template slot="title">
          <img v-if="isLogin" :src="this.studentPicUrl" alt="头像加载失败"/>
          <img v-if="isLoginTeacher" :src="this.teacherPicUrl" alt="头像加载失败"/>
        </template>
        <el-menu-item index="1-1" @click="Information">个人信息</el-menu-item>
        <el-menu-item index="1-2" v-if="isLogin" @click="Homework">我的作业</el-menu-item>
        <el-menu-item index="1-3" v-if="isLogin" @click="History">历史记录</el-menu-item>
        <el-menu-item index="1-4" v-if="isLogin" @click="Collect">收藏课程</el-menu-item>
        <el-menu-item index="1-5" v-if="isLoginTeacher" @click="class_management">管理课程</el-menu-item>
        <el-menu-item index="1-6" @click="Logout">注销</el-menu-item>
      </el-submenu>
      <el-menu-item index="1" v-if="isLogin">
        <router-link to="/VIP">开通VIP</router-link>
      </el-menu-item>
      <el-menu-item index="2" v-if="!isLogin&&!isLoginTeacher">
        <router-link to="/login">登录/注册</router-link>
      </el-menu-item>
      <el-menu-item index="3" v-if="(!isLogin&&!isLoginTeacher)||(isLogin)">
        <el-popover
            placement="bottom"
            width="300"
            trigger="hover">
          <div class="courseTitle">
            <h3>大学课程</h3>
          </div>
          <div class="courseContent">
            <el-button @click="CourseMenuPrefer(item.majorId)" v-for="(item,index) in this.$store.state.MajorPrefer"
                       v-bind:key="index"
                       class="CourseButton">{{
                item.majorContent
              }}
            </el-button>
          </div>
          <el-button slot="reference" class="course" plain>课程</el-button>
        </el-popover>
      </el-menu-item>
      <el-menu-item index="4" v-if="(!isLogin&&!isLoginTeacher)||(isLogin)">
        <router-link to="/liveMenu">直播</router-link>
      </el-menu-item>
      <el-menu-item index="5" v-if="(!isLogin&&!isLoginTeacher)||(isLogin)">
        <router-link to="/main">首页</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import axios from "axios";

export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
      input: '',
      studentPicUrl: this.$store.state.userData.studentPicUrl,
      teacherPicUrl: this.$store.state.userData.teacherPicUrl,
      isLogin: this.$store.state.isLogin,
      isLoginTeacher: this.$store.state.isLoginTeacher,
      courseData: [],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      let that = this;
      let a = new URLSearchParams;
      a.append("page", 1);
      a.append("query", queryString);
      console.log("获取搜索", queryString);
      axios.post("http://" + this.Api + "/api/Course/getCoursesWithRegex?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取搜索课程", response);
        for (let i of response.data.data.list) {
          i.value = i.name;  //将想要展示的数据作为value
          i.value = i.value.replace(/<\/?.+?>/g, "");
          i.value = i.value.replace(/&nbsp;/g, "");
        }
        that.courseData = response.data.data.list;
        console.log("匹配课程信息", that.courseData);
        cb(that.courseData);
      }, function (err) {
        console.log(err);
      });
    },
    Search() {
      // console.log("queryString", this.input);
      this.$router.push({path: '/searchPage', query: {search: this.input}});
      this.$store.commit('saveSearchedCourseData', this.courseData);
    },
    handleSelectSearch(item) {
      console.log(item);
      this.$router.push({path: '/course', query: {courseId: item.courseId}});
    },
    class_management() {
      this.$router.push('/Classmanagement/blank');
    },
    CourseMenuPrefer(majorId) {
      this.$router.push({path: '/coursemenu', query: {majorId: majorId}});
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    Login() {
      this.$router.push('/login');
    },
    Logout() {
      this.$router.push('/login');
      if (this.isLogin) {
        this.$store.commit('saveIsLogin');
        sessionStorage.removeItem("StudentPreferences");
        sessionStorage.removeItem("StudentHistory");
        sessionStorage.removeItem("userData");
      } else {
        this.$store.commit('saveIsLoginTeacher');
        sessionStorage.removeItem("userData");
      }
      VueCookies.remove('JWT');
    },
    Information() {
      this.$router.push('/information');
    },
    History() {
      this.$router.push('/history');
    },
    Collect() {
      this.$router.push('/collect');
    },
    Homework() {
      this.$router.push('/homework');
    },
  },
};
</script>

<style scoped>
/deep/ .el-menu-item * {
  vertical-align: baseline;
}

.header-img {
  float: left;
  width: 50px;
  height: 50px;
  margin: 0 20px 0 50px;
}

.header-img img {
  width: 100%;
  height: 100%;
}

.Header-search {
  float: left;
  width: 300px;
  margin: 10px 0 10px 10px;
}

.el-autocomplete {
  display: inline;
}

.intro {
  font-size: 12px;
  color: #b4b4b4;
  float: right;
}

.avatar img {
  height: 40px;
  width: 40px;
  margin: 10px 0;
  float: left;
}

.el-menu--horizontal > .el-menu-item {
  float: right;
}

.el-menu--horizontal > .el-submenu {
  float: right;
}

a:hover {
  text-decoration: none;
  color: #ffd04b;
}

a {
  text-decoration: none;
  color: #99a9bf;
}

.courseTitle {
  text-align: center;
}

.courseContent {
  margin: 5px auto;
}

.CourseButton {
  margin: 5px;
  font-size: 12px;
}

.course {
  border: 0;
  margin: 0;
  padding: 0;
}
</style>
