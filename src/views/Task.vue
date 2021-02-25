<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Task></Task>
  </div>
</template>

<script>
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Task from '../components/Task';

export default {
  components: {
    Header,
    Sidebar,
    Task,
  },
};
</script>

<style scoped>

</style>
