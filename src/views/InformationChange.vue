<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <InformationChange></InformationChange>
  </div>
</template>

<script>
import InformationChange from '../components/InformationChange'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default {
  components: {
    InformationChange,
    Header,
    Sidebar,
  },
}
</script>

<style>

</style>
