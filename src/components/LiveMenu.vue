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
      <Menu v-for="(item,index) in this.$store.state.MenuLiveData.list"
            v-bind:key="index" @click.native="Live(item.liveId)"
            :name="item.liveName" :teacherName="item.teacher.name" :liveDate="item.liveDate"
            :coursePic="item.livePicUrl" style="width: 18%"></Menu>
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
import Menu from "@/components/childcpn/Menu";

export default {
  name: "LiveMenu",
  components: {
    Menu,
  },
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
      this.$router.push({path: '/live', query: {liveId: liveId}});
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

.block {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
