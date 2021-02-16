<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <LoginTeacher></LoginTeacher>
    <Footer></Footer>
  </div>
</template>

<script>
import LoginTeacher from '../components/LoginTeacher';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default {
  components: {
    LoginTeacher,
    Header,
    Sidebar,
    Footer,
  },
};
</script>

<style>

</style>
