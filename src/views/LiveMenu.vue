<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <LiveMenu></LiveMenu>
  </div>
</template>

<script>
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import LiveMenu from '../components/LiveMenu';

export default {
  components: {
    Header,
    Sidebar,
    LiveMenu,
  },
};
</script>

<style scoped>

</style>
