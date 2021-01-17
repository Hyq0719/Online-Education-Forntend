<template>
  <div class="search-box">
    <div class="search-wrap">
      <img src="../assets/logo.png" alt="搜索logo">
      <input class="search-word" type="text" v-model="input" @keyup.enter="Send"/>
      <div>
        <button class="search-bottom" @click="reflash">搜索</button>
      </div>
    </div>
    <div>
      <hr>
    </div>
    <div class="container">
      <div v-for="(item,index) in star" v-bind:key="index">
        <router-link to="/course">
          <classview class="classview" :img=classpicture[index] :star="item" :classname=classname[index]></classview>
        </router-link>
      </div>
    </div>
    <div class="find-wrap">
      <button class="find-bottom" v-show="showflag" @click="sub()">上一页</button>
      <button class="find-bottom" @click="sub()">{{ pagenumber[0] }}</button>
      <button class="find-bottom" @click="sub()">{{ pagenumber[1] }}</button>
      <button class="find-bottom" @click="sub()">{{ pagenumber[2] }}</button>
      <button class="find-bottom" @click="add()">{{ pagenumber[3] }}</button>
      <button class="find-bottom" @click="add()">{{ pagenumber[4] }}</button>
      <button class="find-bottom" @click="add()">{{ pagenumber[5] }}</button>
      <button class="find-bottom" @click="add()">{{ pagenumber[6] }}</button>
      <span class="text">***</span>
      <button class="find-bottom">{{ totalpage }}</button>
      <button class="find-bottom" @click="add()">下一页</button>
    </div>
  </div>
</template>

<script>
import classview from "@/components/childcpn/classview";

export default {
  name: "search",
  methods: {
    send() {
    },
    add() {
      var x;
      if (this.pagenumber[6] < this.totalpage) {
        for (x = 0; x < 7; x++) this.pagenumber[x]++;
      }
      this.showflag = 1;
      this.pagenumber.push(1);
      this.pagenumber.pop();
    },
    sub() {
      var x;
      if (this.pagenumber[0] > 1) {
        for (x = 0; x < 7; x++) this.pagenumber[x]--;
      }
      if (this.pagenumber[0] === 1) this.showflag = 0;
      this.pagenumber.push(1);
      this.pagenumber.pop();
    },
    reflash() {
    },
  }
  ,
  components: {
    classview
  }
  ,
  data() {
    return {
      input: '',
      classpicture: [require('@/assets/vue.jpg'),
        require('@/assets/vue.jpg'),
        require('@/assets/vue.jpg'),
        require('@/assets/vue.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg')],
      star: [3, 4, 3.4, 3.5, 2.0, 4, 1, 2.3, 3.4, 3],
      classname: ['一晚上搞定Vue',
        '两晚上搞定Vue',
        '三晚上搞定Vue',
        '7天学会Vue',
        '5天学会Vue',
        '8天学会Vue',
        '一个月搞定Vue组件'],
      pagenumber: [1, 2, 3, 4, 5, 6, 7],
      totalpage: 50,
      showflag: 0,
    }
  }
}
</script>

<style scoped>
button:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

hr {
  background-color: #cccccc;
  margin-top: 30px;
  height: 2px;
  border: none;
}

.search-box {
  margin: 0;
  padding: 0;
  padding-top: 40px;
  overflow: hidden;
  clear: both;
}

.search-word {
  height: 18px;
  box-shadow: none;
  padding: 11px 15px;
  background: transparent;
  width: 296px;
  border: 2px solid #ccd0d7;
  border-radius: 4px;
  font-size: 16px;
  color: #222;
  float: left;
  margin-right: 10px;
}

.search-bottom {
  cursor: pointer;
  float: left;
  color: #fff;
  background: #00a1d6;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 42px;
  text-align: center;
  width: 90px;
  border-radius: 4px;
  border: none;
}

.find-bottom {
  cursor: pointer;
  padding: 10px 14px;
  float: left;
  color: #1c1f21;
  background: #ffffff;
  font-size: 16px;
  /*letter-spacing: 2px;*/
  /*line-height: 42px;*/
  text-align: center;
  width: auto;
  border-radius: 4px;
  margin-left: 10px;
  border: 1px solid #1c1f21;
}

.text {
  /*cursor: pointer;*/
  padding: 10px 14px;
  float: left;
  color: #1c1f21;
  background: #ffffff;
  font-size: 16px;
  /*letter-spacing: 2px;*/
  /*line-height: 42px;*/
  text-align: center;
  width: auto;
  border-radius: 4px;
  margin-left: 10px;
}

.search-wrap {
  height: 44px;
  margin: 0 auto;
  position: relative;
  width: 587px;
}


.find-wrap {
  height: 44px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  width: 700px;
  clear: both;
}

img {
  height: 60px;
  float: left;
  margin-right: 40px;
}
</style>
