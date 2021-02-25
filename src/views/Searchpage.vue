<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <search></search>
  </div>
</template>

<script>
import Header from "@/components/Header";
import search from "@/components/search";
import Sidebar from "@/components/Sidebar";

export default {
  components: {
    Sidebar,
    Header,
    search,
  }
};
</script>

<style scoped>

</style>
