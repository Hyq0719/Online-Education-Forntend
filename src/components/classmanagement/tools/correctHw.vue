<template>
 <div>
   <el-main>
     <div>
       {{info.content}}
     </div>
     <div style="float: right;overflow: hidden;clear: both;">
       提交时间： {{info.commitTime}}
     </div>
     <div style="float: left;overflow: hidden;clear: both;">
     <el-form :inline="true" v-model="input" class="demo-form-inline">
       <el-form-item label="评分:">
         <el-input v-model="input" > placeholder="请打分"></el-input>
       </el-form-item>
     </el-form>
     </div>
     <div style="float: left;overflow: hidden;clear: both;font-size: 14px">
       评语：
     </div>
     <div>
       <el-input
           type="textarea"
           :rows="4"
           placeholder="请输入内容"
           v-model="textarea">
       </el-input>
     </div>

       <el-button type="primary" class="headerbutton" @click="closed" :loading="loading"
                  style="text-align: center;margin: 20px 0 0 0">
         {{ loading ? '提交中 ...' : '确认上传' }}
       </el-button>

   </el-main>
   </div>
</template>

<script>
import axios from "axios";

export default {
  name: "correctHw",
  props:{info:{}},
  // commitTime: "2021-02-13 23:03:04"
  // content: "content"
  // homeworkId: 1
  // likes: 0
  // mark: 100
  // reply: "string"
  // status: 0
  // studentId: 1
  // taskId: 1
  data(){
    return{
      loading:false,
       input:null,
      textarea:"",
    }
  },
  methods: {
    closed() {
      let that=this;
      let params ={
        homeworkId: this.info.homeworkId,
        mark: Number(this.input),
        reply: this.textarea,
        status: 2,
      };
      console.log(params);
      let JWT = this.$store.state.JWT;

        axios.post("http://" + this.Api + "/api/Homework/teacherHomework", params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JWT,
          }
        }).then(function (response) {
          console.log("批改成功",response);
          that.$alert('批改成功', '提示', {
            confirmButtonText: '确定',
          });
          that.$emit('close', false);
        }, function (err) {
          console.log(err);
        });
    },   //
  },
  mounted() {


  },
}
</script>

<style scoped>

</style>
