<template>
  <div class="Course-content-content">
    <div class="Course-content-content-img">
      <img v-if="coursePic" :src="coursePic" alt="图片缺失">
      <img v-if="!coursePic" src="../../assets/SHUlogo.jpg" alt="图片缺失">
    </div>
    <!--    课程-->
    <h4 v-if="name">{{ name }}</h4>
    <h6 v-if="teacherName">教师：{{ teacherName }}</h6>
    <h6 v-if="courseAvgMark" style="color: #409EFF">课程评分：{{ courseAvgMark }}</h6>
    <h6 class="courseWatches" v-if="courseWatches" style="color: #E6A23C">观看人数：{{ courseWatches }}</h6>
    <p style="color: #67C23A" v-if="isFree&&!VIP">免费</p>
    <p style="color: #F56C6C" v-if="isFree&&VIP">VIP</p>
    <!--    直播-->
    <h6 v-if="liveDate">直播时间：{{ liveDate }}</h6>
    <p v-if="liveDate && (Date.parse(today) > Date.parse(liveDate))">直播已过期</p>
    <p style="color: #F56C6C" v-if="liveDate && (Date.parse(today) == Date.parse(liveDate))">今日直播</p>
    <p style="color: #67C23A" v-if="liveDate && (Date.parse(today) < Date.parse(liveDate))">直播未开始</p>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    width: null,
    //课程
    name: null,
    teacherName: null,
    courseAvgMark: null,
    courseWatches: null,
    coursePic: null,
    isFree: null,
    VIP: null,
    //直播
    liveDate: null,
  },
  computed: {
    today: {
      get() {
        return new Date().toLocaleDateString();
      },
    }
  },
}
</script>

<style scoped>
.Course-content-content {
  position:relative;
  height: 265px;
  cursor: pointer;
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  margin: 10px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.Course-content-content:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.Course-content-content-img {
  text-align: center;
  margin: 3px;
  height: 130px;
}

.Course-content-content img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
}

.Course-content-content h4 {
  margin: 10px;
}

.Course-content-content h6 {
  margin: 5px 10px 5px 10px;
}

.Course-content-content p {
  font-size: 13px;
  position: absolute;
  bottom: 0px;
  margin: 5px 10px;
}

.courseWatches{
  position: absolute;
  right: 0px;
  bottom: 0px;
  margin: 5px 10px;
}

a {
  text-decoration: none;
  color: #1c1f21;
}
</style>
