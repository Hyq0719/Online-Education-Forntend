<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <CourseMenu></CourseMenu>
  </div>
</template>

<script>
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CourseMenu from '../components/CourseMenu';

export default {
  components: {
    Header,
    Sidebar,
    CourseMenu,
  },
};
</script>

<style scoped>

</style>
