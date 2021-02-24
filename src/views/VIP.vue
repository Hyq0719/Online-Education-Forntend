<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <VIP></VIP>
  </div>
</template>

<script>
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VIP from '../components/VIP';

export default {
  name: "Main",
  components: {
    Header,
    Sidebar,
    VIP,
  },
};
</script>

<style>

</style>
