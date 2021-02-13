<template>
  <div class="Course">
    <div class="Course-Title">
      <h3>
        {{ course[this.$route.query.preferId - 1] }}
      </h3>
    </div>
    <div class="new-best-hot">
      <el-radio-group v-model="radio">
        <el-radio-button @click.native="CourseChoose(1,needVip)" label="最新课程"></el-radio-button>
        <el-radio-button @click.native="CourseChoose(2,needVip)" label="最好课程"></el-radio-button>
        <el-radio-button @click.native="CourseChoose(3,needVip)" label="最热课程"></el-radio-button>
      </el-radio-group>
    </div>
    <el-divider></el-divider>
    <div class="free-vip">
      <el-radio v-model="radioVip" @click.native="CourseChoose(sort,2)" label="1">全部课程</el-radio>
      <el-radio v-model="radioVip" @click.native="CourseChoose(sort,0)" label="2">免费课程</el-radio>
      <el-radio v-model="radioVip" @click.native="CourseChoose(sort,1)" label="3">付费课程</el-radio>
    </div>
    <el-row :gutter="25">
      <el-col :span="6" v-for="(item,index) in this.$store.state.courseData.list" v-bind:key="index">
        <router-link :to="{path:'/course',query:{courseId:item.courseId}}">
          <div class="grid-content">
            <img :src="item.src" alt="图片缺失">
            <h4>{{ item.name }}</h4>
            <h6>{{ item.teacherId }}</h6>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CourseMenu",
  data() {
    return {
      course: ['程序设计', '免费课程', '计算机基础课'],
      preferId: this.$route.query.preferId,
      needVip: 2,
      sort: 1,
      radio: '最新课程',
      radioVip: '1',
    }
  },
  methods: {
    CourseChoose(sort, needVip) {
      let that = this;
      let a = new URLSearchParams;
      let preferId = this.$route.query.preferId;
      a.append("page", 1)
      a.append("preferId", preferId)
      a.append("sort", sort)
      if (needVip != 2) {
        a.append("needVip", needVip)
        axios.post("http://" + this.Api + "/api/Course/getCourseByNeedVipAndPreferId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log(response);
          that.$store.commit('saveCourseData', response.data.data);
          that.needVip = needVip;
          that.sort = sort;
        }, function (err) {
          console.log(err);
        })
      } else {
        axios.post("http://" + this.Api + "/api/Course/getCourseByPreferId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log(response);
          that.$store.commit('saveCourseData', response.data.data);
          that.needVip = needVip;
          that.sort = sort;
        }, function (err) {
          console.log(err);
        })
      }
    },
  }
}
</script>

<style scoped>
.Course {
  margin: 20px auto;
  width: 1100px;
}

.Course-Title {
  margin: 50px 20px 30px 20px;
  text-align: left;
}

.new-best-hot {
  text-align: left;
  margin: 20px auto;
}

.free-vip {
  text-align: left;
  margin: 20px;
}

.el-radio-button {
  margin: auto 10px;
}

/deep/ .el-radio-button__inner {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}

.grid-content {
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  height: 240px;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.grid-content img {
  border-radius: 10px;
  width: 100%;
}

.grid-content h4 {
  margin: 10px;
}

.grid-content h6 {
  margin: 10px 10px 20px 10px;
}

.grid-content:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

a {
  text-decoration: none;
  color: #1c1f21;
}

.router-link-active {
  text-decoration: none;
}

.block {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
