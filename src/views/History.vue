<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <History></History>
    <Footer></Footer>
  </div>
</template>

<script>
import History from '../components/History';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default {
  components: {
    History,
    Header,
    Sidebar,
    Footer,
  },
};
</script>

<style>

</style>
