<template>
  <div>
    <Sidebar></Sidebar>
    <Header slot="search">
      <div></div>
    </Header>
    <search></search>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import search from "@/components/search";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default {
  name: "Searchpage",
  components: {
    Sidebar,
    Header,
    search,
    Footer,
  }
}
</script>

<style scoped>

</style>
