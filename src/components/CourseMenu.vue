<template>
  <div class="line">
    <div class="WholeCourse">
      <h3>
        全部课程
      </h3>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="25">
      <el-col :span="6" v-for="(item,index) in this.$store.state.courseData" v-bind:key="index">
        <router-link to="/course" @click.native="Chapter(item.courseId)">
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
      course: [
        {
          src: require('../assets/course1.webp'),
        },
      ],
    }
  },
  methods: {
    Chapter(courseId) {
      console.log(courseId);
      let that = this;
      let a = new URLSearchParams();
      a.append('courseId', courseId);
      axios.post("http://" + this.Api + "/api/Course/getCourseDisplay", a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log(response.data);
        that.$store.commit('saveChapterData', response.data.data)
      }, function (err) {
        console.log(err);
      })
    },
  }
}
</script>

<style scoped>
.grid-content:hover {
  background-color: #d3dce6;
  text-decoration: none;
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
  height: 220px;
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

/*.grid-content h5 {*/
/*  margin: 5px;*/
/*}*/

.grid-content h6 {
  margin: 10px;
  margin-bottom: 20px;
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
