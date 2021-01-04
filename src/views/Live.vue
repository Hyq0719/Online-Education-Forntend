<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Live></Live>
    <Introduce></Introduce>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Live from '../components/Live'
import Introduce from "../components/Introduce";
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

export default {
  components: {
    Header,
    Live,
    Introduce,
    Footer,
    Sidebar,
  },
}
</script>

<style scoped>

</style>
