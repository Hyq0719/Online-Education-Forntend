<template>
  <el-container>
    <el-main>
      <Flvjs></Flvjs>
    </el-main>
    <el-aside width="300px">
      <div class="infinite-list-wrapper" style="overflow:auto; height:464px;">
        <ul
            class="list">
          <li v-for="item in list" v-bind:key='item' class="list-item">{{ item }}</li>
        </ul>
      </div>
      <div>
        <input
            type="text"
            v-model="input"
            @keyup.enter="mySend()"
        />
        <button @click="mySend()">发送</button>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import Flvjs from '../components/Flvjs'

export default {
  name: "Live",
  data() {
    return {
      count: 0,
      list: [],
      input: '',
    }
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    mySend() {
      console.log('mySend!');
      let myMsg = {
        sid: '1',
        userId: this.$store.state.currentData.data.userId,
        msg: this.$store.state.currentData.data.nickName + ':' + this.input,
        count: 0,
      };
      let toSend = JSON.stringify(myMsg);
      this.chatRoomWebsocket.send(toSend); //将消息发送到服务端
      this.input = '';
    },
    initWebSocket() {
      const wsuri = "ws://" + "192.168.43.67:8080" + "/websocket/" + "1" + "/" + "0" + "/" + this.$store.state.currentData.data.userId;
      this.chatRoomWebsocket = new WebSocket(wsuri);
      this.chatRoomWebsocket.onopen = this.websocketOnOpen;
      this.chatRoomWebsocket.onerror = this.websocketOnError;
      this.chatRoomWebsocket.onmessage = this.websocketOnMessage;
      this.chatRoomWebsocket.onclose = this.websocketOnClose;
      console.log("123")
    },
    websocketOnOpen() {
      console.log("连接成功");
    },
    websocketOnError() {
      console.log("WebSocket 连接发生错误");
    },
    websocketOnMessage(event) {
      console.log(event);
      let myEvent = JSON.parse(event.data);
      console.log(myEvent);
      this.list.push(myEvent.msg);
      this.count = myEvent.count;
    },
    websocketOnClose(e) {
      console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean);
    },

  },
  components: {
    Flvjs,
  },
}
</script>

<style scoped>
.el-aside {
  text-align: center;
  line-height: 20px;
  font-size: 10px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  padding: 0px;
}

.el-container {
  margin: 20px 100px;
  height: 506px;
  border: #99a9bf 1px solid;
  border-radius: 10px;
}

ul {
  padding: 5px;
}

li {
  list-style-type: none;
  text-align: left;
}

</style>


