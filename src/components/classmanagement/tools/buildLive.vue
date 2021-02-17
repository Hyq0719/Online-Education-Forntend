<template>
  <div>
    <el-main>
      <div style="width: 550px">
        <el-form label-width="160px">
          <el-form-item label="直播名称" style="width: 300px">
            <el-input v-model="formbuild.name"
                      placeholder="请输入直播名称"
                      maxlength="10"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label" class="emphasize">上传直播介绍：</span>
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="formbuild.intro">
            </el-input>
          </el-form-item>
          <el-form-item label="选择直播时间">
            <el-select v-model="selectvalue1" placeholder="请选择" style="float: left;margin: 10px 24px">
              <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择直播线路">
            <el-select v-model="selectvalue2" placeholder="请选择" style="float: left;margin: 10px 24px">
              <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传直播封面" style="width: 550px">
            <el-col class="normal" :span="24"> 课程封面只能上传一张图片，且上传图片的大小最大为2MB</el-col>
          </el-form-item>
          <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadHttp">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-form-item style="position: relative;margin: 0;padding: 0">
            <el-button type="primary" class="headerbutton" @click="closed" :loading="loading" style="position: absolute;left: 60px">
              {{ loading ? '提交中 ...' : '确认上传' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>

import ossClient from "@/aliyun.oss.client";

export default {

  name: "buildClass",
  data() {
    return {
      imageUrl: '',
      loading: false,
      formbuild: {              //课程基本属性
        name: '',
        intro: '',
        Isvip: 0,
      },
      imgNum: 1,              //图片属性
      imgSize: 2048000,
      options1: [{                        //课程类别
        value: '选项1',
        label: '2/17 6:00'
      }, {
        value: '选项2',
        label: '2/17 10:00'
      }, {
        value: '选项3',
        label: '2/17 14:00'
      },{
        value: '选项4',
        label: '2/17 16:00'
      },{
        value: '选项5',
        label: '2/17 18:00'
      }],
      options2: [{                        //课程类别
        value: '选项1',
        label: '线路一'
      }, {
        value: '选项2',
        label: '线路二'
      }],
      selectvalue1: '',
      selectvalue2: '',
    };
  },
  methods: {
    handleAvatarSuccess({file}) {
      this.imageFile = {file};
      console.log("上传成功",file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async uploadHttp({file}) {
      console.log(file);
      let that = this;
      let f = await this.$Api.compressImg(file);
      console.log(f);
      let fileName = `${this.$store.state.userData.userId}_Header/${Date.parse(new Date())}`;  //定义唯一的文件名
      if (this.isLogin) {
        fileName = `pic/Student/` + fileName;
      } else {
        fileName = `pic/Teacher/` + fileName;
      }
      ossClient(this.uploadConf).put(fileName, f, {
        'ContentType': 'image/jpeg'
      }).then(({res, url,
                 name}) => {
        if (res && res.status == 200) {
          that.imageUrl = url;
          that.information.studentPicUrl = url;
          that.informationTeacher.teacherPicUrl = url;
          console.log(`阿里云OSS上传图片成功回调`, res, url, name);
        }
      }).catch((err) => {
        console.log(`阿里云OSS上传图片失败回调`, err);
      });
    },
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
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader-icon:hover {
  border-color: #409EFF;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.headerbutton {
  cursor: pointer;
  position: relative;
  left: -140px;
  margin-top: 12px;
}


.emphasize {
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  font-size: 13px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

</style>
