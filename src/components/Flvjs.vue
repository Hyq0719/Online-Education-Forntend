<template>
  <div>
    <video id="videoElement" controls autoplay muted></video>
    <!--      <button @click="play">播放</button>-->
    <!--      <button @click="reload">重新加载</button>-->
  </div>
</template>

<script>
import flvjs from 'flv.js';

export default {
  name: "flvjs",
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      flvPlayer: null,
    };
  },
  mounted() {
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement');
      this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: true,
        url: 'http://47.102.122.250:8002/live?port=9000&app=rtmplive&stream=12345',
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
      this.flvPlayer.play();
    }
  },
  methods: {
    play() {
      this.flvPlayer.play();
    },
    reload() {
      this.flvPlayer.load();
      this.flvPlayer.play();
    },
  },
};
</script>

<style scoped>
#videoElement {
  width: 100%;
  height: 504px;
}
</style>
