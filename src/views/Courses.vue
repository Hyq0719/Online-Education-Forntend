<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Course></Course>
  </div>
</template>

<script>
import Header from "../components/Header";
import Course from "../components/Course";
import Sidebar from "../components/Sidebar";

export default {
  name: "Courses",
  components: {
    Header,
    Course,
    Sidebar,
  },
}
</script>

<style scoped>

</style>
