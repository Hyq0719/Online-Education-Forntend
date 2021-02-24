<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <LoginTeacher></LoginTeacher>
  </div>
</template>

<script>
import LoginTeacher from '../components/LoginTeacher';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default {
  components: {
    LoginTeacher,
    Header,
    Sidebar,
  },
};
</script>

<style>

</style>
