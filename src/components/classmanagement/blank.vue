<template>
<div style="min-height: 480px">
  {{ text }}
</div>
</template>

<script>
export default {
name: "blank",
  data(){
  return{
    text:"",
  }
  },
mounted() {
    let that =this;
    if (that.$store.state.userData.teacherStatus === 1)
    {
      that.text="教师审核通过，请点击左边栏管理课程";
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        }
      ]
      this.$store.commit("savebreadcrumb", breadcrumb);
        }
    else if (that.$store.state.userData.teacherStatus === 0)
    {
     that.$router.push('/information');
      that.$alert('教师审核未通过，请完善个人信息。管理员联系方式，见右下方二维码', '提示', {
        confirmButtonText: '确定',
      });
    }

}
}
</script>

<style scoped>

</style>
