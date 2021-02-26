<template>
  <div>
    <video id="videoElement" controls autoplay muted></video>
    <div class="flvjs-button">
      <el-button icon="el-icon-video-play" circle @click="play"></el-button>
      <el-button icon="el-icon-refresh" circle @click="reload"></el-button>
    </div>
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
      this.flvPlayer.unload();
      this.flvPlayer.load();
      this.flvPlayer.play();
    },
  },
};
</script>

<style scoped>
#videoElement {
  width: 100%;
  height: 500px;
}
.flvjs-button{
  margin: 10px;
  text-align: left;
}
</style>
