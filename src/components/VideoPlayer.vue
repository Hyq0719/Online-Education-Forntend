<template>
  <div style="position: relative">
    <vue-core-video-player class="myVedio"
                           :src="this.$store.state.Video.videoUrl"
                           :key="this.$store.state.Video.videoUrl">
    </vue-core-video-player>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
};
</script>

<style scoped>
.myVedio {
  height: 550px;
  width: 100%;
  margin: 0 auto;
}
</style>
