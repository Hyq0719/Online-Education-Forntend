<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <RegisterTeacher></RegisterTeacher>
    <Footer></Footer>
  </div>
</template>

<script>
import RegisterTeacher from '../components/RegisterTeacher'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default {
  components: {
    RegisterTeacher,
    Header,
    Sidebar,
    Footer,
  },
}
</script>

<style>

</style>
