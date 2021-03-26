<template>
  <div>
    <el-container>
      <el-main>
        <Flvjs></Flvjs>
        <v-barrage :arr="arr"
                   :isPause="isPause"
                   :percent="75"
        >
        </v-barrage>
      </el-main>
      <el-aside>
        <el-header class="onlineNumber">{{ myCount }}人正在观看</el-header>
        <el-tabs type="card" v-model="activeList" stretch>
          <el-tab-pane label="聊天室" name="first">
            <div class="infinite-list-wrapper">
              <ul
                  class="list">
                <li v-for="item in list" :key='item.id' :class="isMyself(item[0])">{{ item[0] }}：{{ item[1] }}</li>
              </ul>
            </div>
            <el-footer>
              <input
                  class="communicate"
                  type="text"
                  v-model="input"
                  @keyup.enter="mySend()"
              />
            </el-footer>
          </el-tab-pane>
          <el-tab-pane label="在线用户" name="second">
            <div class="infinite-list-wrapper">
              <div class="onlineUsers" v-for="value in userList" :key="value.id">
                <p>{{ value }}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Flvjs from '../components/Flvjs';
import axios from "axios";
import VBarrage from '@/components/VBarrage/index.vue';

export default {
  name: "Live",
  data() {
    return {
      myCount: 0,
      list: [],
      userList: [],
      input: '',
      activeList: 'first',
      arr: [],                   //弹幕内容
      isPause: false,
      isJs: false,
      direction: 'default',
    };
  },
  mounted() {
    // this.initTestData();   //初始化弹幕数据
    this.initWebSocket();
    this.updateStudentNumber();
    this.mySetInterval();
  },
  destroyed() {
    this.websocketOnClose();
  },
  methods: {
    // 初始化模拟弹幕数据
    initTestData() {
      let arr = [
        '这个课有点意思',
      ];
      for (let i = 0; i < 6; i++) {
        for (let index = 0; index < 10; index++) {
          if (index % 2 === 0) {
            this.arr.push({
              direction: 'top',
              content: arr[parseInt(Math.random() * arr.length)],
            });
          } else {
            this.arr.push({
              direction: 'default',
              content: arr[parseInt(Math.random() * arr.length)],
            });
          }
        }
      }
    },
    // 发送弹幕
    isMyself(what) {
      return what === this.$store.state.userData.nickName ? "myself" : "others";
    },
    sendBarrage(VIP, isSelf, content) {
      if (content !== '' && content != null) {//发送弹幕
        {
          if (this.arr.length > 1) {
            if (VIP) {
              this.arr.unshift({
                content: content,
                direction: 'top',
                isSelf: isSelf,
                style: {
                  color: '#F56C6C',
                },
                isJs: this.isJs,
              });
            } else {
              this.arr.unshift({
                content: content,
                direction: 'default',
                isSelf: isSelf,
                style: {
                  color: 'white',
                },
                isJs: this.isJs,
              });
            }
          } else {
            if (VIP) {
              this.arr.push({
                content: content,
                direction: 'top',
                isSelf: isSelf,
                style: {
                  color: '#F56C6C'
                },
                isJs: this.isJs,
              });
            } else {
              this.arr.push({
                content: content,
                direction: 'default',
                isSelf: isSelf,
                style: {
                  color: 'white'
                },
                isJs: this.isJs,
              });
            }
          }
        }
      }
    },
    mySend() {
      // console.log('mySend!');
      let VIP = Date.parse(new Date()) <= Date.parse(this.$store.state.userData.vipDate);
      console.log('VIP', VIP);
      let preMsg = {
        userId: this.$store.state.userData.userId,
        type: '0',
        nickName: this.$store.state.userData.nickName,
        msg: this.input,
        timer: '',
        isVip: VIP,
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
      axios.post("http://" + this.Api + "/api/WebSocket/onlineStudents", a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        // console.log(response);
        if (response.data.code === 1000) {
          // console.log(response);
          that.myCount = response.data.data.count;
          that.userList = [];//response.data.data.student
          for (let i in response.data.data.student) {
            that.userList.push(response.data.data.student[i]);
          }
          // console.log(that.userList);
        }
      }, function (err) {
        console.log(err);
      })
    },
    initWebSocket() {
      const wsuri = "ws://" + this.Api + "/websocket/" + "1" + "/" + "0" + "/" + this.$store.state.userData.userId + '/' + this.$store.state.userData.nickName;
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
      console.log(event);
      let myEvent = JSON.parse(event.data);
      // console.log(myEvent);
      this.list.push([myEvent.nickName, myEvent.msg]);
      // console.log(this.list);
      this.sendBarrage(myEvent.vip, myEvent.userId == this.$store.state.userData.userId, myEvent.msg)
    },
    websocketOnClose(e) {
      console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean);
    },
  },
  components: {
    Flvjs,
    VBarrage,
  },
};
</script>

<style scoped>
.barrage-control {
  text-align: center;
  margin: 80px 0px;
}

.el-tab-pane {
  text-align: center;
}

.el-aside {
  overflow: hidden;
  text-align: center;
  line-height: 20px;
  font-size: 10px;
  width: 300px;
}

.el-main {
  color: #333;
  text-align: center;
  padding: 0px;
  position: relative;
  overflow: hidden;
}

.el-container {
  width: 1100px;
  margin: 20px auto;
  border: #C0C4CC 1px solid;
  border-radius: 10px;
  overflow: hidden;
}

ul {
  padding: 5px;
}

.infinite-list-wrapper {
  height: 324px;
  overflow: auto;
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
  font-size: 18px;
  padding: 20px;
}

.onlineUsers {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  margin: 10px;
  background: #EBEEF5;
  border-radius: 10px;
}

.communicate {
  width: 95%;
  height: 40px;
}
</style>


