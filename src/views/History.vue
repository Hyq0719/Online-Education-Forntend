<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <History></History>
  </div>
</template>

<script>
import History from '../components/History';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default {
  components: {
    History,
    Header,
    Sidebar,
  },
};
</script>

<style>

</style>
