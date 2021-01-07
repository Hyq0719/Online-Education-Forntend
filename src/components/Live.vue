<template>
  <el-container>
    <el-main>
      <Flvjs></Flvjs>
    </el-main>
    <el-aside width="300px">
      <el-header class="onlineNumber">{{ myCount }}人正在观看</el-header>
      <el-tabs type="card" v-model="activeList" stretch>
        <el-tab-pane label="聊天室" name="first">
          <div class="infinite-list-wrapper" style="overflow:auto; height:344px;">
            <ul
                class="list">
              <li v-for="item in list" :key='item' :class="isMyself(item[0])">{{ item[0] }}：{{ item[1] }}</li>
            </ul>
          </div>
          <el-footer>
            <input
                type="text"
                v-model="input"
                @keyup.enter="mySend()"
            />
            <button @click="mySend()">发送</button>
          </el-footer>
        </el-tab-pane>
        <el-tab-pane label="在线用户" name="second">
          <div class="infinite-list-wrapper" style="overflow:auto; height:344px;">
            <ul class="list">
              <li v-for="value in userList" :key="value" class="users">{{ value }}</li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>

    </el-aside>
  </el-container>
</template>

<script>
import Flvjs from '../components/Flvjs'
import axios from "axios";

export default {
  name: "Live",
  data() {
    return {
      myCount: 0,
      list: [],
      userList: [],
      input: '',
      activeList: 'first',
    }
  },
  mounted() {
    this.initWebSocket();
    this.updateStudentNumber();
    this.mySetInterval();
  },
  destroyed() {
    this.websocketOnClose();
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
        timer: '',
      };
      // console.log(preMsg);
      let toSend = JSON.stringify(preMsg);
      // console.log(toSend);
      this.chatRoomWebsocket.send(toSend); //将消息发送到服务端
      this.input = '';
      // console.log("sended!");
    },
    mySetInterval() {
      this.timer = setInterval(this.updateStudentNumber, 1000);
    },
    updateStudentNumber() {
      let a = new URLSearchParams();
      let that = this;
      a.append('sid', '1');
      axios.post("http://192.168.1.102:8080/api/WebSocket/onlineStudents", a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        // console.log(response);
        if (response.data.code === 1000) {
          // console.log('OK');
          // console.log(response);
          that.myCount = response.data.data.count;
          that.userList = [];//response.data.data.student
          for (let i in response.data.data.student) {
            that.userList.push(response.data.data.student[i]);
          }
          console.log(that.userList);
        }
      }, function (err) {
        console.log(err);
      })
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
  overflow: hidden;
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
  border: 3px solid #6fadff;
  border-radius: 5px;
  background-color: #9bc4ff;
  font-size: 20px;
  padding: 2px;
  margin-bottom: 10px;
  word-wrap: break-word;
  word-break: normal;
}

.onlineNumber {
  height: 20px;
  background-color: #fff;
  border: 1px solid #000000;
  border-radius: 5px;
  font-size: 18px;
}

.users {
  display: block;
  list-style-type: none;
  text-align: left;
  font-size: 20px;
  padding: 2px;
  margin-bottom: 10px;
  overflow: hidden;
}

</style>


