<template>
  <div class="LIVE">
    <div class="WholeCourse">
      <h3>
        全部直播
      </h3>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="25">
      <el-col :span="6" v-for="item in course" v-bind:key="item.id">
        <router-link to="/live">
          <div class="grid-content">
            <img :src="item.src" alt="图片缺失">
            <h4>{{ item.name }}</h4>
            <h5>{{ item.school }}</h5>
            <h6>{{ item.teacher }}</h6>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "LiveMenu",
  data() {
    return {
      course: [
        {
          name: "高等数学1",
          school: "浙江大学",
          teacher: "老师1",
          src: require('../assets/live1.webp'),
        },
        {
          name: "高等数学2",
          school: "上海大学",
          teacher: "老师2",
          src: require('../assets/live2.webp'),
        },
        {
          name: "高等数学3",
          school: "同济大学",
          teacher: "老师3",
          src: require('../assets/live3.webp'),
        },
        {
          name: "高等数学4",
          school: "北京大学",
          teacher: "老师4",
          src: require('../assets/live4.webp'),
        },
        {
          name: "高等数学5",
          school: "清华大学",
          teacher: "老师5",
          src: require('../assets/course5.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course6.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course7.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course8.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course9.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course10.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course11.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course12.webp'),
        },
        {
          name: "高等数学1",
          school: "浙江大学",
          teacher: "老师1",
          src: require('../assets/course1.webp'),
        },
        {
          name: "高等数学2",
          school: "上海大学",
          teacher: "老师2",
          src: require('../assets/course2.webp'),
        },
        {
          name: "高等数学3",
          school: "同济大学",
          teacher: "老师3",
          src: require('../assets/course3.webp'),
        },
        {
          name: "高等数学4",
          school: "北京大学",
          teacher: "老师4",
          src: require('../assets/course4.webp'),
        },
        {
          name: "高等数学5",
          school: "清华大学",
          teacher: "老师5",
          src: require('../assets/course5.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course6.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course7.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course8.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course9.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course10.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course11.webp'),
        },
        {
          name: "高等数学6",
          school: "上海大学",
          teacher: "老师6",
          src: require('../assets/course12.webp'),
        },
      ]
    }
  }
}
</script>

<style scoped>
.grid-content:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.WholeCourse {
  margin: 50px 20px;
  text-align: left;
}

.LIVE {
  margin: auto;
  width: 1100px;
}

.grid-content {
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  height: 260px;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.grid-content img {
  border-radius: 10px;
  width: 100%;
}

.grid-content h4 {
  margin: 5px;
}

.grid-content h5 {
  margin: 5px;
}

.grid-content h6 {
  margin: 5px;
  margin-bottom: 20px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

a {
  text-decoration: none;
  color: #1c1f21;
}

.router-link-active {
  text-decoration: none;
}

.block {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
