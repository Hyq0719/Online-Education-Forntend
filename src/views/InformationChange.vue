<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <InformationChange></InformationChange>
    <Footer></Footer>
  </div>
</template>

<script>
import InformationChange from '../components/InformationChange'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default {
  components: {
    InformationChange,
    Header,
    Sidebar,
    Footer,
  },
}
</script>

<style>

</style>
