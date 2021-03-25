<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Homework></Homework>
  </div>
</template>

<script>
import Homework from '../components/Homework';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default {
  components: {
    Homework,
    Header,
    Sidebar,
  },
};
</script>

<style>

</style>
