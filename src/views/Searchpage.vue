<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
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
  components: {
    Sidebar,
    Header,
    search,
    Footer,
  }
};
</script>

<style scoped>

</style>
