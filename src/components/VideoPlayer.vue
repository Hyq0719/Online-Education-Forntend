<template>
  <div style="position: relative">
    <vue-core-video-player class="myVedio"
                           src="https://shu-online-edu.oss-cn-shanghai.aliyuncs.com/video/0/2.1.1.2%20%E6%A0%87%E5%87%86%E5%8C%96%E5%B7%A5%E4%BD%9C%E5%8F%8A%E7%9B%B8%E5%85%B3%E7%BB%84%E7%BB%87%28Av70228743%2CP2%29.mp4
">
    </vue-core-video-player>
    <v-barrage :arr="arr"
               :isPause="isPause"
               :percent="100"
    >
    </v-barrage>
  </div>
</template>

<script>
import VBarrage from '@/components/VBarrage/index.vue'

export default {
  name: "VideoPlayer",
  components:{
    VBarrage
  },
  data () {
    return {
      arr: [],
      isPause: false,
      sendContent: null,
      isJs: false,
      direction: 'default'
    }
  },
  mounted () {
    this.initTestData();
  },
  methods: {
    // 初始化模拟弹幕数据
    initTestData () {
      let arr = [
        '这个课有点意思',
        '明天期末考试',
        '可以吗？',
        '一起嗨！！！'
      ]
      for (let i = 0; i < 6; i++) {
        for (let index = 0; index < 10; index++) {
          if (index % 2 == 0) {
            this.arr.push({
              direction: 'default',
              content: arr[parseInt(Math.random() * arr.length)]
            })
          } else {
            this.arr.push({
              direction: 'default',
              content: arr[parseInt(Math.random() * arr.length)]
            })
          }
        }
      }
    },
    // 发送弹幕
    sendBarrage () {
      if (this.arr.length > 1 && this.sendContent != '' && this.sendContent != null) {
        this.arr.unshift({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: 'red',
            fontSize: '25px'
          },
          isJs: this.isJs
        });
      } else {
        this.arr.push({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: 'red'
          },
          isJs: this.isJs
        });
      }
      this.sendContent = null;
    },
  }
}
</script>

<style scoped>
.myVedio {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
</style>
