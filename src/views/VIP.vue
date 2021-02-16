<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <VIP></VIP>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import VIP from '../components/VIP';

export default {
  name: "Main",
  components: {
    Header,
    Footer,
    Sidebar,
    VIP,
  },
};
</script>

<style>

</style>
