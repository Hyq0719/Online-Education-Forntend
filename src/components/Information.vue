<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <img src="../assets/studentheader.jpg" alt="图片缺失">
        <h3>游客1234567890</h3>
        <h6>ID:1234567890</h6>
      </el-aside>
      <el-main>
        <h2>个人信息</h2>
        <el-divider></el-divider>
        <el-form ref="form" :model="information" label-width="100px">
          <el-form-item label="昵称：">
            <el-input v-model="information.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="information.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-input v-model="information.sex"></el-input>
          </el-form-item>
          <el-form-item label="学校：">
            <el-input v-model="information.school"></el-input>
          </el-form-item>
          <el-form-item label="专业：">
            <el-input v-model="information.major"></el-input>
          </el-form-item>
          <el-form-item label="年级：">
            <el-input v-model="information.grade"></el-input>
          </el-form-item>
          <el-form-item label="城市：">
            <el-input v-model="information.city"></el-input>
          </el-form-item>
          <el-form-item label="个性签名：">
            <el-input v-model="information.signature"></el-input>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Information",
  data() {
    return {
      information: {
        name: '',
        phone: '',
        sex: '',
        school: '',
        major: '',
        grade: '',
        city: '',
        signature: '',
      }
    }
  },
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
</style>
