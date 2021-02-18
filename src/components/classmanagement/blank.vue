<template>
<div>
  点击左边选择管理项目
</div>
</template>

<script>
export default {
name: "blank",
mounted() {
  let breadcrumb = [
  {
    link: '/Classmanagement/blank',
    title: '课程管理'
  }
]
  this.$store.commit("savebreadcrumb", breadcrumb);
}
}
</script>

<style scoped>

</style>
