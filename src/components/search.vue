<template>
  <div class="search">
    <div class="search-course" v-for="(item,index) in this.$store.state.SearchedCourseData" v-bind:key="index">
      <router-link :to="{path:'/course',query:{courseId:item.courseId}}">
        <div class="search-content">
          <div class="search-img">
            <img src="../assets/course1.webp" alt="图片丢失">
          </div>
          <div class="search-text">
            <h3 v-html="item.name"></h3>
            <h4>{{ item.intro }}</h4>
            <h5>{{ item.teacher.name }}</h5>
          </div>
        </div>
      </router-link>
    </div>
    <div class="block">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="this.$store.state.SearchedCourseData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: "search",
};
</script>

<style scoped>
.search {
  margin: 50px auto;
  width: 1100px;
}

.search-course {
  text-align: left;
  margin: 20px auto;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  box-shadow: 0 0 3px rgba(95, 101, 105, 0.15);
}

.search-course:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.search-content {
  display: flex;
  text-align: left;
}

.search-img {
  margin: 20px;
}

.search-text {
  text-align: left;
}

a {
  text-decoration: none;
  color: #1c1f21;
}
</style>
