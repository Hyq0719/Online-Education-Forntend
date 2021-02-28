<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <TeacherInfo></TeacherInfo>
  </div>
</template>

<script>
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TeacherInfo from '../components/TeacherInfo';
export default {
  components: {
    Header,
    Sidebar,
    TeacherInfo,
  },
};
</script>

<style>

</style>
