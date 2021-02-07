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
      <el-submenu index="1" v-if="isLogin||isLoginTeacher" class="avatar">
        <template slot="title">
          <img v-if="isLogin" :src="this.studentPicUrl" alt="头像加载失败"/>
          <img v-if="isLoginTeacher" :src="this.teacherPicUrl" alt="头像加载失败"/>
        </template>
        <el-menu-item index="1-1" @click="Information">个人信息</el-menu-item>
        <el-menu-item index="1-2">我的消息</el-menu-item>
        <el-menu-item index="1-3" v-if="isLoginTeacher" @click="class_management">管理课程</el-menu-item>
        <el-menu-item index="1-4">设置</el-menu-item>
        <el-menu-item index="1-6" @click="Logout">注销</el-menu-item>
      </el-submenu>
      <el-menu-item index="1" v-if="!isLogin&&!isLoginTeacher">
        <router-link to="/login">登录/注册</router-link>
      </el-menu-item>
      <el-menu-item index="2" v-if="(!isLogin&&!isLoginTeacher)||(isLogin)">
        <el-popover
            placement="bottom"
            width="300"
            trigger="hover">
          <h3>大学课程</h3>
          <div>
            <el-button @click="CourseMenu" v-for="item in college" v-bind:key="item.id" class="CourseMenu">{{
                item
              }}
            </el-button>
          </div>
          <el-divider></el-divider>
          <h3>升学课程</h3>
          <div>
            <el-button @click="CourseMenu" v-for="item in graduate" v-bind:key="item.id" class="CourseMenu">{{
                item
              }}
            </el-button>
          </div>
          <el-divider></el-divider>
          <h3>终身学习课程</h3>
          <div>
            <el-button @click="CourseMenu" v-for="item in lifelong" v-bind:key="item.id" class="CourseMenu">{{
                item
              }}
            </el-button>
          </div>
          <el-button @click="CourseMenu" slot="reference" class="course" plain>课程</el-button>
        </el-popover>
      </el-menu-item>
      <el-menu-item index="3" v-if="(!isLogin&&!isLoginTeacher)||(isLogin)">
        <router-link to="/liveMenu">直播</router-link>
      </el-menu-item>
      <el-menu-item index="4" v-if="(!isLogin&&!isLoginTeacher)||(isLogin)">
        <router-link to="/main">首页</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

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
      college: ['所有课程', '免费课程', '热门课程', '计算机', '数学', '金融', '计算机', '数学', '金融'],
      graduate: ['考研21', '考研20', '期末不挂', '英语学习'],
      lifelong: ['名师专栏'],
    };
  },
  methods: {
    class_management() {
      this.$router.push('/Classmanagement')
    },
    CourseMenu() {
      this.$router.push('/coursemenu');
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    Login() {
      this.$router.push('/login')
    },
    Logout() {
      this.$router.push('/login');
      if (this.isLogin) {
        this.$store.commit('saveIsLogin');
      } else {
        this.$store.commit('saveIsLoginTeacher');
      }
    },
    Information() {
      this.$router.push('/Information');
    },
  }
}
</script>

<style scoped>
.avatar img {
  height: 40px;
  width: 40px;
  margin: 10px 0px;
  float: left;
}

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

.CourseMenu {
  margin: 5px;
  width: 90px;
  font-size: 12px;
}

.course {
  border: 0;
  margin: 0;
  padding: 0;
}
</style>
