<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Nav1></Nav1>
    <div style="height:1000px;"></div>
    <Footer></Footer>

  </div>
</template>

<script>
import Header from '../components/Header'
import Nav1 from '../components/Nav1'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

export default {
  components: {
    Header,
    Nav1,
    Footer,
    Sidebar,
  },
}
</script>

<style>

</style>
