<template>
  <div class="breadEval">
    <div class="breadTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="item.link" v-for="item of breadcrumb" :key="item.title">
          {{item.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name:'Breadcrumb',
  props:{
    breadcrumb:Array
  },
  mounted() {
    console.log(this.breadcrumb);
  }
}
</script>
<style lang="less" scoped>
.breadcrumb {
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  color: #777;
  &>li{
    display: inline-block;
    list-style: none;
    position: relative;
    &+li{
      margin-right: 20px;

      &:after{
        content: '/';
        position: absolute;
        right: -12px;
        top: 0;
        color: #ccc;
      }

      &:last-child:after{
        content: '';
      }
    }


    & > a{
      color: #4db6ac;
      text-decoration: none;
      &.active{
        color: #777;
      }
    }
  }
}
.breadEval {
  position: relative;
  font-size: 14px;
  height: 100%;
  background: #F3F7FD;
  .breadTitle{
    padding: 20px 30px;
    background: #fff;
  }
}
</style>
