<template>

  <div class="line">
    <div class="WholeCourse">
      <h3>
        全部课程
      </h3>
    </div>
    <el-row :gutter="25">
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course1.webp">
            <h4>高等数学（四）</h4>
            <h5>同济大学</h5>
            <h6>兰辉</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course2.webp">
            <h4>高等数学（二）</h4>
            <h5>交通大学</h5>
            <h6>李继承</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course3.webp">
            <h4>高等数学（三）</h4>
            <h5>同济大学</h5>
            <h6>张军</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course4.webp">
            <h4>高等数学（二）</h4>
            <h5>山东大学</h5>
            <h6>姜晓云</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course5.webp">
            <h4>C语言程序设计</h4>
            <h5>浙江大学</h5>
            <h6>文凯</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course6.webp">
            <h4>课堂管理方法与艺术</h4>
            <h5>爱课程</h5>
            <h6>王朗</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course7.webp">
            <h4>天文</h4>
            <h5>华中科技大学</h5>
            <h6>徐学军</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course8.webp">
            <h4>Python网络爬虫</h4>
            <h5>北京理工大学</h5>
            <h6>昊天</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course9.webp">
            <h4>Python语言程序设计</h4>
            <h5>北京理工大学</h5>
            <h6>昊天</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course10.webp">
            <h4>程序设计入门</h4>
            <h5>浙江大学</h5>
            <h6>文凯</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course11.webp">
            <h4>形势与政策</h4>
            <h5>同济大学</h5>
            <h6>彭庆红</h6>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/course">
          <div class="grid-content">
            <img src="../assets/course12.webp">
            <h4>大学计算机</h4>
            <h5>同济大学</h5>
            <h6>李凤霞</h6>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Curriculum"
}
</script>

<style scoped>
.grid-content:hover {
  background-color: #d3dce6;
  text-decoration:none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}
.WholeCourse {
  margin: 50px 20px;
  text-align: left;
}

.line {
  margin: 20px 150px;
}

.el-col {
  border-radius: 10px;
}

.grid-content {
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  min-height: 200px;
  margin-bottom: 20px;
  background: #F2F6FC;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.grid-content img {
  border-radius: 10px;
  width: 100%;
}

.grid-content h4 {
  margin: 5px;
}

.grid-content h5 {
  margin: 5px;
}

.grid-content h6 {
  margin: 5px;
  margin-bottom: 20px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
