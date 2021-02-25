<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <RegisterTeacher></RegisterTeacher>
  </div>
</template>

<script>
import RegisterTeacher from '../components/RegisterTeacher';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default {
  components: {
    RegisterTeacher,
    Header,
    Sidebar,
  },
};
</script>

<style>

</style>
