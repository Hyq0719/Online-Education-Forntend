<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Login></Login>
  </div>
</template>

<script>
import Login from '../components/Login';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default {
  components: {
    Login,
    Header,
    Sidebar,
  },
};
</script>

<style>

</style>
