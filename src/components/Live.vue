<template>
  <el-container>
    <el-main>
      <Flvjs></Flvjs>
    </el-main>
    <el-aside width="300px">
      <div class="infinite-list-wrapper" style="overflow:auto; height:464px;">
        <ul
            class="list">
          <li v-for="item in list" :key='item' :class="isMyself(item[0])">{{ item[0] }}：{{ item[1] }}</li>
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
    isMyself(what) {
      return what == this.$store.state.currentData.data.nickName ? "myself" : "others";
    },
    mySend() {
      // console.log('mySend!');
      let preMsg = {
        userId: this.$store.state.currentData.data.userId,
        type: '0',
        nickName: this.$store.state.currentData.data.nickName,
        msg: this.input,
      };
      // console.log(preMsg);
      let toSend = JSON.stringify(preMsg);
      // console.log(toSend);
      this.chatRoomWebsocket.send(toSend); //将消息发送到服务端
      this.input = '';
      // console.log("sended!");
    },
    initWebSocket() {
      const wsuri = "ws://" + "192.168.1.102:8080" + "/websocket/" + "1" + "/" + "0" + "/" + this.$store.state.currentData.data.userId + '/' + this.$store.state.currentData.data.nickName;
      this.chatRoomWebsocket = new WebSocket(wsuri);
      this.chatRoomWebsocket.onopen = this.websocketOnOpen;
      this.chatRoomWebsocket.onerror = this.websocketOnError;
      this.chatRoomWebsocket.onmessage = this.websocketOnMessage;
      this.chatRoomWebsocket.onclose = this.websocketOnClose;
      // console.log("123")
    },
    websocketOnOpen() {
      console.log("连接成功");
    },
    websocketOnError() {
      console.log("WebSocket 连接发生错误");
    },
    websocketOnMessage(event) {
      // console.log(event);
      let myEvent = JSON.parse(event.data);
      // console.log(myEvent);
      this.list.push([myEvent.nickName, myEvent.msg]);
      // console.log(this.list);
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

.others {
  display: block;
  list-style-type: none;
  text-align: left;
  border: 3px solid #55fddd;
  border-radius: 5px;
  background-color: #92f8d9;
  font-size: 20px;
  padding: 2px;
  margin-bottom: 10px;
  word-wrap: break-word;
  word-break: normal;
}

.myself {
  display: block;
  list-style-type: none;
  text-align: left;
  border: 3px solid #55a1fd;
  border-radius: 5px;
  background-color: #75a9fc;
  font-size: 20px;
  padding: 2px;
  margin-bottom: 10px;
  word-wrap: break-word;
  word-break: normal;
}

</style>


