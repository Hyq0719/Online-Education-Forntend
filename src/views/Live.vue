<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Live></Live>
    <LiveIntroduce></LiveIntroduce>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Live from '../components/Live'
import LiveIntroduce from "../components/LiveIntroduce";
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
export default {
  components:{
    Header,
    Live,
    LiveIntroduce,
    Footer,
    Sidebar,
  },
}
</script>

<style scoped>

</style>
