<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <button class="headerbutton" @click="open">确认上传</button>
    </el-header>

    <el-main>
      <div style="width: 800px">
        <el-form label-width="160px">
          <el-form-item label="课程ID号" style="width: 300px">
            <el-input v-model="form.name"
                      placeholder="请输入内容"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="章节号" style="width: 200px">
            <el-input v-model="form.section"
                      placeholder="请输入数字"
                      maxlength="2"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="章节名称" style="width: 300px">
            <el-input v-model="form.sectionname"
                      placeholder="请输入内容"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="视频名称" style="width: 300px">
            <el-input v-model="form.videoname"
                      placeholder="请输入内容"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="传课程视频" style="width: 300px">
            <el-col class="normal" :span="24">请上传一个视频</el-col>
            <div style="align-items: center">
              <UploadFileTool :fileNum="fileNum"></UploadFileTool>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: "buildClass",
  data() {
    return {
      form: {
        name: '',
        section: 1,
        sectionname: '',
        videoname: '',
      },
      fileNum: 1,
    };
  },
  components: {
    // UploadImgTool: () => import('@/components/classmanagement/UploadlmgTool'),
    UploadFileTool: () => import('@/components/classmanagement/UploadFileTool'),
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
    },
  }
}
</script>

<style scoped>
.headerbutton {
  cursor: pointer;
  float: right;
  color: #fff;
  background: #00a1d6;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 42px;
  text-align: center;
  width: 90px;
  border-radius: 4px;
  margin: 8px 0;
  border: none;
}

.el-tag + .el-tag {
  margin-left: 10px;
}


</style>
