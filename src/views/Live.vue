<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Live></Live>
    <LiveIntroduce></LiveIntroduce>
  </div>
</template>

<script>
import Header from '../components/Header';
import Live from '../components/Live';
import LiveIntroduce from "../components/LiveIntroduce";
import Sidebar from '../components/Sidebar';
import axios from "axios";

export default {
  components: {
    Header,
    Live,
    LiveIntroduce,
    Sidebar,
  },
  created() {
    this.Live();
  },
  methods:{
    Live() {
      let that = this;
      let a = new URLSearchParams();
      a.append('liveId', this.$route.query.liveId);
      axios.post("http://" + this.Api + "/api/Live/findLiveById?" + a, null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取直播信息",response.data.data);
        that.$store.commit('saveLiveAllData', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
