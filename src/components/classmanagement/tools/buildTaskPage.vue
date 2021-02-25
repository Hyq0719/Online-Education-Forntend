<template>
  <div>
      <el-main style="min-height: 400px">
        <div style="width: 550px">
          <el-form label-width="160px">
            <el-form-item label="任务名称" style="width: 300px">
              <el-input v-model="formBuild.name"
                        placeholder="请输入内容"
                        maxlength="50"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" class="emphasize">上传课程介绍</span>
              <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="formBuild.content">
              </el-input>
            </el-form-item>
            <el-form-item label="任务时间设置" style="width: 550px">
              <el-date-picker
                  v-model="formBuild.value1"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

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

import axios from "axios";

export default {
  name: "buildTask",
  props:{
    chapterId:{
      type:Number,
    },
    courseId:{
      type:Number,
    },
    taskId:{
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
        content: '',
        value1: [],
      },
    };
  },
  methods: {
    closed() {
      let that=this;

      let params ={
        content: this.formBuild.content,
        endTime: this.formBuild.value1[1],
        startTime: this.formBuild.value1[0],
        taskName: this.formBuild.name,
      };
      console.log(params);
      let JWT = this.$store.state.JWT;
      if (that.isEdit !== true)
      {
        axios.post("http://" + this.Api + "/api/Task/addTaskByCourseChapter?courseId="+that.courseId+"&chapterId="+that.chapterId, params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JWT,
          }
        }).then(function (response) {
          console.log("创建成功",response);
          that.$alert('上传成功', '提示', {
            confirmButtonText: '确定',
          });
          that.$emit('close', false);
        }, function (err) {
          console.log(err);
        });
      }
      else {
        console.log(that.taskId);
        axios.post("http://" + this.Api + "/api/Task/modifyTaskById?taskId="+that.taskId, params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JWT,
          }
        }).then(function (response) {
          console.log("修改成功",response);
          that.$alert('上传成功', '提示', {
            confirmButtonText: '确定',
          });
          that.$emit('close', false);
        }, function (err) {
          console.log(err);
        });
      }
    },   //
  },
  mounted() {
    let that = this;
    if (that.isEdit) {
      axios.post('http://' + that.Api + "/api/Task/getTaskById?taskId=" + that.taskId,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
            if (res.data.code === 1000) {
              console.log("任务信息", res);
              that.formBuild.name = res.data.data.taskName;
              that.formBuild.content = res.data.data.content;
              that.formBuild.value1=[res.data.data.startTime,res.data.data.endTime];
            }
          }, function (err) {
            console.log(err);
          }
      );
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
