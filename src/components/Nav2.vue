<template>
  <div class="container">
    <h3 class="tiltlefont">新手入门</h3>
    <div>
      <adview1 class="adview" :img="adpicture[0]"></adview1>
      <adview1 lass="adview" :img="adpicture[1]"></adview1>

    </div>
    <div>
      <classview1 class="classview" :img=classpicture[0] :star=star[1] :classname=classname[1]></classview1>

      <classview1 class="classview" :img=classpicture[0] :star=star[2] :classname=classname[2]></classview1>


      <classview1 class="classview" :img=classpicture[0] :star=star[3] :classname=classname[0]></classview1>

      <classview1 class="classview" :img=classpicture[0] :star=star[4]></classview1>

      <classview1 class="classview_last" :img=classpicture[0] :star=star[5]>></classview1>
    </div>
    <div>
      <classview1 class="classview" :img=classpicture[0] :star=star[6] :classname=classname[1]></classview1>

      <classview1 class="classview" :img=classpicture[0] :star=star[7] :classname=classname[2]></classview1>


      <classview1 class="classview" :img=classpicture[0] :star=star[8] :classname=classname[0]></classview1>

      <classview1 class="classview" :img=classpicture[0] :star=star[9]></classview1>

      <classview1 class="classview_last" :img=classpicture[0] :star=star[10]>></classview1>
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
  width: 700px;
  height: 150px;
  margin: 0 24px 24px 75px;
  background: #FFFFFF;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
  border-radius: 8px;
  float: left;
}

.classview {
  position: relative;
  width: 300px;
  height: 272px;
  margin: 0 24px 24px 0;
  background: #FFFFFF;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
  border-radius: 8px;
  float: left;
  /*border: 3px solid #B3C0D1;*/
  /* transition: all .2s;*/
}

.classview_last {
  position: relative;
  width: 300px;
  height: 272px;
  margin: 0 0 24px 0;
  background: #FFFFFF;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
  border-radius: 8px;
  float: left;
  /*border: 3px solid #B3C0D1;*/
  /* transition: all .2s;*/
}

.container {
  width: 1596px;
  margin-left: auto;
  margin-right: auto;
  padding: 32px 0;
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
      adpicture: [require('@/assets/ad1.jpg'), require('@/assets/ad2.jpg')],
      classpicture: [require('@/assets/class1.jpg')],
      star: [3, 4, 3.4, 3.5, 2.0, 4, 1, 2.3, 3.4, 3, 3, 3, 3, 3],
      classname: ['一晚上搞定CSS', '一晚上搞定Vue', '一晚上搞定HTML']
    }
  }
}
</script>
