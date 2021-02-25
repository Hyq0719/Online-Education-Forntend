<template>
  <div>
      <el-main>
        <div style="width: 550px">
          <el-form label-width="160px">
            <el-form-item label="课程名称" style="width: 300px">
              <el-input v-model="formBuild.name"
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
                  v-model="formBuild.intro">
              </el-input>
            </el-form-item>
            <el-form-item label="选择课程类型">
                <el-cascader
                    v-model="formBuild.perferId"
                    :options="Option"
                    :props="{ expandTrigger: 'hover' }"
                    ></el-cascader>
            </el-form-item>
            <el-form-item label="是否为vip课程">
              <el-switch
                  v-model="formBuild.needVip"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  style="float: left;margin: 10px 24px">
              </el-switch>
            </el-form-item>
            <el-form-item label="上传课程封面" style="width: 550px">
              <el-col class="normal" :span="24"> 课程封面只能上传一张图片，且上传图片的大小最大为2MB</el-col>
            </el-form-item>
            <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
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
import axios from "axios";

export default {
  name: "buildClass",
  props:{
    courseId:{
      type:Number,
    },
    isEdit:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      loading: false,
      formBuild: {              //课程基本属性
        name: '',
        intro: '',
        needVip: 0,
        perferId: null,      //个位为majorId，百位为preferId
        coursePicUrl:'',
      },
      imgNum: 1,              //图片属性
      imgSize: 2048000,
      Option: [],
      imgFile:{},
      imageUrl: '',
      images: [],
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
    closed() {
      let that=this;
      console.log(this.formBuild.perferId);
      let r=Math.floor(this.formBuild.perferId[1]/100);
      console.log(r);
      let params ={
        coursePicUrl: this.formBuild.coursePicUrl,
        intro: this.formBuild.intro,
        name: this.formBuild.name,
        needVip: this.formBuild.needVip,
        preferId: r,
        teacherId: this.$store.state.userData.userId,
      };
      console.log(params);
      let JWT = this.$store.state.JWT;
      if (that.isEdit !== true)
      {
        axios.post("http://" + this.Api + "/api/Course/addCourse", params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JWT,
          }
        }).then(function (response) {
          console.log("创建成功",response);
          that.$alert('上传成功，待审核', '提示', {
            confirmButtonText: '确定',
          });
          that.$emit('close', false);
        }, function (err) {
          console.log(err);
        });
      }
      else {
        axios.post("http://" + this.Api + "/api/Course/completeCourseInfo?courseId="+that.courseId, params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JWT,
          }
        }).then(function (response) {
          console.log("修改成功",response);
          that.$alert('上传成功，待审核', '提示', {
            confirmButtonText: '确定',
          });
          that.$emit('close', false);
        }, function (err) {
          console.log(err);
        });
      };
    },   //
    async uploadHttp({file}) {
      // const file=this.imgFile;
      console.log(file);
      let that = this;
      let f = await this.$Api.compressImg(file);
      console.log(f);
      let fileName = `${this.$store.state.userData.userId}_Header/${file.name}`;  //定义唯一的文件名
        fileName = `pic/Course/` + fileName;
      ossClient(this.uploadConf).put(fileName, f, {
        'ContentType': 'image/jpeg'
      }).then(({res, url, name}) => {
        if (res && res.status === 200) {
          that.imageUrl = url;
          that.formBuild.coursePicUrl = url;
          console.log(url);
          console.log(`阿里云OSS上传图片成功回调`, res, url, name);
        }
      }).catch((err) => {
        console.log(`阿里云OSS上传图片失败回调`, err);
      });
    },  //上传至阿里云
  },
  mounted() {
    let that = this;
    if (that.isEdit) {
      axios.post('http://' + that.Api + "/api/Course/getCourseById?courseId=" + that.courseId,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
            if (res.data.code === 1000) {
              console.log("课程信息", res);
              that.formBuild.name = res.data.data.name;
              that.formBuild.intro = res.data.data.intro;
              that.formBuild.needVip = res.data.data.needVip;
              that.formBuild.perferId =[res.data.data.prefer.majorId,res.data.data.prefer.preferId*100+res.data.data.prefer.majorId];
              that.formBuild.coursePicUrl = res.data.data.coursePic;
              that.imageUrl = res.data.data.coursePic;
            }
          }, function (err) {
            console.log(err);
          }
      );
    }
    const r= that.$store.state.MajorPrefer;
    console.log(that.$store.state.MajorPrefer);
    let n = r.map(item =>({label:item.majorContent,value:item.majorId,children:[]}));
    let j=0;
    for (let k=0;k<r.length;k++) {
      r[k].prefer.map(item => {
            n[j].children.push({label: item.preferContent, value: item.preferId * 100 + item.majorId});
      });
      j++;
    }
    this.Option=n;
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
