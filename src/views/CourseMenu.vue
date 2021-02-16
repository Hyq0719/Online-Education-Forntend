<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <CourseMenu></CourseMenu>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import CourseMenu from '../components/CourseMenu';

export default {
  components: {
    Header,
    Footer,
    Sidebar,
    CourseMenu,
  },
};
</script>

<style scoped>

</style>
