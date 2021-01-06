<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Curriculum></Curriculum>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Curriculum from '../components/Curriculum'

export default {
  components: {
    Header,
    Footer,
    Sidebar,
    Curriculum,
  },
}
</script>

<style scoped>

</style>
