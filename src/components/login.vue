<template>
  <div class="login">
      <div>
          <el-radio v-model="radio" label="1" border>我是学生</el-radio>
          <el-radio v-model="radio" label="2" border>我是老师</el-radio>
      </div>
      
      <h2>登录</h2>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="账号/昵称：">
        <el-input v-model="form.name" placeholder="请输入账号/昵称"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
      </el-form-item>

      <div>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="register">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      radio:'1',
    };
  },
  methods: {
    login() {
      this.$router.push('/main')
    },
    register() {
      this.$router.push('/main/register')
    }
  },
};
</script>

<style scoped>
.login {
  width: 450px;
  margin: 200px auto;
  border: 1px solid blue;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 30px green;
}

.login-title {
  text-align: center;
}
.el-form-item{
    margin:20px 0 40px 0;
}
</style>