<template>
  <div>
  <div v-for="(item,index) in evalabel" v-bind:key="index">
    <div class="evaluatebox">
      <span class="demonstration">{{item}}</span>
      <el-rate
          v-model="num[index]"
          :colors="colors"
          class="star"
          show-score
          @change="passvalue(num,index)">
      </el-rate>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "classevaluate",
  props: {
    evalabel: {
      tpye: Array,
    },
    colors: {
      type: Array,
    }
  },
  data() {
    return{
      num: [null,null,null,null,null],
    }
  },
  methods: {
    passvalue(num,index) {
      this.$emit('pass', num,index);
    }
  }
}
</script>

<style scoped>
.star {
  float: left;
  margin-left: 10%;
}

.demonstration {
  font-size: 16px;
  color: #4d555d;
  font-weight: 500;
  overflow: hidden;
  float: left;
  margin: 0;
}

.evaluatebox {
  width: 100%;
  height: 16%;
  margin: 2%;
  padding: 0;
  overflow: hidden;
}
</style>
