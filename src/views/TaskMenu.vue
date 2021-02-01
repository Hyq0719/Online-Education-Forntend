<template>
  <div>
    <Sidebar></Sidebar>
    <Header></Header>
    <TaskMenu></TaskMenu>
  </div>
</template>

<script>
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TaskMenu from '../components/TaskMenu'

export default {
  components: {
    Header,
    Sidebar,
    TaskMenu,
  },
}
</script>

<style scoped>

</style>
