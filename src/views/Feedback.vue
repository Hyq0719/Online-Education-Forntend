<template>
  <div>
    <Header></Header>
      <div class="feedback">
        <h3>
          意见反馈
        </h3>
        <el-divider></el-divider>
        <div class="text_wrapper">
          <div>
            <div class="select_wrapper">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="textarea">
              </el-input>
            </div>
            <div>
              <button class="confirm">确认</button>
            </div>
          </div>
        </div>
          <div>
            <div class="feedback">
              <h3>
                我们的联系方式
              </h3>
              <el-divider></el-divider>
              <h5>邮箱：123456@163.com</h5>
              <h5>电话：123456</h5>
            </div>
            <div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
</template>

<script>
import Header from "../components/Header";
import Footer from '../components/Footer';

export default {
  name: "feedback",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      textarea: '',
      options: [{
        value: '选项1',
        label: '课程意见'
      }, {
        value: '选项2',
        label: '使用意见',
      }, {
        value: '选项3',
        label: '教师意见'
      }, {
        value: '选项4',
        label: '其他意见'
      },],
      value: ''
    };
  },
};
</script>

<style scoped>
.feedback {
  margin: 50px 20px;
  text-align: left;
}

.select_wrapper {
  margin: 20px 0;
}

.text_wrapper {
  margin: 10px 50px;
}

button {
  cursor: pointer;
  float: right;
  color: #fff;
  background: #00a1d6;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 30px;
  text-align: center;
  width: 90px;
  border-radius: 4px;
  border: none;
  margin: 10px 5px;
}
button:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}
</style>
