<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Information></Information>
    <Footer></Footer>
  </div>
</template>

<script>
import Information from '../components/Information';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default {
  components: {
    Information,
    Header,
    Sidebar,
    Footer,
  },
};
</script>

<style>

</style>
