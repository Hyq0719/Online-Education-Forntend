<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <img src="../assets/studentheader.jpg" alt="图片缺失">
        <h3>{{ information.nickName }}</h3>
        <h6>ID:{{ information.userId }}</h6>
      </el-aside>
      <el-main class="Information">
        <h2>个人信息</h2>
        <el-button type="primary" @click="ChangeInformation">修改完成</el-button>
        <div class="clear"></div>
        <el-divider></el-divider>
        <el-form ref="form" :model="information" label-width="100px">
          <el-form-item label="昵称：">
            <el-input v-model="information.nickName"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-input v-model="information.sex"></el-input>
          </el-form-item>
          <el-form-item label="学校：">
            <el-input v-model="information.school"></el-input>
          </el-form-item>
          <el-form-item label="年级：">
            <el-input v-model="information.grade"></el-input>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InformationChange",
  data() {
    return {
      information: {
        grade: this.$store.state.userData.grade,
        major: this.$store.state.userData.major,
        majorContent: this.$store.state.userData.major.majorContent,
        majorId: this.$store.state.userData.majorId,
        nickName: this.$store.state.userData.nickName,
        password: this.$store.state.userData.password,
        phoneId: this.$store.state.userData.phoneId,
        school: this.$store.state.userData.school,
        sex: this.$store.state.userData.sex,
        userId: this.$store.state.userData.userId,
        vip: this.$store.state.userData.vip,
        wechatId: this.$store.state.userData.wechatId,
        studentPicUrl: this.$store.state.userData.studentPicUrl,
      },
    }
  },
  methods: {
    ChangeInformation() {
      let that = this;
      let params = {
        grade: this.information.grade,
        majorId: this.information.majorId,
        nickname: this.information.nickName,
        picUrl: this.information.studentPicUrl,
        school: this.information.school,
        sex: this.information.sex,
      }
      let a = new URLSearchParams();
      a.append('user_id', this.information.userId);
      axios.post("http://" + this.Api + "/api/Student/completeStudentById?" + a, params, {headers: {'Content-Type': 'application/json'}}).then(function (response) {
        console.log(response);
        axios.post("http://" + that.Api + "/api/Student/getStudentbyId?" + a).then(function (res) {
          console.log(res);
          that.$router.push('/information');
          that.$store.commit('saveData', res.data.data);
        }, function (err) {
          console.log(err);
        })
      }, function (err) {
        console.log(err);
      })
    },
  }
}
</script>

<style scoped>
.el-container {
  margin: 50px 100px;
}

.el-aside {
  border-radius: 10px;
  border: #C0C4CC 1px solid;
  color: #333;
  text-align: center;
  line-height: 20px;
}

.el-aside img {
  margin-top: 30px;
  width: 150px;
  height: 150px;
}

.el-aside h3 {
  margin-bottom: 10px;
}

.el-aside h6 {
  margin-top: 10px;
}

.el-main {
  border-radius: 10px;
  border: #C0C4CC 1px solid;
  color: #333;
  text-align: left;
  line-height: 30px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-input {
  width: 50%;
}

.Information h2 {
  float: left;
}

.Information button {
  float: right;
  margin: 20px;
}

.clear {
  clear: both;
}
</style>
