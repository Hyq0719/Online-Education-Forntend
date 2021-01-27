<template>
  <div style="position: relative">
    <vue-core-video-player class="myVedio"
                           src="https://shu-online-edu.oss-cn-shanghai.aliyuncs.com/video/0/2.1.1.2%20%E6%A0%87%E5%87%86%E5%8C%96%E5%B7%A5%E4%BD%9C%E5%8F%8A%E7%9B%B8%E5%85%B3%E7%BB%84%E7%BB%87%28Av70228743%2CP2%29.mp4
">
    </vue-core-video-player>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
}
</script>

<style scoped>
.myVedio {
  height: 550px;
  width: 100%;
  margin: 0 auto;
}
</style>
