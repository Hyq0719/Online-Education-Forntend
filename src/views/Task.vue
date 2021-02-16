<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Task></Task>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Task from '../components/Task';
import Footer from '../components/Footer';

export default {
  components: {
    Header,
    Sidebar,
    Task,
    Footer,
  },
};
</script>

<style scoped>

</style>
