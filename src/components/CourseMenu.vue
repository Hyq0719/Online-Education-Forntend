<template>
  <div class="Course">
    <div class="Course-Title">
      <el-radio-group fill="#67C23A" v-model="prefer">
        <el-radio-button v-for="(item,index) in this.$store.state.Prefer" v-bind:key="index"
                         :label="item.preferContent"
                         @click.native="CourseChoose($event,item.preferId,sort,needVip)"></el-radio-button>
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
    <div class="Course-content">
      <div class="Course-content-content" v-for="(item,index) in this.$store.state.MenuCourseData.list"
           v-bind:key="index" @click="Course(item.courseId)">
        <Menu :name="item.name" :teacherName="item.teacher.name" :coursePic="item.coursePic" :isFree="1" :VIP="item.needVip"></Menu>
      </div>
    </div>
    <div class="block">
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="this.$store.state.MenuCourseData.total_element">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Menu from "@/components/childcpn/Menu";

export default {
  name: "CourseMenu",
  components: {
    Menu,
  },
  data() {
    return {
      majorId: this.$route.query.majorId,
      preferId: 0,
      needVip: 2,
      sort: 1,
      prefer: '全部课程',
      radio: '最新课程',
      radioVip: '1',
      currentPage: 1,
    };
  },
  watch: {
    '$route'(to, from) {
      this.initCourseMenu();
    }
  },
  created() {
    this.initCourseMenu();
  },
  methods: {
    initCourseMenu() {
      let that = this;
      let a = new URLSearchParams;
      a.append("page", 1);
      a.append("majorId", this.$route.query.majorId);
      a.append("sort", 1);
      axios.post("http://" + this.Api + "/api/Course/getCourseByMajorId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取此专业课程菜单", response);
        that.$store.commit('saveMenuCourseData', response.data.data);
      }, function (err) {
        console.log(err);
      });
      let PreferData = {
        preferContent: "全部课程",
        preferId: 0,
      };
      let b = new URLSearchParams;
      b.append("major_id", this.$route.query.majorId);
      axios.post("http://" + this.Api + "/api/Major/getPreferByMajor?" + b, null, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function (response) {
        response.data.data.unshift(PreferData)
        console.log("获取此专业的子专业", response.data.data);
        that.$store.commit('savePrefer', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    handleCurrentChange(currentPage) {
      console.log("当前页", currentPage);
      let that = this;
      if (this.preferId != 0) {
        let a = new URLSearchParams;
        a.append("page", currentPage);
        a.append("preferId", this.preferId);
        a.append("sort", this.sort);
        if (this.needVip != 2) {
          a.append("needVip", this.needVip);
          axios.post("http://" + this.Api + "/api/Course/getCourseByNeedVipAndPreferId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
          }, function (err) {
            console.log(err);
          });
        } else {
          axios.post("http://" + this.Api + "/api/Course/getCourseByPreferId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
          }, function (err) {
            console.log(err);
          });
        }
      } else {
        let a = new URLSearchParams;
        a.append("page", currentPage);
        a.append("majorId", this.$route.query.majorId);
        a.append("sort", this.sort);
        if (this.needVip != 2) {
          a.append("needVip", this.needVip);
          axios.post("http://" + this.Api + "/api/Course/getCourseByMajorIdAndNeedVip?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
          }, function (err) {
            console.log(err);
          });
        } else {
          axios.post("http://" + this.Api + "/api/Course/getCourseByMajorId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
          }, function (err) {
            console.log(err);
          });
        }
      }
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
          }, function (err) {
            console.log(err);
          });
        } else {
          axios.post("http://" + this.Api + "/api/Course/getCourseByPreferId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
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
          }, function (err) {
            console.log(err);
          });
        } else {
          axios.post("http://" + this.Api + "/api/Course/getCourseByMajorId?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log("获取课程菜单", response);
            that.$store.commit('saveMenuCourseData', response.data.data);
          }, function (err) {
            console.log(err);
          });
        }
      }
      this.preferId = preferId;
      this.needVip = needVip;
      this.sort = sort;
      this.currentPage = 1;
    },
    Course(courseId) {
      this.$router.push({path: '/course', query: {courseId: courseId}});
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

.Course-content {
  display: flex;
  flex-wrap: wrap;
}

.Course-content-content {
  height: 220px;
  width: 18%;
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

.block {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
