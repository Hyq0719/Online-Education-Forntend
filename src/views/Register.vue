<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Register></Register>
    <Footer></Footer>
  </div>
</template>

<script>
import Register from '../components/Register'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default {
  components: {
    Register,
    Header,
    Sidebar,
    Footer,
  },
}
</script>

<style>

</style>
