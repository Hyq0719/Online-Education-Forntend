<template>
  <div class="Main">
    <Sidebar></Sidebar>
    <Header :key="$store.state.isLogin||$store.state.isLoginTeacher"></Header>
    <Nav1></Nav1>
    <nav2></nav2>
  </div>
</template>

<script>
import Header from '../components/Header';
import Nav1 from '../components/Nav1';
import Sidebar from '../components/Sidebar';
import Nav2 from '../components/Nav2';
import axios from "axios";

export default {
  name: "Main",
  components: {
    Header,
    Nav1,
    Sidebar,
    Nav2,
  },
  created() {
    this.main();
  },
  methods: {
    main() {
      let that = this;
      //获取专业+偏好
      axios.get("http://" + this.Api + "/api/Major/findAllMajor", {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(async function (response) {
        let MajorPrefer = response.data.data;
        for (let i in MajorPrefer) {
          // console.log(MajorData[i]);
          let a = new URLSearchParams;
          a.append("major_id", MajorPrefer[i].majorId);
          await axios.post("http://" + that.Api + "/api/Major/getPreferByMajor?" + a, null, {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(function (response) {
            MajorPrefer[i].prefer = response.data.data;
          }, function (err) {
            console.log(err);
          });
        }
        console.log("获取专业＋子专业", MajorPrefer);
        that.$store.commit('saveMajorAndPrefer', MajorPrefer);
      }, function (err) {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.Main{
  background-image: url("../assets/backPic1.webp");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 60px;
}
</style>
