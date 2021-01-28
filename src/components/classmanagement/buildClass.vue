<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <button class="headerbutton" @click="open">确认上传</button>
    </el-header>

    <el-main >
      <div style="width: 800px">
      <el-form label-width="20%">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label" class="emphasize">上传课程介绍：</span>
          <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="form.intro">
          </el-input>
        </el-form-item>
        <el-form-item label="添加标签">
          <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="是否为vip课程">
          <el-switch
              v-model="form.Isvip"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
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
          <UploadFileTool></UploadFileTool>
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
      dynamicTags: ['计算机'],
      inputVisible: false,
      inputValue: '',
      form: {
        name: '',
        intro: '',
        Isvip: 0,
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
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

.headerbuttonbutton:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.emphasize {
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  font-size: 13px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
