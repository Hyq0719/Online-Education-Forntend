<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Collect></Collect>
  </div>
</template>

<script>
import Collect from '../components/Collect';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default {
  components: {
    Collect,
    Header,
    Sidebar,
  },
};
</script>

<style>

</style>
