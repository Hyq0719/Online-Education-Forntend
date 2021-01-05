<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <div class="WholeCourse">
      <h3>
        全部课程
      </h3>
    </div>
    <Curriculum></Curriculum>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Curriculum from '../components/Curriculum'

export default {
  components: {
    Header,
    Footer,
    Sidebar,
    Curriculum,
  },
}
</script>

<style scoped>
.WholeCourse {
  margin: 30px 30px;
  text-align: left;
}
</style>
