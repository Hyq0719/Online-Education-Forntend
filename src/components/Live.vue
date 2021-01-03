<template>
  <el-container>
    <el-main>
      <Flvjs></Flvjs>
    </el-main>
    <el-aside width="300px">
      <div class="infinite-list-wrapper" style="overflow:auto; height:464px;">
        <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
          <li v-for="i in count" v-bind:key='i' class="list-item">{{ i }}</li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
      <div>
        <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable
            size="large">
        </el-input>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import Flvjs from '../components/Flvjs'

export default {
  name: "Live",
  data() {
    return {
      count: 10,
      loading: false,
      input: '',
    }
  },
  computed: {
    noMore() {
      return this.count >= 40
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 200)
    }
  },
  components: {
    Flvjs,
  },
}
</script>

<style scoped>
.el-aside {
  text-align: center;
  line-height: 20px;
  font-size: 10px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  padding: 0px;
}

.el-container {
  margin: 0px 100px;
  height: 504px;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.communicate {

}
</style>
