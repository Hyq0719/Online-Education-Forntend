<template>
  <div class="grid-content bg-purple">
    <el-row>
      <img :src="img">
    </el-row>
    <el-row>
      {{ classname }}
    </el-row>
    <el-row>
      <el-col :span="3" :offset="0">{{ label }}</el-col>
      <el-col :span="12" :offset="8">
        <el-rate
            v-model="star"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"></el-rate>
      </el-col>
      <el-row>
        <el-col :span="2">￥{{ price }}</el-col>
      </el-row>
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
export default {
  name: 'classview1',
  props: {
    img: {
      type: String,
      default: require('@/assets/logo.png')
    },
    classname: {
      type: String,
      default: 'Vue课程'
    },
    label: {
      type: String,
      default: '免费'
    },
    star: {
      type: Number,
      default: 3.7
    },
    price: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      value: 3.0
    }
  }
}
</script>
