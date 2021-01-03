<template>
  <div>
    <el-container style="margin:0px 150px; height: 500px; border: 1px solid #eee">
      <el-aside width="220px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>前沿</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">类别1</el-menu-item>
              <el-menu-item index="1-2">类别2</el-menu-item>
              <el-menu-item index="1-3">类别3</el-menu-item>
              <el-menu-item index="1-4">类别4</el-menu-item>
              <el-menu-item index="1-5">类别5</el-menu-item>
              <el-menu-item index="1-6">类别6</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>前端</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">课程1</el-menu-item>
              <el-menu-item index="2-2">课程2</el-menu-item>
              <el-menu-item index="2-3">课程3</el-menu-item>
              <el-menu-item index="2-4">课程4</el-menu-item>
              <el-menu-item index="2-5">课程5</el-menu-item>
              <el-menu-item index="2-6">课程6</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>后端</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">课程1</el-menu-item>
              <el-menu-item index="3-2">课程2</el-menu-item>
              <el-menu-item index="3-3">课程3</el-menu-item>
              <el-menu-item index="3-4">课程4</el-menu-item>
              <el-menu-item index="3-5">课程5</el-menu-item>
              <el-menu-item index="3-6">课程6</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>移动</template>
            <el-menu-item-group>
              <el-menu-item index="4-1">课程1</el-menu-item>
              <el-menu-item index="4-2">课程2</el-menu-item>
              <el-menu-item index="4-3">课程3</el-menu-item>
              <el-menu-item index="4-4">课程4</el-menu-item>
              <el-menu-item index="4-5">课程5</el-menu-item>
              <el-menu-item index="4-6">课程6</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-menu"></i>云计算</template>
            <el-menu-item-group>
              <el-menu-item index="5-1">课程1</el-menu-item>
              <el-menu-item index="5-2">课程2</el-menu-item>
              <el-menu-item index="5-3">课程3</el-menu-item>
              <el-menu-item index="5-4">课程4</el-menu-item>
              <el-menu-item index="5-5">课程5</el-menu-item>
              <el-menu-item index="5-6">课程6</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-menu"></i>运维</template>
            <el-menu-item-group>
              <el-menu-item index="6-1">课程1</el-menu-item>
              <el-menu-item index="6-2">课程2</el-menu-item>
              <el-menu-item index="6-3">课程3</el-menu-item>
              <el-menu-item index="6-4">课程4</el-menu-item>
              <el-menu-item index="6-5">课程5</el-menu-item>
              <el-menu-item index="6-6">课程6</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <div class="block">
          <span class="demonstration"></span>
          <el-carousel height="455px">
            <el-carousel-item>
              <img src="../assets/Nav1-p1.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/Nav1-p2.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/Nav1-p3.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/Nav1-p4.jpg" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Nav1",
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-carousel__item img {
  height: 100%;
  width: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
