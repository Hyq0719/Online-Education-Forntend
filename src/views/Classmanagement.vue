<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Course></Course>
    <classmanagement></classmanagement>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Course from "../components/Course";
import Sidebar from "../components/Sidebar";
import Footer from '../components/Footer';
import classmanagement from "@/components/classmanagement/classmanagement";

export default {
  name: "Classmanagement",
  components: {
    Header,
    Course,
    Sidebar,
    Footer,
    classmanagement,
  },
}
</script>

<style scoped>

</style>
