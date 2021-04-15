<template>
  <div class="NAV1">
    <el-container>
      <el-main>
        <div class="block">
          <span class="demonstration"></span>
          <el-carousel height="455px">
            <el-carousel-item>
<!--              <router-link to="/course">-->
                <img src="../assets/Nav1-p1.jpg" alt="">
<!--              </router-link>-->
            </el-carousel-item>
            <el-carousel-item>
<!--              <router-link to="/course">-->
                <img src="../assets/Nav1-p2.jpg" alt="">
<!--              </router-link>-->
            </el-carousel-item>
            <el-carousel-item>
<!--              <router-link to="/course">-->
                <img src="../assets/Nav1-p3.jpg" alt="">
<!--              </router-link>-->
            </el-carousel-item>
            <el-carousel-item>
<!--              <router-link to="/course">-->
                <img src="../assets/Nav1-p4.jpg" alt="">
<!--              </router-link>-->
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
};
</script>

<style scoped>
.NAV1 {
  width: 1100px;
  margin: 50px auto 0 auto;
}

.el-main{
  padding: 40px;
}

.el-container {
  height: 540px;
}

.el-carousel__item img {
  height: 100%;
  width: 100%;
}
</style>
