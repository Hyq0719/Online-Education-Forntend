<template>
  <div>
    <el-main>
      <div style="width: 550px">
        <el-form label-width="160px">
          <el-form-item label="直播名称" style="width: 300px">
            <el-input v-model="formBuild.name"
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
                v-model="formBuild.intro">
            </el-input>
          </el-form-item>
          <el-form-item label="选择直播日期">
            {{formBuild.liveDate}}
            <el-date-picker style="float: left;margin: 10px 24px"
                v-model="formBuild.liveDate"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="选择直播时间">
            <el-select v-model="formBuild.arrange" placeholder="请选择时间" style="float: left;margin: 10px 24px">
              <el-option
                  v-for="item in options1"
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
  props:[

  ],
  data() {
    return {
      pickerOptions: {                   //可选直播的时间
        disabledDate(time) {
          let n=time.getTime() < Date.now()-3600 * 1000 * 24;
          let m=time.getTime() > Date.now()+3600 * 1000 * 24*7;
          let c= n | m;
          return c ;
        }},
      imageUrl: '',
      loading: false,
      formBuild: {              //课程基本属性
        addressId: null,
        name: '',
        intro: '',
        Isvip: false,
        liveDate:'',
        arrange:null,
      },
      options1: [{                        //课程类别
        value: 1,
        label: ' 8:00'
      }, {
        value: 2,
        label: '10:00'
      }, {
        value: 3,
        label: '14:00'
      },{
        value: 4,
        label: '16:00'
      },{
        value: 5,
        label: '18:00'
      }],
    };
  },
  methods: {
    async uploadHttp({file}) {
      let that = this;
      let f = await this.$Api.compressImg(file);
      console.log(f);
      let fileName = `${this.$store.state.userData.userId}_Header/${Date.parse(new Date())}`;  //定义唯一的文件名
        fileName = `pic/Live/` + fileName;
      ossClient(this.uploadConf).put(fileName, f, {
        'ContentType': 'image/jpeg'
      }).then(({res, url,
                 name}) => {
        if (res && res.status == 200) {
          that.imageUrl = url;
          that.formBuild.coursePicUrl = url;
          console.log(`阿里云OSS上传图片成功回调`, res, url, name);
        }
      }).catch((err) => {
        console.log(`阿里云OSS上传图片失败回调`, err);
      });
    },
    closed(){
      let that = this;
      // that.uploadHttp(that.imageFile);
      // let str =that.formBuild.liveData.toDateString();
      console.log("选定时间",that.formBuild);
      let params={
          addressId: that.formBuild.addressId,
          liveArrange: that.formBuild.arrange,
          liveDate: that.formBuild.liveData,
          liveIntro: that.formBuild.intro,
          liveName: that.formBuild.name,
          livePicUrl: that.formBuild.coursePicUrl,
          teacherId: that.$store.state.userData.userId,
      };
      console.log(params);
      let JWT = that.$store.state.JWT;
      axios.post("http://" + that.Api + "/api/Course/addCourse", params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log(response);
        that.$alert('上传成功，待审核', '提示', {
          confirmButtonText: '确定',
        });
        that.$emit('close', false);
      }, function (err) {
        console.log(err);
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
