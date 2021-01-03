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
      <div class="Header-search">
        <el-input placeholder="请输入内容" v-model="input" clearable>
        </el-input>
      </div>
      <div class="Header">
        <img src="../assets/Header-search-logo.jpg" alt="加载失败" style="height:40px; width:40px; margin:10px 0px;"/>
      </div>

      <el-menu-item index="1"
        ><router-link to="/login">登录</router-link></el-menu-item
      >
      <el-submenu index="2">
        <template slot="title">分类</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4"
        ><router-link to="/live">直播</router-link></el-menu-item
      >
      <el-menu-item index="5"
        ><router-link to="/">首页</router-link></el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  name:"Header",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      input:'',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.Header {
  float: left;
  height: 60px;
  width: 60px;
}
.Header-search{
    float:left;
    width:200px;
    margin:10px 0px 10px 50px;
}

.el-menu--horizontal > .el-menu-item {
  float: right;
}
.el-menu--horizontal > .el-submenu {
  float: right;
}
</style>
