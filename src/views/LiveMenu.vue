<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <LiveMenu></LiveMenu>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import LiveMenu from '../components/LiveMenu'

export default {
  components: {
    Header,
    Footer,
    Sidebar,
    LiveMenu,
  },
}
</script>

<style scoped>

</style>
