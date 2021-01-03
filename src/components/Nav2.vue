<template>
<div>
<h3 align="center">新手入门</h3>
<el-row :gutter="20">
  <el-col :span="9" :offset="3">
    <adview1 label="广告位1" :img="adpicture[0]"></adview1>
  </el-col>
  <el-col :span="9" :offset="1">
    <adview1 label="广告位2" :img="adpicture[1]"></adview1>
  </el-col>
</el-row>
<el-row :gutter="20" >
  <el-col :span="4" :offset="2">
    <classview1 :img=classpicture :star=star[1] :classname=classname[1]></classview1>
    </el-col>
  <el-col :span="4">
     <classview1 :img=classpicture :star=star[2] :classname=classname[2]></classview1>
    </el-col>
  <el-col :span="4">
     <classview1 :img=classpicture :star=star[3] :classname=classname[3]></classview1>
  </el-col>
  <el-col :span="4">
     <classview1 :img=classpicture :star=star[4]></classview1>
  </el-col>
  <el-col :span="4">
     <classview1 :img=classpicture :star=star[5]>></classview1>
  </el-col>
</el-row>
<el-row :gutter="20" >
 <el-col :span="4" :offset="2">
    <classview1 :img=classpicture :star=star[6]>></classview1>
    </el-col>
  <el-col :span="4">
     <classview1 :img=classpicture :star=star[7]>></classview1>
    </el-col>
  <el-col :span="4">
     <classview1 :img=classpicture :star=star[8]>></classview1>
  </el-col>
  <el-col :span="4">
     <classview1 :img=classpicture :star=star[9]>></classview1>
  </el-col>
  <el-col :span="4">
     <classview1 :img=classpicture :star=star[10]>></classview1>
  </el-col>
</el-row>
</div>
</template>

<style>
  .adbox {
    display: flex;
  }
  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
import classview1 from './childcpn/classview'
import adview1 from './childcpn/adview'

export default {
  name: 'nav2',
    components: {
    classview1,
    adview1
  },
  data () {
    return {
      adpicture: [require('@/assets/ad1.jpg'),require('@/assets/ad2.jpg')],
      classpicture: [require('@/assets/class1.jpg')],
      star: [3,4,3.4,3.5,2.0,4,1,2.3,3.4],
      classname: ['一晚上搞定CSS','一晚上搞定Vue','一晚上搞定HTML']
    }
  }
}
</script>
