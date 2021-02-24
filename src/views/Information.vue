<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Information></Information>
  </div>
</template>

<script>
import Information from '../components/Information';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default {
  components: {
    Information,
    Header,
    Sidebar,
  },
};
</script>

<style>

</style>
