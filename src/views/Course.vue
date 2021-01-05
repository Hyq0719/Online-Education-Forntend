<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Course></Course>
    <CourseIntroduce></CourseIntroduce>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Course from "../components/Course";
import Sidebar from "../components/Sidebar";
import Footer from '../components/Footer'
import CourseIntroduce from "../components/CourseIntroduce";

export default {
  components: {
    Header,
    Course,
    Sidebar,
    CourseIntroduce,
    Footer,
  },
}
</script>

<style scoped>

</style>
