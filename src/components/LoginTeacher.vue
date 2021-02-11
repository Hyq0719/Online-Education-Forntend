<template>
  <div class="login">
    <div>
      <el-button @click="Student">我是学生</el-button>
      <el-button @click="Teacher">我是老师</el-button>
    </div>
    <h2>老师登录</h2>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="真实姓名：">
        <el-input v-model="form.name" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" @click="Login">登录</el-button>
        <el-button @click="Register">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import {MessageBox} from 'element-ui'

export default {
  name: "LoginTeacher",
  data() {
    return {
      apiUrl: 'http://' + this.Api + '/api/Teacher/loginByPassword',
      form: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    Login() {
      let b = new URLSearchParams();
      let params = {
        password: this.form.password,
        phone: this.form.name,
      }
      let that = this;
      axios.post('http://' + that.Api + "/api/Teacher/loginByPassword", params, {headers: {'Content-Type': 'application/json'}}).then(function (response) {
        console.log(response);
        if (response.data.code === 1000) {
          that.$router.push('/Classmanagement');
          that.$store.commit('saveIsLoginTeacher');
          that.$store.commit('saveData', response.data.data);
          that.$store.commit('saveJWT', response.headers.authorization);
          if (!response.data.data.teacherPicUrl) {
            that.$store.commit('saveAvatarTeacher')
          }
          if (!response.data.data.major) {
            that.$store.commit('saveMajor')
          }
          let c = that.$store.state.userData.userId
          b.append("teacherId", c);
          b.append("sort", 1);
          b.append("page", 1);
          axios.post('http://' + that.Api + "/api/Course/getCourseByTeacherId", b,
              {headers:{
                  'Authorization': that.$store.state.JWT,
                }}
          ).then(function (res) {
            console.log(res);
            if (response.data.code === 1000) {
              that.$store.commit('saveTeacherClassData', res.data.data)
            }
          })
        } else if (response.data.code === 2002) {
          MessageBox.alert('用户不存在')
        } else if (response.data.code === 2003) {
          MessageBox.alert('密码错误')
        }
      }, function (err) {
        console.log(err);
      })
    },
    Register() {
      this.$router.push('/Register')
    },
    Student() {
      this.$router.push('/Login')
    },
    Teacher() {
      this.$router.push('/Login/Teacher')
    }
  },
};
</script>

<style scoped>
.login {
  width: 450px;
  margin: 120px auto;
  border: 1px solid blue;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 30px green;
}

.login-title {
  text-align: center;
}

.el-form-item {
  margin: 20px 0 40px 0;
}

.error2002 {
  text-align: left;
  color: red;
}

.error2003 {
  text-align: left;
  color: red;
}
</style>
