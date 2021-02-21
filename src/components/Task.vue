<template>
  <div class="task">
    <div class="task-title">
      <h2>作业标题XXXXXXXXXX</h2>
      <el-button icon="el-icon-caret-left" type="text" @click="backToTaskMenu">返回</el-button>
    </div>
    <el-divider></el-divider>
    <div class="task-details">
      <p>题量：XX | 满分：XXX分 | 创建者：XXX | 截止时间：XXXX-XX-XX</p>
    </div>
    <div class="task-homework">
      <div class="task-homework-title">
        <h4>X、XX题</h4>
        <h6>（共X题，X分）</h6>
      </div>
      <div class="task-homework-content">
        <div class="task-homework-content-title">
          <h3>X</h3>
        </div>
        <div class="task-homework-content-content">
          <p>请提交实验五实验报告。注意：实验报告文件名必须为：学号+姓名</p>
        </div>
      </div>
    </div>
    <div class="task-answer">
      <h4>请填写答案</h4>
      <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          placeholder="请输入内容"
          v-model="textarea">
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      textarea: '',
    }
  },
  methods: {
    backToTaskMenu() {
      this.$router.push('/taskMenu');
    }
  },
};
</script>

<style scoped>
.task {
  width: 1000px;
  margin: 20px auto;
}

.task-title {
  display: flex;
  justify-content: space-between;
}

.task-details {
  display: flex;
  text-align: left;
  font-size: 12px;
}

.task-homework {
  margin: 30px auto;
}

.task-homework-title {
  display: flex;
  text-align: left;
}

.task-homework-content {
  display: flex;
  text-align: left;
}

.task-homework-content-title {
  margin: 20px;
}

.task-homework-content-content {
  margin: 20px;
}

.task-answer {
  text-align: left;
}
</style>
