<template>
<div>
<h3 align="center">新手入门</h3>
<el-row :gutter="20">
  <el-col :span="7" :offset="3">
    <adview1 label="广告位1"></adview1>
  </el-col>
  <el-col :span="7" :offset="3">
    <adview1 label="广告位2"></adview1>
  </el-col>
</el-row>
<el-row :gutter="20" >
  <el-col :span="5" :offset="2">
    <classview1 :img=picture ></classview1>
    </el-col>
  <el-col :span="5">
     <classview1></classview1>
    </el-col>
  <el-col :span="5">
     <classview1></classview1>
  </el-col>
  <el-col :span="5">
     <classview1></classview1>
  </el-col>
</el-row>
<el-row :gutter="20" >
  <el-col :span="5" :offset="2">
    <classview1></classview1>
    </el-col>
  <el-col :span="5">
     <classview1></classview1>
    </el-col>
  <el-col :span="5">
     <classview1></classview1>
  </el-col>
  <el-col :span="5">
     <classview1></classview1>
  </el-col>
</el-row>
</div>
</template>

<style>
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
  name: 'home',
  components: {
    classview1,
    adview1
  },
  data () {
    return {
      picture: [require('@/assets/logo.png')]
    }
  }
}
</script>
