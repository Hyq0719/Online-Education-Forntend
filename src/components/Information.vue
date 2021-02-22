<template>
  <div>
    <el-container v-if="isLogin">
      <el-aside>
        <img :src="information.studentPicUrl" alt="图片缺失">
        <h3>{{ information.nickName }}</h3>
      </el-aside>
      <el-main class="Information">
        <div class="information-title">
          <h2>个人信息</h2>
          <img src="../assets/Vip-light.jpg" alt="图片缺失"
               v-if="Date.parse(new Date()) <= Date.parse(information.vipDate)"
               @click="Vip">
          <p v-if="Date.parse(new Date()) <= Date.parse(information.vipDate)">持续至：{{ information.vipDate }}</p>
          <img src="../assets/Vip-dark.jpg" alt="图片缺失" v-if="Date.parse(new Date()) > Date.parse(information.vipDate)"
               @click="Vip">
        </div>
        <el-button @click="Change">编辑</el-button>
        <div class="clear"></div>
        <el-divider></el-divider>
        <el-form ref="form" :model="information" label-width="100px">
          <el-form-item label="昵称：">
            <h4>{{ information.nickName }}</h4>
          </el-form-item>
          <el-form-item label="性别：">
            <h4>{{ information.sex }}</h4>
          </el-form-item>
          <el-form-item label="学校：">
            <h4>{{ information.school }}</h4>
          </el-form-item>
          <el-form-item label="专业：">
            <h4>{{ information.majorContent }}</h4>
          </el-form-item>
          <el-form-item label="年级：">
            <h4>{{ information.grade }}</h4>
          </el-form-item>
          <el-form-item label="兴趣：">
            <div v-if="!IsEditPrefer">
              <h4 v-for="(item,index) in this.$store.state.StudentPreferences" v-bind:key="index">{{
                  item.prefer.preferContent
                }}</h4>
              <el-link type="primary" @click="EditPrefer()" :underline="false" icon="el-icon-edit">编辑偏好兴趣</el-link>
            </div>
            <div v-if="IsEditPrefer">
              <el-select v-model="selectedPrefer" placeholder="请选择你的兴趣偏好" multiple>
                <el-option-group
                    v-for="group in options"
                    :key="group.majorId"
                    :label="group.majorContent">
                  <el-option
                      v-for="item in group.prefer"
                      :key="item.preferId"
                      :label="item.preferContent"
                      :value="item.preferId">
                  </el-option>
                </el-option-group>
              </el-select>
              <el-link type="primary" @click="SavePrefer()" :underline="false" icon="el-icon-edit">保存偏好兴趣</el-link>
            </div>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <el-container v-if="isLoginTeacher">
      <el-aside>
        <img :src="informationTeacher.teacherPicUrl" alt="图片缺失">
        <h3>{{ informationTeacher.name }}</h3>
      </el-aside>
      <el-main class="Information">
        <div class="information-title">
          <h2>个人信息</h2>
        </div>
        <el-button @click="Change">编辑</el-button>
        <div class="clear"></div>
        <el-divider></el-divider>
        <el-form ref="form" :model="information" label-width="100px">
          <el-form-item label="姓名：">
            <h4>{{ informationTeacher.name }}</h4>
          </el-form-item>
          <el-form-item label="性别：">
            <h4>{{ informationTeacher.sex }}</h4>
          </el-form-item>
          <el-form-item label="学校：">
            <h4>{{ informationTeacher.school }}</h4>
          </el-form-item>
          <el-form-item label="专业：">
            <h4>{{ informationTeacher.majorContent }}</h4>
          </el-form-item>
          <el-form-item label="简介：">
            <h4>{{ informationTeacher.intro }}</h4>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Information",
  data() {
    return {
      options: this.$store.state.MajorPrefer,
      selectedPrefer: [],
      information: {
        grade: this.$store.state.userData.grade,
        major: this.$store.state.userData.major,
        majorContent: this.$store.state.userData.major.majorContent,
        majorId: this.$store.state.userData.majorId,
        nickName: this.$store.state.userData.nickName,
        password: this.$store.state.userData.password,
        school: this.$store.state.userData.school,
        sex: this.$store.state.userData.sex,
        userId: this.$store.state.userData.userId,
        vipDate: this.$store.state.userData.vipDate,
        wechatId: this.$store.state.userData.wechatId,
        studentPicUrl: this.$store.state.userData.studentPicUrl,
      },
      informationTeacher: {
        intro: this.$store.state.userData.intro,
        major: this.$store.state.userData.major,
        majorContent: this.$store.state.userData.major.majorContent,
        majorId: this.$store.state.userData.majorId,
        name: this.$store.state.userData.name,
        password: this.$store.state.userData.password,
        school: this.$store.state.userData.school,
        sex: this.$store.state.userData.sex,
        userId: this.$store.state.userData.userId,
        wechatId: this.$store.state.userData.wechatId,
        teacherPicUrl: this.$store.state.userData.teacherPicUrl,
        teacherStatus: this.$store.state.userData.teacherStatus,
      },
      isLogin: this.$store.state.isLogin,
      isLoginTeacher: this.$store.state.isLoginTeacher,
      IsEditPrefer: false,
    };
  },
  created() {
    if (this.isLogin) {
      this.StudentPreferences();
    }
  },
  methods: {
    Vip() {
      this.$router.push('/Vip');
    },
    Change() {
      this.$router.push('/Information/Change');
    },
    EditPrefer() {
      this.IsEditPrefer = !this.IsEditPrefer;
    },
    SavePrefer() {
      this.IsEditPrefer = !this.IsEditPrefer;
      let that = this;
      let JWT = this.$store.state.JWT;
      let a = new URLSearchParams;
      a.append("prefers", this.selectedPrefer);
      a.append("user_id", this.$store.state.userData.userId);
      axios.post("http://" + this.Api + "/api/Student/collectPreferences?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("修改偏好成功", response);
        that.selectedPrefer = [];
        let b = new URLSearchParams;
        b.append("user_id", that.$store.state.userData.userId);
        axios.post("http://" + that.Api + "/api/Student/findAllPreferences?" + b, null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JWT,
          }
        }).then(function (response) {
          console.log("获取学生偏好", response);
          for (let i = 0; i < response.data.data.length; i++) {
            that.selectedPrefer.push(response.data.data[i].prefer.preferId);
          }
          console.log("学生偏好Id", that.selectedPrefer);
          that.$store.commit('saveStudentPreferences', response.data.data);
        }, function (err) {
          console.log(err);
        });
      }, function (err) {
        console.log(err);
      });
    },
    StudentPreferences() {
      let a = new URLSearchParams;
      let JWT = this.$store.state.JWT;
      let that = this;
      a.append("user_id", this.$store.state.userData.userId);
      axios.post("http://" + this.Api + "/api/Student/findAllPreferences?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("获取学生偏好", response);
        for (let i = 0; i < response.data.data.length; i++) {
          that.selectedPrefer.push(response.data.data[i].prefer.preferId);
        }
        console.log("学生偏好Id", that.selectedPrefer);
        that.$store.commit('saveStudentPreferences', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.el-container {
  margin: 50px auto;
  width: 1100px;
}

.el-aside {
  border-radius: 10px;
  border: #C0C4CC 1px solid;
  color: #333;
  text-align: center;
  line-height: 20px;
  width: 300px;
}

.el-aside img {
  margin-top: 30px;
  width: 150px;
  height: 150px;
}

.el-aside h3 {
  margin-bottom: 10px;
}

.el-main {
  border-radius: 10px;
  border: #C0C4CC 1px solid;
  color: #333;
  text-align: left;
  line-height: 30px;
}

.information-title {
  float: left;
  display: flex;
  text-align: left;
}

.information-title img {
  cursor: pointer;
  margin: 20px;
  height: 30px;
  width: 30px;
}

.information-title p {
  font-size: 13px;
  margin: 20px auto;
}

.Information button {
  float: right;
  margin: 20px;
}

.Information h4 {
  margin: 0;
  font-weight: 400;
}

.clear {
  clear: both;
}
</style>
