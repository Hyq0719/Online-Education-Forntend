<template>
  <div>

    <div class="title" style="overflow: hidden;width: 500px;margin-top: 20px" >
      <h3 style="display: inline">
        修改视频
      </h3>
      <el-button type="primary" class="headerbutton" @click="closed" :loading="loading">
        {{ loading ? '提交中 ...' : '确认修改' }}
      </el-button>
      <el-divider></el-divider>
    </div>

    <el-main>
      <div style="width: 450px">
        <el-form label-width="100px">
          <el-form-item label="视频号" style="width: 200px">
            <el-input v-model="form.name"
                      placeholder="请输入内容"
                      maxlength="2"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="视频名称" style="width: 300px">
            <el-input v-model="form.videoname"
                      placeholder="请输入内容"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="上传课程视频" style="width: 300px">
            <el-col class="normal" :span="24">请上传一个视频</el-col>
            <div style="align-items: center">

            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>

export default {
  name: "editVideo",
  data() {
    return {
      form: {
        name: '',
        section: 1,
        sectionname: '',
        videoname: '',
      },
      fileNum: 1,
      loading:false,
    };
  },

  methods: {
    open() {         //弹窗
      this.$alert('更新成功，待审核', '提示', {
        confirmButtonText: '确定',
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${action}`
        //   });
        // }
      });
      this.$emit('close',false);
    },
    closed(){
      this.$alert('上传成功，待审核', '提示', {
        confirmButtonText: '确定',
      });
      this.$emit('close',false);
    },
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
  }
}
</script>

<style scoped>
.headerbutton {
  cursor: pointer;
  float: right;
  margin-top: 12px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.title {
  margin: 10px 30px;
  text-align: left;
}

.headerbutton {
  cursor: pointer;
  float: right;
  margin-top: 0px;
}
</style>
