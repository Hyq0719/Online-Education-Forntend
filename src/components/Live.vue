<template>
  <el-container style="overflow :hidden">
    <el-main style="position: relative;overflow :hidden">
      <Flvjs></Flvjs>
      <v-barrage :arr="arr"
                 :isPause="isPause"
                 :percent="100"
      >
      </v-barrage>
    </el-main>
    <el-aside width="300px">
      <el-header class="onlineNumber">{{ myCount }}人正在观看</el-header>
      <el-tabs type="card" v-model="activeList" stretch>
        <el-tab-pane label="聊天室" name="first">
          <div class="infinite-list-wrapper">
            <ul
                class="list">
              <li v-for="item in list" :key='item' :class="isMyself(item[0])">{{ item[0] }}：{{ item[1] }}</li>
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
import VBarrage from '@/components/VBarrage/index.vue'

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
      direction: 'default'
    }
  },
  mounted() {
    this.initTestData();   //初始化弹幕数据
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
      ]
      for (let i = 0; i < 6; i++) {
        for (let index = 0; index < 10; index++) {
          if (index % 2 == 0) {
            this.arr.push({
              direction: 'top',
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
    isMyself(what) {
      return what == this.$store.state.userData.nickName ? "myself" : "others";
    },
    mySend() {
      // console.log('mySend!');
      let preMsg = {
        userId: this.$store.state.userData.userId,
        type: '0',
        nickName: this.$store.state.userData.nickName,
        msg: this.input,
        timer: '',
      };
      // console.log(preMsg);
      let toSend = JSON.stringify(preMsg);
      // console.log(toSend);
      this.chatRoomWebsocket.send(toSend); //将消息发送到服务端


      if (this.arr.length > 1 && this.input != '' && this.input != null) {   //发送弹幕
        this.arr.unshift({
          content: this.input,
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
          content: this.input,
          direction: this.direction,
          isSelf: true,
          style: {
            color: 'red'
          },
          isJs: this.isJs
        });
      }

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
    VBarrage,
  },
}
</script>

<style scoped>
.el-tab-pane {
  text-align: center;
}

.el-aside {
  overflow: hidden;
  text-align: center;
  line-height: 20px;
  font-size: 10px;
}

.el-main {
  color: #333;
  text-align: center;
  padding: 0px;
}

.el-container {
  margin: 20px 100px;
  height: 506px;
  border: #C0C4CC 1px solid;
  border-radius: 10px;
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

.communicate {
  width: 95%;
  height: 40px;
}
</style>


