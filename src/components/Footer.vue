<template>
  <div class="myFooter">
    <img src="../assets/logo.png">
    <div class="text">
      <p>下载客户端 | 联系我们 | 新闻资讯 | 支持我们 | 加入我们</p>
      <p>Copyright © 2020-2021 沪ICP备2021003682号-1</p>
      <p>Looc网隶属于上海大学某小组</p>
    </div>
    <div class="follow">
      <p>关注我们：</p>
      <img src="../assets/follwUsWechat.png">
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: "Footer",
}
</script>

<style scoped>
.myFooter {
  border-top: 1px solid #DCDFE6;
  height: 60px;
}

.myFooter img {
  float: left;
  height: 100px;
  width: 100px;
  margin: 10px 10px 10px 150px;
}

.text {
  float: left;
  color: grey;
  font-size: 13px;
  margin: 10px;
  text-align: left;
}

.follow {
  float: right;
  color: grey;
  font-size: 15px;
  text-align: left;
  margin: 10px 150px 10px 0;
}

.follow p {
  float: left;
}

.follow img {
  background: #606266;
  height: 25px;
  width: 25px;
  margin: 10px;
  float: left;
}

.clear {
  clear: both;
}
</style>
