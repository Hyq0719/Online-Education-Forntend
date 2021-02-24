<template>
  <div style="height: 1000px"></div>
</template>

<script>

import axios from "axios";

export default {
  name: "Index",
  created() {
    this.index();
  },
  methods: {
    index() {
      //JWT登录
      if (this.$store.state.JWT) {
        let that = this;
        axios.post("http://" + this.Api + "/api/Login/loginByJwt", null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.JWT,
          }
        }).then(function (response) {
          console.log("登录成功", response);
          if (response.data.data.role == "student") {
            that.$store.commit('saveIsLogin');
            that.$store.commit('saveData', response.data.data.info);
            that.$router.push('/main');
            if (response.data.data.info.studentPicUrl == null) {
              that.$store.commit('saveAvatar');
            }
            if (response.data.data.info.major == null) {
              that.$store.commit('saveMajor');
            }
          } else {
            that.$store.commit('saveIsLoginTeacher');
            that.$store.commit('saveData', response.data.data.info);
            that.$router.push('/Classmanagement/blank');
            if (response.data.data.info.teacherPicUrl == null) {
              that.$store.commit('saveAvatarTeacher');
            }
            if (response.data.data.info.major == null) {
              that.$store.commit('saveMajor');
            }
          }
        }, function (err) {
          console.log(err);
        });
      } else {
        this.$router.push('/main');
      }
    },
  },
};
</script>

<style scoped>

</style>
