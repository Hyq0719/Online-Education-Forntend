<template>
  <div>
    <Sidebar></Sidebar>
    <Header>
      <div></div>
    </Header>
    <classmanagement></classmanagement>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import classmanagement from "@/components/classmanagement/classmanagement";
import Footer from '../components/Footer';

export default {
  name: "Classmanagement",
  components: {
    Header,
    Sidebar,
    classmanagement,
    Footer,
  },
};
</script>

<style scoped>

</style>
