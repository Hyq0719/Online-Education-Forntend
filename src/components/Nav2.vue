<template>
  <div class="NAV2">
    <h2>全部直播</h2>
    <div class="Course-content" v-if="this.$store.state.MainMenuLiveData">
      <div class="Course-content-content" v-for="(item,index) in this.$store.state.MainMenuLiveData.list.slice(0, 5)"
           v-bind:key="index" @click="Live(item.liveId)">
        <Menu :name="item.liveName" :teacherName="item.intro" :liveDate="item.liveDate"
              :coursePic="item.livePicUrl"></Menu>
      </div>
    </div>
    <h2>好课推荐</h2>
    <div class="Course-content" v-if="this.$store.state.MainMenuCourseData">
      <div class="Course-content-content" v-for="(item,index) in this.$store.state.MainMenuCourseData.slice(0, 5)"
           v-bind:key="index" @click="Course(item.courseId)">
        <Menu :name="item.name" :teacherName="item.teacher.name" :coursePic="item.coursePic" :isFree="1" :VIP="item.needVip"></Menu>
      </div>
    </div>
    <h2>精彩评价</h2>
    <el-row :gutter="20" class="comment">
      <el-col :span="6" v-for="item in comment" v-bind:key="item.id">
        <router-link to="/course">
          <div class="grid-content">
            <img :src="item.src" alt="图片缺失">
            <h4>{{ item.nickname }}</h4>
            <div class="clear"></div>
            <p>{{ item.comment }}</p>
            <h6>来自《{{ item.course }}》</h6>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Menu from "@/components/childcpn/Menu";
import axios from "axios";

export default {
  name: 'nav2',
  components: {
    Menu,
  },
  data() {
    return {
      comment: [
        {
          nickname: "张三",
          comment: "说实话，比自己看课本要容易接受的多。时间虽短，但猴博士都抓到了解题的精髓，通俗易懂，不论是线代小白还是学的比较扎实的学霸，都是有必要听一下的。",
          course: "线性代数",
          src: require('../assets/studentheader1.jpg'),
        },
        {
          nickname: "李四",
          comment: "1、课件精美。看得出，图片和配乐都是精心编排的。我家6岁半的小妞特别喜欢开头的音乐。就连老师的服装，也常换常新，比如，春节的两节，就特意选择了红色和黄色两种喜庆的衣服出镜。 2、内容妙趣横生。从古希腊神话讲到中国神话，再穿插古诗词，每一小节都听得津津有味。中间有天文知识的介绍，不枯燥，容易接受。 3、主讲人幽默风趣。徐老师除了帅出天际，已经到了宇宙星空以外，还特别的幽默，这一点从课件内到讨论区，都可以感受得到。",
          course: "天文漫谈",
          src: require('../assets/studentheader2.jpg'),
        },
        {
          nickname: "王五",
          comment: "非常实用的一门课程。打破了我，以及很多基层老师包括校长都有错误的观念：感觉这个要花很多钱、很多时间。当然老师备课、制作课程自然需要时间，但是本门课程提出的各种简洁有效的方法已经大幅度减轻了相关工作量。尤其是其中一些关键步骤和标准化程序的归纳总结非常到位。当然，这也得益于现代科技的发展，让视频制作、剪辑变的如此简单。",
          course: "网络设计",
          src: require('../assets/studentheader3.jpg'),
        },
        {
          nickname: "赵六",
          comment: "我是中学教师，虽然心理学的知识很多，但很早就想找到适合中小学生的心理学知识，这部分内容针对性很强，很适用。我要继续努力学习，学以致用，帮助中小学生解决心理问题，帮助他们快乐成长。",
          course: "心理学",
          src: require('../assets/studentheader4.jpg'),
        },
      ],
    };
  },
  created() {
    this.initCourse();
    this.initLive();
  },
  methods: {
    initCourse() {
      let that = this;
      axios.get("http://" + this.Api + "/api/Course/getClass", {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取首页课程菜单", response);
        that.$store.commit('saveMainMenuCourseData', response.data);
      }, function (err) {
        console.log(err);
      });
    },
    initLive(){
      let that = this;
      let a = new URLSearchParams;
      a.append("page", 1);
      axios.get("http://" + this.Api + "/api/Live/findAllValidLive?" + a, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        console.log("获取首页直播菜单", response);
        that.$store.commit('saveMainMenuLiveData', response.data.data);
      }, function (err) {
        console.log(err);
      });
    },
    Live(liveId) {
      this.$router.push({path: '/live', query: {courseId: liveId}});
    },
    Course(courseId) {
      this.$router.push({path: '/course', query: {courseId: courseId}});
    },
  },
};
</script>

<style scoped>
.NAV2 {
  width: 1100px;
  margin: auto;
  padding: 32px 0;
  clear: both;
}

.NAV2 h2 {
  text-align: left;
  margin: 60px 20px 40px 20px;
  letter-spacing: 2px;
}

.Course-content {
  display: flex;
  flex-wrap: wrap;
}

.Course-content-content {
  height: 220px;
  width: 18%;
  cursor: pointer;
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  margin: 10px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.Course-content-content:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.grid-content {
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  height: 300px;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.grid-content:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.comment img {
  float: left;
  height: 60px;
  width: 60px;
  margin: 5px;
}

.comment h4 {
  margin: 10px;
  float: left;
}

.comment p {
  margin: 10px 15px 30px 15px;
  font-size: 10px;
}

.comment h6 {
  margin: 30px 15px;
  font-size: 10px;
  color: #67C23A;
  position: absolute;
  bottom: 5px;
}

a {
  text-decoration: none;
  color: #1c1f21;
}

.clear {
  clear: both;
}
</style>

