<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <classmanagement></classmanagement>
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import classmanagement from "@/components/classmanagement/classmanagement";

export default {
  name: "Classmanagement",
  components: {
    Header,
    Sidebar,
    classmanagement,
  },
}
</script>

<style scoped>

</style>
