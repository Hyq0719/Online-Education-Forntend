<template>
  <div id="app">
    <router-view/>
<!--    <flvjs></flvjs>-->
  </div>
</template>

<script>
// import flvjs from "./components/flvjs.vue";
export default {
  name: 'App',
  components: {
    // flvjs
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
