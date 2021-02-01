<template>
  <div>
    <div class="title" style="overflow: hidden;width: 700px;margin-top: 20px" >
      <h3 style="display: inline">
        修改课程
      </h3>
      <el-button type="primary" class="headerbutton" @click="closed" :loading="loading">
        {{ loading ? '提交中 ...' : '确认修改' }}
      </el-button>
        <el-divider></el-divider>
    </div>
    <el-main>
      <div style="width: 800px">
        <el-form label-width="160px">
          <el-form-item label="课程名称" style="width: 300px">
            <el-input v-model="formbuild.name"
                      placeholder="请输入内容"
                      maxlength="10"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label" class="emphasize">上传课程介绍：</span>
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="formbuild.intro">
            </el-input>
          </el-form-item>
          <el-form-item label="选择课程类别">
            <el-select v-model="selectvalue" placeholder="请选择" style="float: left;margin: 10px 24px">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否为vip课程">
            <el-switch
                v-model="formbuild.Isvip"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="float: left;margin: 10px 24px">
            </el-switch>
          </el-form-item>
          <el-form-item label="上传课程封面" style="width: 600px">
            <el-col class="normal" :span="24"> 请注意课程封面只能上传一张图片，且上传图片的大小最大为2MB</el-col>
            <UploadImgTool :imgNum="imgNum"></UploadImgTool>
          </el-form-item>
          <!--          <el-form-item>-->
          <!--            &lt;!&ndash;默认上传&ndash;&gt;-->
          <!--            <span slot="label" class="emphasize">上传课程视频：</span>-->
          <!--            <el-col class="normal" :span="24">请上传视频</el-col>-->
          <!--            <UploadFileTool></UploadFileTool>-->
          <!--          </el-form-item>-->
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>

export default {
  name: "buildClass",
  data() {
    return {
      loading: false,
      formbuild: {              //课程基本属性
        name: '',
        intro: '',
        Isvip: 0,
      },
      imgNum: 1,              //图片属性
      imgSize: 2048000,
      options: [{                        //课程类别
        value: '选项1',
        label: '计算机'
      }, {
        value: '选项2',
        label: '数学'
      }, {
        value: '选项3',
        label: '金融'
      }],
      selectvalue: ''
    };
  },
  components: {
    UploadImgTool: () => import('@/components/classmanagement/UploadlmgTool'),
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
    handleClose1(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {
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
    }
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
