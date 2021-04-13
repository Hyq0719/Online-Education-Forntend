<template>
  <div style="min-height: 480px;">
    <div class="card-wrapper">
  <div class="Intro">
       <h4>当前可用直播地址：</h4>
      <div v-for="(item,index) in addressData" :key="index">
      <div  style="width: 300px;margin: 0 0 0 0"><el-divider/></div>
      直播地址{{item.liveAddressId}}：{{item.liveAddress}}
      </div>
  </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addressView",
  data(){
    return{
      addressData:[],
    }
  },
  methods:{
    async getAddress() {
      let that = this;
      await axios.get('http://' + that.Api + "/api/Live_address/"
      ).then(function (res) {
        if (res.data.code === 1000) {
          console.log("address信息", res.data.data)
          that.addressData = res.data.data;
        }
      }), function (err) {
        console.log(err);
      };
    },
  },
  created() {
    this.getAddress();
  },
  mounted() {

    let breadcrumb = [
      {
        link: '/Classmanagement/blank',
        title: '帮助'
      },
      {
        link: {name: 'addressView'},
        title: '直播地址查看'
      },
    ]
    this.$store.commit("savebreadcrumb", breadcrumb)
  }
}
</script>

<style scoped>
.Intro {
  text-align: left;
  padding: 30px;
}
.card-wrapper{
  background-color: #ffffff;
  box-shadow: 0 0 10px #4d555d;
  border-radius: 5px;
  margin: 0 0 20px 0;
}
</style>
