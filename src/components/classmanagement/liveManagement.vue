<template>
 <div>
    直播管理
 </div>
</template>

<script>
export default {
name: "liveManagement",
  mounted() {
    let breadcrumb = [
    {
      link: '/Classmanagement/blank',
      title: '课程管理'
    },
    {
      link: {name: 'liveManagement'},
      title: '直播管理'
    },
  ]
    this.$store.commit("savebreadcrumb", breadcrumb)
  }
}
</script>

<style scoped>

</style>
