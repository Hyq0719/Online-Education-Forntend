<template>
  <div id="app">
    <router-view class="body" />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
  },
}
</script>

<style>
#app {
  min-width: 1200px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style scope>
.body{
  min-height: 580px;
}
</style>
