<template>
  <div>
    <el-container v-if="isLogin">
      <el-aside width="300px">
        <img :src="information.studentPicUrl" alt="图片缺失">
        <h3>{{ information.nickName }}</h3>
        <h6>ID:{{ information.userId }}</h6>
      </el-aside>
      <el-main class="Information">
        <h2>个人信息</h2>
        <el-button @click="Change">编辑</el-button>
        <div class="clear"></div>
        <el-divider></el-divider>
        <el-form ref="form" :model="information" label-width="100px">
          <el-form-item label="昵称：">
            <h4>{{ information.nickName }}</h4>
          </el-form-item>
          <el-form-item label="手机号：">
            <h4>{{ information.phoneId }}</h4>
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
        </el-form>
      </el-main>
    </el-container>
    <el-container v-if="isLoginTeacher">
      <el-aside width="300px">
        <img :src="informationTeacher.teacherPicUrl" alt="图片缺失">
        <h3>{{ informationTeacher.name }}</h3>
        <h6>ID:{{ informationTeacher.userId }}</h6>
      </el-aside>
      <el-main class="Information">
        <h2>个人信息</h2>
        <el-button @click="Change">编辑</el-button>
        <div class="clear"></div>
        <el-divider></el-divider>
        <el-form ref="form" :model="information" label-width="100px">
          <el-form-item label="姓名：">
            <h4>{{ informationTeacher.name }}</h4>
          </el-form-item>
          <el-form-item label="手机号：">
            <h4>{{ informationTeacher.phoneId }}</h4>
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
      informationTeacher: {
        major: this.$store.state.userData.major,
        majorContent: this.$store.state.userData.major.majorContent,
        majorId: this.$store.state.userData.majorId,
        name: this.$store.state.userData.name,
        password: this.$store.state.userData.password,
        phoneId: this.$store.state.userData.phoneId,
        school: this.$store.state.userData.school,
        sex: this.$store.state.userData.sex,
        userId: this.$store.state.userData.userId,
        wechatId: this.$store.state.userData.wechatId,
        teacherPicUrl: this.$store.state.userData.teacherPicUrl,
        teacherStatus: this.$store.state.userData.teacherStatus,
      },
      isLogin: this.$store.state.isLogin,
      isLoginTeacher: this.$store.state.isLoginTeacher,
    }
  },
  methods: {
    Change() {
      this.$router.push('/Information/Change')
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

.Change {
  float: right;
}

.Information h4 {
  margin: 0;
  font-weight: 400;
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
