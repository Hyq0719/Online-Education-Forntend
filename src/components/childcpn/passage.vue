<template>
  <div>
    <h5 class="font2">{{ title }}</h5>
    <img :src="img" class="img" alt="">
    <p class="font">
      {{ content }}
    </p>
  </div>
</template>

<style scoped>
h5 {
  display: inline;
}

.font2 {
  font-size: 16px;
  color: #4d555d;
  font-weight: 500;
  overflow: hidden;
}

.font {
  text-align: left;
  word-break: break-all;
  font-size: 12px;
  font-weight: 100;
  line-height: 24px;
  color: #1c1f21;
  text-indent: 2em;
  table-layout: fixed;
}

.img {
  float: right;
  height: 30%;
  width: 30%;
  margin: 10px;
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
    },
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {}
  }
}
</script>
