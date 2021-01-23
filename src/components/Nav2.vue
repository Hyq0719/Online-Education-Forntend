<template>
  <div class="container">
    <h3 class="tiltlefont">新手入门</h3>
    <div>
      <adview1 class="adview" :img="adpicture[0]"></adview1>
      <adview1 class="adview" :img="adpicture[1]"></adview1>
    </div>
    <div v-for="(item,index) in star" v-bind:key="index">
      <router-link to="/course">
        <classview1 class="classview" :img=classpicture[index] :star="item" :classname=classname[index]></classview1>
      </router-link>
    </div>
  </div>
</template>

<style>
.tiltlefont {
  text-align: center;
  font-size: 20px;
  color: #4d555d;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 1px;
}

.adview {
  position: relative;
  width: 35%;
  height: 100px;
  margin: 0 10% 24px 3%;
  background: #FFFFFF;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
  border-radius: 8px;
  float: left;
}

.classview {
  position: relative;
  width: 212px;
  height: 200px;
  margin: 0 18px 24px 0;
  background: #FFFFFF;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
  border-radius: 8px;
  float: left;
}

/*.classview_last {*/
/*  position: relative;*/
/*  width: 212px;*/
/*  height: 200px;*/
/*  margin: 0 0 24px 0;*/
/*  background: #FFFFFF;*/
/*  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);*/
/*  border-radius: 8px;*/
/*  float: left;*/
/*  !*border: 3px solid #B3C0D1;*!*/
/*  !* transition: all .2s;*!*/
/*}*/

.container {
  width: 1152px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  margin-top: 10px;
  padding: 32px 0;
  clear: both;
  /*border: 3px solid #B3C0D1;*/
}
</style>

<script>
import classview1 from './childcpn/classview'
import adview1 from './childcpn/adview'

export default {
  name: 'nav2',
  components: {
    classview1,
    adview1
  },
  data() {
    return {
      adpicture: [require('@/assets/ad1.jpg'),
        require('@/assets/ad2.jpg')],
      classpicture: [require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg'),
        require('@/assets/class1.jpg')],
      star: [3, 4, 3.4, 3.5, 2.0, 4, 1, 2.3, 3.4, 3],
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
