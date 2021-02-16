<template>
  <div></div>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  created() {
    this.index();
  },
  methods: {
    async index() {
      let that = this;
      //获取偏好
      let major_id = new URLSearchParams;
      major_id.append("major_id", 1);
      await axios.post("http://" + this.Api + "/api/Major/getPreferByMajor?" + major_id, null, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function (response) {
        that.$store.commit('savePrefer', response.data.data);
      }, function (err) {
        console.log(err);
      });
      //获取专业+偏好
      await axios.get("http://" + this.Api + "/api/Major/findAllMajor", {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(async function (response) {
        console.log(response);
        let AllMajor = [];
        let MajorData = response.data.data;
        for (let i = 0; i < MajorData.length; i++) {
          // console.log(MajorData[i]);
          let a = new URLSearchParams;
          a.append("major_id", MajorData[i].majorId);
          await axios.post("http://" + that.Api + "/api/Major/getPreferByMajor?" + a, null, {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(function (response) {
            // console.log(response);
            let Major = {
              majorId: MajorData[i].majorId,
              majorContent: MajorData[i].majorContent,
              prefer: [],
            };
            let PreferData = response.data.data;
            for (let j = 0; j < PreferData.length; j++) {
              // console.log(PreferData[j]);
              Major.prefer.push(PreferData[j]);
            }
            // console.log(Major);
            AllMajor.push(Major);
            // console.log(AllMajor);
          }, function (err) {
            console.log(err);
          });
        }
        that.$store.commit('saveAllMajor', AllMajor);
      }, function (err) {
        console.log(err);
      });
      //JWT登录
      if (!this.$store.state.isLogin && !this.$store.state.isLoginTeacher && this.$store.state.JWT) {
        let that = this;
        await axios.post("http://" + this.Api + "/api/Login/loginByJwt", null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.JWT,
          }
        }).then(function (response) {
          if (response.data.data.teacherPicUrl != null) {
            that.$store.commit('saveIsLoginTeacher');
          } else {
            that.$store.commit('saveIsLogin');
          }
          that.$store.commit('saveData', response.data.data);
        }, function (err) {
          console.log(err);
        });
      }
      //跳转首页
      await this.$router.push('/main');
    },
  },
};
</script>

<style scoped>

</style>
