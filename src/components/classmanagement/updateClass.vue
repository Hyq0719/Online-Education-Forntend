<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <button class="headerbutton" @click="open">确认上传</button>
    </el-header>

    <el-main >
      <div style="width: 800px">
        <el-form label-width="20%">
          <el-form-item label="课程ID号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="章节号">
            <el-input v-model="form.section"></el-input>
          </el-form-item>
          <el-form-item>
            <!--默认上传-->
            <span slot="label" class="emphasize">上传课程封面：</span>
            <el-col class="normal" :span="24"> 请注意课程封面只能上传一张图片，且上传图片的大小最大为2MB</el-col>
            <UploadImgTool></UploadImgTool>
          </el-form-item>
          <el-form-item>
            <!--默认上传-->
            <span slot="label" class="emphasize">上传课程视频：</span>
            <el-col class="normal" :span="24">请上传视频用于审核</el-col>
            <div style="align-items: center">
            <UploadFileTool></UploadFileTool>
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
        section:1,
      },
      imgNum: 1,
      imgSize: 2048000
    };
  },
  components: {
    UploadImgTool: () => import('@/components/classmanagement/UploadlmgTool'),
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

.emphasize {
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  font-size: 13px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}


</style>
