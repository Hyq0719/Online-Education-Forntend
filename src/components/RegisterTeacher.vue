<template>
  <div class="login">
    <h2>老师注册</h2>
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号：" prop="phone">
        <el-input class="phone" v-model="ruleForm.phone" placeholder="请输入手机号" ref="phone"></el-input>
        <el-button class="code" :disabled="disabled" type="primary" @click="Code">{{ btnTxt }}</el-button>
      </el-form-item>
      <el-form-item label="验证码：">
        <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"
                  show-password></el-input>
      </el-form-item>
      <el-form-item label="请确认密码：" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"
                  show-password></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" @click="TeacherRegister">注册</el-button>
      </div>
      <div class="choose">
        <el-link :underline="false" @click="StudentRegister">我是学生</el-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RegisterTeacher",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      apiUrl: 'http://' + this.Api + '/api/Teacher/addTeacher',
      ruleForm: {
        pass: '',
        checkPass: '',
        phone: '',
        code: '',
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
        ],
      },
      disabled: false,
      time: 60,
      btnTxt: "发送验证码",
    };
  },
  methods: {
    //发送手机验证码倒计时
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.btnTxt = this.time + "s后重试";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btnTxt = "发送验证码";
        this.disabled = false;
      }
    },
    Code() {
      if (this.ruleForm.phone) {
        let that = this;
        let a = new URLSearchParams();
        a.append('phone_id', this.ruleForm.phone);
        axios.post('http://' + this.Api + '/api/Teacher/checkByPhoneId', a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log(response);
          that.time = 60;
          that.timer();
        }, function (err) {
          console.log(err);
        });
      } else {
        this.$refs.phone.focus();
      }
    },
    TeacherRegister() {
      let params = {
        code: this.ruleForm.code,
        password: this.ruleForm.checkPass,
        phone: this.ruleForm.phone,
      };
      let that = this;
      axios.post('http://' + this.Api + '/api/Teacher/addTeacher', params, {headers: {'Content-Type': 'application/json'}}).then(function (response) {
        console.log(response);
        if (response.data.code === 1000) {
          let a = {
            password: that.ruleForm.checkPass,
            phone: that.ruleForm.phone,
          };
          axios.post('http://' + that.Api + "/api/Teacher/loginByPassword", a, {headers: {'Content-Type': 'application/json'}}).then(function (response) {
            console.log(response);
            that.$router.push('/Classmanagement/blank');
            that.$store.commit('saveIsLoginTeacher');
            that.$store.commit('saveData', response.data.data);
            that.$store.commit('saveJWT', response.headers.authorization);
            if (!response.data.data.teacherPicUrl) {
              that.$store.commit('saveAvatarTeacher');
            }
            if (!response.data.data.major) {
              that.$store.commit('saveMajor');
            }
          }, function (err) {
            console.log(err);
          });
        }
      }, function (err) {
        console.log(err);
      });
    },
    StudentRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login {
  width: 450px;
  margin: 70px auto;
  border: 1px solid green;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 30px blue;
}

.login-title {
  text-align: center;
}

.el-form-item {
  margin: 20px 0 40px 0;
}

.phone {
  width: 70%;
  float: left;
}

.code {
  width: 30%;
  float: left;
  text-align: center;
}

.choose {
  float: right;
}
</style>
