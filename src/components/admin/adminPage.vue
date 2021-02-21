<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238,241,246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>审核管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <router-link :to="{name:'teacherAudit'}">教师账号审核</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{name:'classAudit'}">课程审核</router-link>
            </el-menu-item>

          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <classbread :breadcrumb=breadcrumb>
        </classbread>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<style scoped>

.el-carousel__item img {
  height: 100%;
  width: 100%;
}

</style>

<script>
import classbread from "@/components/classmanagement/classbread";


export default {
  name: 'adminPage',
  components: {
    classbread
  },
  computed: {
    breadcrumb: function () {
      return this.$store.state.breadcrumb
    },
  }
}
;
</script>

<style scoped>
a:hover {
  text-decoration: none;
  color: #ffd04b;
}

a {
  text-decoration: none;
  color: #99a9bf;
}
</style>
