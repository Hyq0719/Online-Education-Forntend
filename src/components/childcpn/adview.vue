<template>
  <div class="grid-content">
    <el-row>
      <img :src="img" class="img" width="500px" height="100px" alt="">
    </el-row>
  </div>
</template>

<style scoped>
.img {
  border-radius: 12px;
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
    label: {
      type: String,
      default: '广告位'
    }
  },
  data() {
    return {}
  }
}
</script>
