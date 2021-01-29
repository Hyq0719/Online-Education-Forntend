<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Nav1></Nav1>
    <nav2></nav2>
    <Article></Article>
    <Footer></Footer>

  </div>
</template>

<script>
import Header from '../components/Header'
import Nav1 from '../components/Nav1'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Nav2 from '../components/Nav2'
import Article from '../components/Article'

export default {
  name: "Main",
  components: {
    Header,
    Nav1,
    Footer,
    Sidebar,
    Nav2,
    Article,
  },
}
</script>

<style>

</style>
