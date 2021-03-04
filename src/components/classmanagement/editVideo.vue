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
              <el-col>
                <el-row>
                  <el-upload
                      class="upload-demo"
                      action=""
                      :http-request="uploadHttpVideo"
                      multiple
                      :limit="1"
                      :on-exceed="handleExceed"
                      :file-list="fileListVideo">
                    <el-button size="small" type="primary" v-loading="loading">点击上传视频</el-button>
                  </el-upload>
                </el-row>
                <el-row v-show="progressView">
                  <el-progress :text-inside="true" :stroke-width="26" :percentage="p">
                    <span>上传进度</span>
                  </el-progress>
                </el-row>
              </el-col>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>

import ossClient from "@/aliyun.oss.client";

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
      fileListVideo:[],
      loading:false,
      partSize: 1024 * 1024, // 每个分片大小(byte)
      parallel: 3, // 同时上传的分片数
      checkpoints: {}, // 所有分片上传文件的检查点
      p:0,
      progressView: false,
      uploadConf: {
        endpoint: "https://oss-accelerate.aliyuncs.com",
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAI4GGsTQ35tQcWWDVNKwqG',
        accessKeySecret: 'reWjqrK73PE0ZvJQH0Hwjr9eyuWbuc',
        bucket: 'shu-online-edu',
      },
    };
  },

  methods: {
    uploadHttpVideo({file}) {
      // const file=this.imgFile;

      console.log(file);
      let that = this;
      that.loading = true;
      let f = file;
      console.log(f);
      let fileName = `${that.courseId}_courseId/${that.chapterId}_chapterId/${file.name}`;  //定义唯一的文件名
      fileName = `pic/Course/` + fileName;

      if (f.size < that.partSize) {         //文件较小则直接上传
        ossClient(this.uploadConf).put(fileName, file).then(({res, url, name}) => {
          if (res && res.status === 200) {
            console.log(url);
            that.fileListVideo.push({
              name: f.name,
              url: url,
            });
            console.log(`阿里云OSS上传成功回调`, res, url, name);
            that.loading = false;
          }
        }).catch((err) => {
          console.log(`阿里云OSS上传失败回调`, err);
        });
      } else {    //较大分片上传
        that.multipartUpload(file);
      }
    },  //上传至阿里云

    // stop() {
    //   if (ossClient) ossClient.cancel();
    // },
    //
    //  // 续传
    // resume() {
    //   console.log(ossClient);
    //   if (ossClient) this.resumeMultipartUpload();
    // },

    onMultipartUploadProgress(p, _checkpoint) {
      console.log("上传进度", p);
      this.p=p*100;
      console.log("断点信息", _checkpoint);
    },

    handleExceed() {
      this.$message.warning(`每次只能上传一个视频`);
    },

    async multipartUpload(file) {
      let that = this;
      const fileName = file.name;
      that.progressView=true;
      return ossClient(that.uploadConf).multipartUpload(fileName, file, {
        parallel: that.parallel,
        partSize: that.partSize,
        progress: that.onMultipartUploadProgress
      }).then(result => {
        // 生成文件下载地址
        const url = `http://${that.uploadConf.bucket}.${that.uploadConf.region}.aliyuncs.com/${fileName}`;
        console.log(`Multipart upload ${file.name} succeeded, url === `, url);
        that.loading=false;
      }).catch(err => {
        console.log(`Multipart upload ${file.name} failed === `, err);
      });
    },    //分片上传

    // async resumeMultipartUpload() {          //断点续传
    //   let that = this;
    //   Object.values(that.checkpoints).forEach((checkpoint) => {
    //     const {uploadId, file, name} = checkpoint;
    //     ossClient.multipartUpload(uploadId, file, {
    //       parallel: that.parallel,
    //       partSize: that.partSize,
    //       progress: that.onMultipartUploadProgress,
    //       checkpoint
    //     }).then(result => {
    //       console.log('before delete checkpoints === ', that.checkpoints);
    //       delete that.checkpoints[checkpoint.uploadId];
    //       console.log('after delete checkpoints === ', that.checkpoints);
    //       const url = `http://${that.uploadConf.bucket}.${that.uploadConf.region}.aliyuncs.com/${name}`;
    //       console.log(`Resume multipart upload ${file.name} succeeded, url === `, url)
    //     }).catch(err => {
    //       console.log('Resume multipart upload failed === ', err);
    //     });
    //   });
    //
    closed(){
      this.$alert('上传成功，待审核', '提示', {
        confirmButtonText: '确定',
      });
      this.$emit('close',false);
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
  margin-top: 0;
}
</style>
