<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Live></Live>
    <LiveIntroduce></LiveIntroduce>
  </div>
</template>

<script>
import Header from '../components/Header';
import Live from '../components/Live';
import LiveIntroduce from "../components/LiveIntroduce";
import Sidebar from '../components/Sidebar';

export default {
  components: {
    Header,
    Live,
    LiveIntroduce,
    Sidebar,
  },
};
</script>

<style scoped>

</style>
