<template>
  <div></div>
</template>

<script>

export default {
  name: "Index",
  created() {
    this.index();
  },
  methods: {
    index() {
      //跳转首页
      this.$router.push('/main');
    },
  },
};
</script>

<style scoped>

</style>
