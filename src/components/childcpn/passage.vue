<template>
  <div class="view">
    <img :src="img" class="img" alt="">
    <span class="font">
      {{ content }}
    </span>
  </div>
</template>

<style>
.view {
  overflow: hidden;
}

.font {
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
  float: left;
}
</style>

<script>
export default {
  name: 'passage',
  props: {
    img: {
      type: String,
      default: require('@/assets/logo.png')
    },
    content: {
      type: String,
      default: '文章'
    }
  },
  data() {
    return {}
  }
}
</script>
