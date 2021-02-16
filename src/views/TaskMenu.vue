<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <TaskMenu></TaskMenu>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskMenu from '../components/TaskMenu';
import Footer from '../components/Footer';

export default {
  components: {
    Header,
    Sidebar,
    TaskMenu,
    Footer,
  },
};
</script>

<style scoped>

</style>
