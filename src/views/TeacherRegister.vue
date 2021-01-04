<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <TeacherRegister></TeacherRegister>
  </div>
</template>

<script>
import TeacherRegister from '../components/TeacherRegister'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default {
  components: {
    TeacherRegister,
    Header,
    Sidebar,
  },
}
</script>

<style>

</style>
