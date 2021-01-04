<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <Register></Register>
  </div>
</template>

<script>
import Register from '../components/Register'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default {
  components: {
    Register,
    Header,
    Sidebar,
  },
}
</script>

<style>

</style>
