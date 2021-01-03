<template>
  <div class="login">
    <h2>老师注册</h2>
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="真实姓名：">
        <el-input v-model="ruleForm.name" placeholder="请输入真实姓名"></el-input>
      </el-form-item>

        <el-form-item label="密码：" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码" show-password></el-input>
  </el-form-item>

  <el-form-item label="请确认密码：" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码" show-password></el-input>
  </el-form-item>

  <el-form-item label="手机号：">
        <el-input class="phone" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
        <el-button class="code" type="primary">发送验证码</el-button>
      </el-form-item>

      <div>
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </div>

      <div class="choose">
              <el-link :underline="false" @click="StudentRegister">我是学生</el-link>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "registerteacher",
  data () {
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
      ruleForm: {
          name:'',
          pass: '',
          checkPass: '',
          phone:'',
        },

      rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],

          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },

      radio: true,
    };
  },
  methods: {
    onSubmit () {
      this.$router.push("/");
    },
    StudentRegister() {
      this.$router.push("/register");
    }
  }
}
</script>

<style scoped>
.login {
  width: 450px;
  margin: 200px auto;
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

.phone{
    width:70%;
    float: left;
}

.code{
    width:30%;
    float:left;
    text-align: center;
}

.choose{
    float: right;
}
</style>
