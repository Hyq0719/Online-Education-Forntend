<template>
  <div class="search-box">
    <div class="search-wrap">
      <img src="../assets/logo.png">
      <input class="search-word"
             type="text"
             v-model="input"
             @keyup.enter="Send()"
      />
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
  </div>
</template>

<script>
import classview from "@/components/childcpn/classview";

export default {
  name: "search",
  methods: {
    send() {
    },
    reflash() {
    },
  },
  components: {classview},
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
        '一个月搞定Vue组件']
    }
  }
}
</script>

<style scoped>
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
}

.search-wrap {
  height: 44px;
  margin: 0 auto;
  position: relative;
  width: 587px;
}

img {
  height: 60px;
  float: left;
  margin-right: 40px;
}
</style>
