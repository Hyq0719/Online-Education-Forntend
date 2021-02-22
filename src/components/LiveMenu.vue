<template>
  <div class="Live">
    <div class="Live-title">
      <h2>
        全部直播
      </h2>
    </div>
    <div class="FutureAndNow">
      <el-radio v-model="radioFutureAndNow" @click.native="LiveChoose($event,0)" label="1">全部直播</el-radio>
      <el-radio v-model="radioFutureAndNow" @click.native="LiveChoose($event,1)" label="2">即将直播</el-radio>
      <el-radio v-model="radioFutureAndNow" @click.native="LiveChoose($event,2)" label="3">正在直播</el-radio>
    </div>
    <div class="Course-content">
      <div class="Course-content-content" v-for="(item,index) in this.$store.state.MenuLiveData.list"
           v-bind:key="index" @click="Live(item.liveId)">
        <div class="Course-content-content-img">
          <img :src="item.livePicUrl" alt="图片缺失">
        </div>
        <h4>{{ item.liveName }}</h4>
        <h6>{{ item.intro }}</h6>
        <h6>直播时间：{{ item.liveDate }}</h6>
      </div>
    </div>
    <div class="block">
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="this.$store.state.MenuLiveData.total_element">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LiveMenu",
  data() {
    return {
      radioFutureAndNow: '1',
      currentPage: 1,
      sort: 0,
    };
  },
  watch: {
    '$route'(to, from) {
      this.initLiveMenu();
    }
  },
  created() {
    this.initLiveMenu();
  },
  methods: {
    handleCurrentChange(currentPage) {
      console.log("当前页", currentPage);
      let that = this;
      let a = new URLSearchParams;
      a.append("page", currentPage);
      if (this.sort == 0) {
        axios.get("http://" + this.Api + "/api/Live/findAllValidLive?" + a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log("获取全部直播", response);
          that.$store.commit('saveMenuLiveData', response.data.data);
        }, function (err) {
          console.log(err);
        });
      } else if (this.sort == 1) {
        axios.get("http://" + this.Api + "/api/Live/findAllValidLiveFuture?" + a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log("获取即将直播", response);
          that.$store.commit('saveMenuLiveData', response.data.data);
        }, function (err) {
          console.log(err);
        });
      } else {
        axios.get("http://" + this.Api + "/api/Live/findAllValidLiveNow?" + a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log("获取正在直播", response);
          that.$store.commit('saveMenuLiveData', response.data.data);
        }, function (err) {
          console.log(err);
        });
      }
    },
    initLiveMenu() {
      let that = this;
      let a = new URLSearchParams;
      a.append("page", 1);
      axios.get("http://" + this.Api + "/api/Live/findAllValidLive?" + a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取直播菜单", response);
        that.$store.commit('saveMenuLiveData', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    Live(liveId) {
      this.$router.push({path: '/live', query: {courseId: liveId}});
    },
    LiveChoose(e, sort) {
      if (e.target.tagName === 'INPUT') return // 因为原生click事件会执行两次，第一次在label标签上，第二次在input标签上，故此处理
      let that = this;
      let a = new URLSearchParams;
      a.append("page", 1);
      if (sort == 0) {
        axios.get("http://" + this.Api + "/api/Live/findAllValidLive?" + a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log("获取全部直播", response);
          that.$store.commit('saveMenuLiveData', response.data.data);
        }, function (err) {
          console.log(err);
        });
      } else if (sort == 1) {
        axios.get("http://" + this.Api + "/api/Live/findAllValidLiveFuture?" + a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log("获取即将直播", response);
          that.$store.commit('saveMenuLiveData', response.data.data);
        }, function (err) {
          console.log(err);
        });
      } else {
        axios.get("http://" + this.Api + "/api/Live/findAllValidLiveNow?" + a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log("获取正在直播", response);
          that.$store.commit('saveMenuLiveData', response.data.data);
        }, function (err) {
          console.log(err);
        });
      }
      this.sort = sort;
    },
  },
};
</script>

<style scoped>
.Live {
  margin: auto;
  width: 1100px;
}

.Live-title {
  margin: 50px 20px;
  text-align: left;
}

.FutureAndNow {
  text-align: left;
  margin: 20px;
}

.Course-content {
  display: flex;
  flex-wrap: wrap;
}

.Course-content-content {
  width: 18%;
  cursor: pointer;
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  margin: 10px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

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

.Course-content-content:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

a {
  text-decoration: none;
  color: #1c1f21;
}

.block {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
