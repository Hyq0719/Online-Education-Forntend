<template>
  <div class="grid-content">
    <img :src="img" width="100%" height="60%" class="img" alt="">

    <span class="classname">{{ classname }}</span>
    <p class="info">
      <span class="labelname">{{ label }}</span>
      <span>  </span>
      <el-rate
          v-model="star"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}" class="star"></el-rate>
    </p>
    <p class="price">￥{{ price }}</p>
  </div>
</template>template

<style scoped>
.info {
  position: relative;
  left: 0;
  margin-top: 5px;
  margin-bottom: auto;
  font-size: 12px;
  color: #9199a1;
  line-height: 24px;
}

.price {
  margin: 2px;
  font-size: 14px;
  font-weight: bolder;
  position: absolute;
  left: 10px;
  padding: 0 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.star {
  text-align: right;
  margin-right: 10px;
}

.labelname {
  position: absolute;
  left: 18px;
  font-size: 14px;
}

.classname {
  text-align: left;
  height: 20px;
  word-break: break-all;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #1c1f21;
  overflow: hidden;
}

.img {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
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
