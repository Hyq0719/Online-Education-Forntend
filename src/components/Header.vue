<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <div class="Header">
        <img src="../assets/logo.png" alt="加载失败" style="height:60px; width:60px;"/>
      </div>
      <slot id="search">
        <div class="Header-search">
          <el-input placeholder="请输入内容" v-model="input" clearable>
          </el-input>
        </div>
        <div class="Header">
          <router-link to="/searchpage">
            <img src="../assets/Header-search-logo.jpg" alt="加载失败" style="height:40px; width:40px; margin:10px 0;"/>
          </router-link>
        </div>
      </slot>
      <el-submenu index="1">
        <template slot="title">
          <avatar v-if="isLogin" style="float: left;"></avatar>

          <div class="demo-basic--circle" v-if="!isLogin&&!isLoginTeacher" style="float: left;">
            <div class="block">
              <el-avatar :size="40" :src="circleUrl"></el-avatar>
            </div>
          </div>

          <div class="demo-basic--circle" v-if="isLoginTeacher" style="float: left;">
            <div class="block">
              <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
            </div>
          </div>

        </template>
        <el-menu-item index="1-1" @click="Information">个人信息</el-menu-item>
        <el-menu-item index="1-2">我的消息</el-menu-item>
        <el-menu-item index="1-3" v-if="isLoginTeacher" @click="class_management">管理课程</el-menu-item>
        <el-menu-item index="1-4">设置</el-menu-item>
        <el-menu-item index="1-5" v-if="!isLogin&&!isLoginTeacher" @click="Login">登录</el-menu-item>
        <el-menu-item index="1-5" v-if="isLogin||isLoginTeacher" @click="Logout">注销</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">分类</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <router-link to="/coursemenu">课程</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/live">直播</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/">首页</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import store from '../vuex/store';
import Avatar from "@/components/Avatar";

export default {
  components: {Avatar},
  store,
  name: "Header",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      input: '',
      isLogin: this.$store.state.isLogin,
      isLoginTeacher: this.$store.state.isLoginTeacher,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    };
  },
  methods: {
    class_management() {
      this.$router.push('/Classmanagement')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    Login() {
      this.$router.push('/Login')
    },
    Logout() {
      this.$store.commit('saveIsLogin');
    },
    // axios.post(this.Api + "/api/Student/loginByPassword").then(function (response) {
    //   console.log(response);
    //   that.$store.commit('saveIsLogin');
    // }, function (err) {
    //   console.log(err);
    // })
    Information() {
      this.$router.push('/Information')
    },
  }
}
</script>

<style scoped>
.Header {
  float: left;
  height: 60px;
  width: 60px;
}

.Header-search {
  float: left;
  width: 300px;
  margin: 10px 0 10px 50px;
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
</style>
