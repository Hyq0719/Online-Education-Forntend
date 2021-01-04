<template>
  <div class="grid-content">
    <el-row>
      <img :src="img" class="img" width="700px" height="150px" alt="">
    </el-row>
  </div>
</template>

<style>
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
