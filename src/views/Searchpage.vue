<template>
  <div>
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

export default {
  name: "Searchpage",
  components: {
    Header,
    search,
    Footer,
  }
}
</script>

<style scoped>

</style>
