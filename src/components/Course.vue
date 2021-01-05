<template>
  <el-container>
    <el-main>
      <VideoPlayer></VideoPlayer>
    </el-main>
    <el-aside width="300px">
      <el-menu
          :default-openeds="['1']"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>章节一：数理统计不挂科</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">课时1：基础知识</el-menu-item>
            <el-menu-item index="1-2">课时2：用矩估计法进行点估计</el-menu-item>
            <el-menu-item index="1-3">课时3：区间估计</el-menu-item>
            <el-menu-item index="1-4">课时4：假设检验</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>章节二</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">课时1</el-menu-item>
            <el-menu-item index="1-2">课时2</el-menu-item>
            <el-menu-item index="1-3">课时3</el-menu-item>
            <el-menu-item index="1-4">课时4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>章节三</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">课时1</el-menu-item>
            <el-menu-item index="1-2">课时2</el-menu-item>
            <el-menu-item index="1-3">课时3</el-menu-item>
            <el-menu-item index="1-4">课时4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>章节四</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">课时1</el-menu-item>
            <el-menu-item index="1-2">课时2</el-menu-item>
            <el-menu-item index="1-3">课时3</el-menu-item>
            <el-menu-item index="1-4">课时4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer";

export default {
  name: "Course",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      count: 10,
      loading: false,
      input: '',
    }
  },
  computed: {
    noMore() {
      return this.count >= 40
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 200)
    }
  },
}
</script>

<style scoped>
.el-aside {
  text-align: left;
  line-height: 20px;
  font-size: 10px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  padding: 0px;
}

.el-container {
  margin: 20px 100px;
  height: 580px;
  border: #99a9bf 1px solid;
  border-radius: 10px;
}
</style>
