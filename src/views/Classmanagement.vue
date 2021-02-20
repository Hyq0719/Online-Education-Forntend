<template>
  <div>
    <Sidebar></Sidebar>
    <Header>
      <div></div>
    </Header>
    <classmanagement></classmanagement>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import classmanagement from "@/components/classmanagement/classmanagement";
import Footer from '../components/Footer';
import axios from "axios";

export default {
  name: "Classmanagement",
  components: {
    Header,
    Sidebar,
    classmanagement,
    Footer,
  },
  mounted() {

      let that = this;
      //获取专业+偏好
      axios.get("http://" + this.Api + "/api/Major/findAllMajor", {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(async function (response) {
        console.log("获取所有专业", response);
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
    }, //加载专业类型
};
</script>

<style scoped>

</style>
