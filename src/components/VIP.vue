<template>
  <div class="VIP">
    <div class="VIP-title">
      <h2>加入会员</h2>
      <el-divider></el-divider>
    </div>
    <div class="VIP-content VIP-content-month">
      <h1>月会员</h1>
      <el-divider></el-divider>
      <p class="money">
        <span class="money-sign">￥</span>
        <span class="money-number">45</span>
        <span class="money-unit">/月</span>
      </p>
      <el-button type="danger" @click="Vip(1)">立即开通</el-button>
    </div>
    <div class="VIP-content VIP-content-halfYear">
      <h1>半年会员</h1>
      <el-divider></el-divider>
      <p class="money">
        <span class="money-sign">￥</span>
        <span class="money-number">100</span>
        <span class="money-unit">/半年</span>
      </p>
      <el-button type="danger" @click="Vip(2)">立即开通</el-button>
    </div>
    <div class="VIP-content VIP-content-year">
      <h1>年会员</h1>
      <el-divider></el-divider>
      <p class="money">
        <span class="money-sign">￥</span>
        <span class="money-number">150</span>
        <span class="money-unit">/年</span>
      </p>
      <el-button type="danger" @click="Vip(3)">立即开通</el-button>
    </div>
    <div class="VIP-content VIP-content-reward">
      <h1>打赏</h1>
      <el-divider></el-divider>
      <p class="money money-reward">
        <span class="money-sign money-sign-reward">￥</span>
        <span><el-input v-model="input" placeholder="请输入内容"></el-input></span>
      </p>
      <el-button type="info">我要打赏</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VIP",
  data() {
    return {
      input: '10'
    };
  },
  methods: {
    Vip(type) {
      let that = this;
      let a = new URLSearchParams();
      a.append('type', type);
      a.append('user_id', this.$store.state.userData.userId);
      axios.post("http://" + this.Api + "/api/Student/studentVip?" + a, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.JWT,
        }
      }).then(function (response) {
        console.log("成功开通Vip", response);
        that.$message({
          message: '成功开通Vip！时间持续至：' + response.data.data,
          type: 'success'
        });
        axios.post("http://" + that.Api + "/api/Student/getStudentById?" + a, null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': that.$store.state.JWT,
          }
        }).then(function (res) {
          console.log("成功获取学生信息", res);
          that.$store.commit('saveData', res.data.data);
        }, function (err) {
          console.log(err);
        });
      }, function (err) {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.VIP {
  margin: auto;
  width: 1100px;
}

.VIP-title h2 {
  margin: 30px;
}

.VIP-content {
  display: inline-block;
  margin: 30px 15px 50px 15px;
  height: 400px;
  width: 240px;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.VIP-content button {
  font-size: 20px;
  height: 60px;
  width: 190px;
}

.VIP-content h1 {
  line-height: 100px;
  height: 100px;
  color: white;
  margin-botton: 30px;
}

.VIP-content-month h1 {
  background: #E6A23C;
}

.VIP-content-halfYear h1 {
  background: #67C23A;
}

.VIP-content-year h1 {
  background: #409EFF;
}

.VIP-content-reward h1 {
  background: #909399;
}

.money {
  color: #F56C6C;
  margin: 50px auto;
}

.money-sign {
  font-size: 22px;
}

.money-number {
  font-size: 54px;
}

.money-unit {
  font-size: 18px;
}

.money-reward {
  margin: 60px 50px;
  color: #1c1f21;
}

.el-input {
  margin-left: 5px;
  width: 80%;
  display: inline-block;
  font-size: 18px;
}
</style>
