<template>
  <div></div>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  created() {
    this.Login();
  },
  methods: {
    Login() {
      // console.log(this.$store.state.JWT);
      if (!this.$store.state.isLogin && !this.$store.state.isLoginTeacher && this.$store.state.JWT) {
        let that = this;
        axios.post("http://" + this.Api + "/api/Login/loginByJwt", null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.JWT,
          }
        }).then(function (response) {
          that.$router.push('/main');
          if (response.data.data.teacherPicUrl != null) {
            that.$store.commit('saveIsLoginTeacher');
          } else {
            that.$store.commit('saveIsLogin');
          }
          that.$store.commit('saveData', response.data.data)
        }, function (err) {
          console.log(err);
        })
      } else {
        this.$router.push('/main');
      }
    },
  },
}
</script>

<style scoped>

</style>
