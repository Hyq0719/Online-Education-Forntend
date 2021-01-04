<template>
  <div>
    <h3 align="center">精彩手记</h3>
    <el-col :gutter="20">
      <el-col :span="7" :offset="1">
        <passage class='passage' :img=picture content="手记1坑况：今日pull代码，潇洒npm run dev ，被告知：this dependency was not found：'element-ui/lib/theme-chalk/index.css'。。。。。。。
解决思路
1.找不到依赖，路径问题1111111111111111111111"></passage>
      </el-col>
      <el-col :span="7">
        <passage class='passage' :img=picture content="手记2 今日pull代码，潇洒npm run dev ，被告知：this dependency was not found：'element-ui/lib/theme-chalk/index.css'。。。。。。。
解决思路"></passage>
      </el-col>
      <el-col :span="7">
        <passage class='passage' content="手记3 今日pull代码，潇洒npm run dev ，被告知：this dependency was not found：'element-ui/lib/theme-chalk/index.css'。。。。。。。
解决思路"></passage>
      </el-col>
      <el-col :span="7" :offset="1">
        <passage class='passage' content="手记4 今日pull代码，潇洒npm run dev ，被告知：this dependency was not found：'element-ui/lib/theme-chalk/index.css'。。。。。。。
解决思路"></passage>
      </el-col>
      <el-col :span="7">
        <passage class='passage' :img=picture content="手记5 今日pull代码，潇洒npm run dev ，被告知：this dependency was not found：'element-ui/lib/theme-chalk/index.css'。。。。。。。
解决思路"></passage>
      </el-col>
      <el-col :span="7">
        <passage class='passage' content="手记6 今日pull代码，潇洒npm run dev ，被告知：this dependency was not found：'element-ui/lib/theme-chalk/index.css'。。。。。。。
解决思路"></passage>
      </el-col>
      <el-col :span="7" :offset="1">
        <passage class='passage' :img=picture content="手记7 今日pull代码，潇洒npm run dev ，被告知：this dependency was not found：'element-ui/lib/theme-chalk/index.css'。。。。。。。
解决思路"></passage>
      </el-col>
    </el-col>
  </div>
</template>

<style>
.passage {
  display: flex;
  margin: 10px;
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
import passage from './childcpn/passage'

export default {
  name: 'article',
  components: {
    passage
  },
  data() {
    return {
      picture: [require('@/assets/user1.jpg')]
    }
  }
}
</script>
