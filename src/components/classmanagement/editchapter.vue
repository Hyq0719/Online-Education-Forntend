<template>
  <div>

    <div class="title" style="overflow: hidden;width: 500px;margin-top: 20px" >
      <h3 style="display: inline">
        修改章节
      </h3>
      <el-button type="primary" class="headerbutton" @click="closed" :loading="loading">
        {{ loading ? '提交中 ...' : '确认修改' }}
      </el-button>
      <el-divider></el-divider>
    </div>

    <el-main>
      <div style="width: 500px">
        <el-form label-width="160px">
          <el-form-item label="章节号" style="width: 300px">
            <el-input
                      placeholder="请输入内容"
                      maxlength="10"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="章节名称" >
            <el-input
                show-word-limit
                maxlength="20"
                placeholder="请输入内容"
                >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-main>

  </div>
</template>

<script>

export default {
  name: "chapter",
  data() {
    return {
      loading:false,
      }
  },
  methods: {
    open() {         //弹窗
      this.$alert('上传成功，课程号为XXXXX，待审核', '提示', {
        confirmButtonText: '确定',
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${action}`
        //   });
        // }
      });
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {
          });
    },
    closed(){
      this.$alert('上传成功，待审核', '提示', {
        confirmButtonText: '确定',
      });
      this.$emit('close',false);
    },
  },
}
</script>

<style scoped>

.headerbutton {
  cursor: pointer;
  float: right;
  margin-top: 0px;
}


.emphasize {
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  font-size: 13px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.el-drawer__header{
  margin-bottom: 10px;
}
.title {
  margin: 10px 30px;
  text-align: left;
}
</style>
