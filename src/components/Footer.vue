<template>
  <div class="myFooter">
    <div class="img">
      <img src="../assets/SHUCESlogo.jpeg" alt="图片缺失">
    </div>
    <div class="text">
      <p>下载客户端 | 联系我们 | 新闻资讯 | 支持我们 | 加入我们</p>
      <p>Copyright © 2020-2021 沪ICP备2021003682号-1</p>
      <p>Looc网隶属于上海大学某小组</p>
    </div>
    <div class="follow">
      <el-popover
          placement="top-start"
          width="150"
          trigger="hover">
        <div class="popover-content">
          <img src="../assets/wechat.png">
        </div>
        <div slot="reference">
          <p>关注我们：</p>
          <img src="../assets/follwUsWechat.png">
        </div>
      </el-popover>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {}
  },
};
</script>

<style scoped>
.myFooter {
  border-top: 1px solid #DCDFE6;
}

.img {
  height: 100px;
  width: 100px;
  float: left;
  margin: 10px 10px 10px 150px;
}

.img img {
  height: 100%;
  width: 100%;
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

.popover-content img {
  height: 150px;
  width: 150px;
}

.clear {
  clear: both;
}
</style>
