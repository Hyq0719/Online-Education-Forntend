<template>
  <div class="container">
    <h2>好课推荐</h2>
    <div v-for="(item,index) in star" v-bind:key="index">
      <router-link to="/course">
        <classview1 class="classview" :img=classpicture[index] :star="item" :classname=classname[index]></classview1>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.container h2 {
  text-align: left;
  margin: 30px 20px;
  letter-spacing: 2px;
}

.classview {
  position: relative;
  width: 22%;
  height: 240px;
  margin: 15px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
  border-radius: 8px;
  float: left;
}

.container {
  margin: 10px 200px;
  padding: 32px 0;
  clear: both;
}
</style>

<script>
import classview1 from './childcpn/classview'

export default {
  name: 'nav2',
  components: {
    classview1,
  },
  data() {
    return {
      adpicture: [require('@/assets/ad1.jpg'),
        require('@/assets/ad2.jpg')],
      classpicture: [require('@/assets/course1.webp'),
        require('@/assets/course2.webp'),
        require('@/assets/course3.webp'),
        require('@/assets/course4.webp'),
        require('@/assets/course5.webp'),
        require('@/assets/course6.webp'),
        require('@/assets/course7.webp'),
        require('@/assets/course8.webp'),],
      star: [3, 4, 3.4, 3.5, 2.0, 4, 1, 2.3],
      classname: ['一晚上搞定CSS',
        '一晚上搞定Vue',
        '一晚上搞定HTML',
        '7天学会java',
        '5天学会C++',
        '8天学会php',
        '一个月搞定C++对象']
    }
  }
}
</script>
