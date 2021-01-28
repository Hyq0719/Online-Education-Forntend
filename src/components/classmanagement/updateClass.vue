<template>
  <div>施工中</div>
<!--  <el-container>-->
<!--    <el-header style="text-align: right; font-size: 12px">-->
<!--      <button>确认上传</button>-->
<!--    </el-header>-->

<!--    <el-main>-->
<!--      <el-form label-width="20%">-->
<!--        <el-form-item>-->
<!--          &lt;!&ndash;默认上传&ndash;&gt;-->
<!--          <span slot="label" class="emphasize">上传课程图片：</span>-->
<!--          <el-col class="normal" :span="24"></el-col>-->
<!--          <UploadImgTool></UploadImgTool>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          &lt;!&ndash;默认上传&ndash;&gt;-->
<!--          <span slot="label" class="emphasize">上传课程视频：</span>-->
<!--          <el-col class="normal" :span="24"></el-col>-->
<!--          <UploadFileTool></UploadFileTool>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <span slot="label" class="emphasize">上传课程介绍：</span>-->
<!--          <el-input-->
<!--              type="textarea"-->
<!--              :rows="6"-->
<!--              placeholder="请输入内容"-->
<!--              v-model="textarea">-->
<!--          </el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-main>-->
<!--  </el-container>-->
</template>

<script>

export default {
  name: "updateClass",
  data() {
    return {
      textarea: '',
      imgNum: 1,
      imgSize: 2048000
    };
  },
  components: {
    UploadImgTool: () => import('@/components/classmanagement/UploadlmgTool'),
    UploadFileTool: () => import('@/components/classmanagement/UploadFileTool'),
  },
}
</script>

<style scoped>
button {
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

button:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.emphasize {
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  font-size: 13px;
}

</style>
