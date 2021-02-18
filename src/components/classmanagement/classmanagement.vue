<template>
  <el-container style="height: 700px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238,241,246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>课程管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <router-link :to="{name:'classManagementClass',params:{id:1}}">课程列表</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{name:'commentClass',params:{id:1}}">课程评论</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
              <router-link :to="{name:'liveManagement'}">直播管理</router-link>
            </el-menu-item>

          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <classbread :breadcrumb=breadcrumb>
        </classbread>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<style scoped>

.el-carousel__item img {
  height: 100%;
  width: 100%;
}

</style>

<script>
import classbread from "@/components/classmanagement/classbread";
import axios from "axios";

export default {
  name: 'Classmanagement',
  components: {
    classbread
  },
  methods: {
    async getCourse() {
      let that = this;
      let b = new URLSearchParams();
      let c = that.$store.state.userData.userId;
      b.append("teacherId", c);
      b.append("sort", 1);
      b.append("page", 1);
      await axios.post('http://' + that.Api + "/api/Course/getCourseByTeacherId", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
        console.log("老师的课程信息", res);
        if (res.data.code === 1000) {
          that.$store.commit('saveTeacherClassData', res.data.data);
        } },function (err) {
        console.log(err);
      }
    );
  },
}
,
mounted:function () {
  this.getCourse();
}
,
computed: {
  breadcrumb: function () {
    return this.$store.state.breadcrumb
  }
,
}
}
;
</script>

<style scoped>
a:hover {
  text-decoration: none;
  color: #ffd04b;
}

a {
  text-decoration: none;
  color: #99a9bf;
}
</style>
