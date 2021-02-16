<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Login></Login>
    <Footer></Footer>
  </div>
</template>

<script>
import Login from '../components/Login';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default {
  components: {
    Login,
    Header,
    Sidebar,
    Footer,
  },
};
</script>

<style>

</style>
