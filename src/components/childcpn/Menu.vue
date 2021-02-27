<template>
  <div>
    <div class="Course-content-content-img">
      <img v-if="coursePic" :src="coursePic" alt="图片缺失">
    </div>
    <!--    课程-->
    <h4 v-if="name">{{ name }}</h4>
    <h6 v-if="teacherName">{{ teacherName }}</h6>
    <p class="free" v-if="isFree&&!VIP">免费</p>
    <p class="VIP" v-if="isFree&&VIP">VIP</p>
    <!--    直播-->
    <h6 v-if="liveDate">直播时间：{{ liveDate }}</h6>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    //课程
    name: null,
    teacherName: null,
    coursePic: null,
    isFree: null,
    VIP: null,
    //直播
    liveDate: null,
  },
}
</script>

<style scoped>
.Course-content-content-img {
  text-align: center;
  margin: 3px;
}

.Course-content-content img {
  border-radius: 10px;
  width: 100%;
}

.Course-content-content h4 {
  margin: 10px;
}

.Course-content-content h6 {
  margin: 10px 10px 20px 10px;
}

.Course-content-content p {
  margin: 10px 10px 0 10px;
}

.free {
  color: #67C23A;
}

.VIP {
  color: #F56C6C;
}

a {
  text-decoration: none;
  color: #1c1f21;
}
</style>
