<template>
  <div class="Course">
    <div class="Course-Title">
      <el-radio-group fill="#67C23A" v-model="prefer">
        <el-radio-button v-for="(item,index) in this.$store.state.Prefer" v-bind:key="index"
                         :label="item.preferContent"
                         @click.native="CourseChoose($event,item.preferId,1,2)"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="new-best-hot">
      <el-radio-group v-model="radio">
        <el-radio-button @click.native="CourseChoose($event,preferId,1,needVip)" label="最新课程"></el-radio-button>
        <el-radio-button @click.native="CourseChoose($event,preferId,2,needVip)" label="最好课程"></el-radio-button>
        <el-radio-button @click.native="CourseChoose($event,preferId,3,needVip)" label="最热课程"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="free-vip">
      <el-radio v-model="radioVip" @click.native="CourseChoose($event,preferId,sort,2)" label="1">全部课程</el-radio>
      <el-radio v-model="radioVip" @click.native="CourseChoose($event,preferId,sort,0)" label="2">免费课程</el-radio>
      <el-radio v-model="radioVip" @click.native="CourseChoose($event,preferId,sort,1)" label="3">付费课程</el-radio>
    </div>
    <el-row :gutter="25">
      <el-col :span="6" v-for="(item,index) in this.$store.state.menuCourseData.list" v-bind:key="index">
        <div class="grid-content" @click="CourseHistory(item.courseId)">
          <img :src="item.src" alt="图片缺失">
          <h4>{{ item.name }}</h4>
          <h6>{{ item.teacher.name }}</h6>
        </div>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="this.$store.state.menuCourseData.total_element">
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
      majorId: this.$route.query.majorId,
      preferId: 0,
      needVip: 2,
      sort: 1,
      prefer: '全部课程',
      radio: '最新课程',
      radioVip: '1',
    };
  },
  methods: {
    CourseHistory(courseId) {
      this.$router.push({path: '/course', query: {courseId: courseId}});
    },
    CourseChoose(e, preferId, sort, needVip) {
      if (e.target.tagName === 'INPUT') return // 因为原生click事件会执行两次，第一次在label标签上，第二次在input标签上，故此处理
      let that = this;
      if (preferId != 0) {
        let a = new URLSearchParams;
        a.append("page", 1);
        a.append("preferId", preferId);
        a.append("sort", sort);
        if (needVip != 2) {
          a.append("needVip", needVip);
          axios.post("http://" + this.Api + "/api/Course/getCourseByNeedVipAndPreferId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
            that.preferId = preferId;
            that.needVip = needVip;
            that.sort = sort;
          }, function (err) {
            console.log(err);
          });
        } else {
          axios.post("http://" + this.Api + "/api/Course/getCourseByPreferId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
            that.preferId = preferId;
            that.needVip = needVip;
            that.sort = sort;
          }, function (err) {
            console.log(err);
          });
        }
      } else {
        let a = new URLSearchParams;
        a.append("page", 1);
        a.append("majorId", this.$route.query.majorId);
        a.append("sort", sort);
        if (needVip != 2) {
          a.append("needVip", needVip);
          axios.post("http://" + this.Api + "/api/Course/getCourseByMajorIdAndNeedVip?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
            that.preferId = preferId;
            that.needVip = needVip;
            that.sort = sort;
          }, function (err) {
            console.log(err);
          });
        } else {
          axios.post("http://" + this.Api + "/api/Course/getCourseByMajorId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
            that.preferId = preferId;
            that.needVip = needVip;
            that.sort = sort;
          }, function (err) {
            console.log(err);
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.Course {
  margin: 20px auto;
  width: 1100px;
}

.Course-Title {
  margin: 50px 20px 30px 0;
  text-align: left;
}

.new-best-hot {
  text-align: left;
  margin: 20px auto;
}

.free-vip {
  text-align: left;
  margin: 20px 10px;
}

.el-radio-button {
  margin: auto 10px;
}

/deep/ .el-radio-button__inner {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}

.grid-content {
  cursor: pointer;
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
