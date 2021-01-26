<template>
  <div class="login">
    <h2>学生注册</h2>
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称：">
        <el-input v-model="ruleForm.name" placeholder="请输入昵称"></el-input>
      </el-form-item>

      <el-form-item label="密码：" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"
                  show-password></el-input>
      </el-form-item>

      <el-form-item label="请确认密码：" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"
                  show-password></el-input>
      </el-form-item>

      <el-form-item label="手机号：">
        <el-input class="phone" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
        <el-button class="code" type="primary">发送验证码</el-button>
      </el-form-item>

      <div>
        <el-button type="primary" @click="StudentRegister">注册</el-button>
      </div>

      <div class="choose">
        <el-link :underline="false" @click="TeacherRegister">我是老师</el-link>
      </div>


    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Register",
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
      apiUrl: 'http://' + this.Api + '/api/Student/addStudent',
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
        phone: '',
      },

      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],

        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      },

      radio: true,
    };
  },
  methods: {
    StudentRegister() {
      let a = new URLSearchParams();
      a.append('password', this.ruleForm.checkPass);
      a.append('phone_id', this.ruleForm.phone);
      let that = this;
      axios.post('http://' + this.Api + '/api/Student/addStudent', a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log(response);
        if (response.data.code === 1000) {
          that.$router.push('/login');
          that.$store.commit('saveIsRegister');
        }
      }, function (err) {
        console.log(err);
      })
    },
    TeacherRegister() {
      this.$router.push("/register/teacher");
    }
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
