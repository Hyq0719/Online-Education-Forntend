<template>
  <div class="NAV2">
    <h2>最近直播</h2>
    <el-divider></el-divider>
    <el-row :gutter="25" class="course">
      <el-col :span="6" v-for="item in live" v-bind:key="item.id">
        <router-link to="/live">
          <div class="live-grid-content">
            <h6>{{ item.time }}</h6>
            <div class="live-content">
              <img :src="item.src" alt="图片缺失">
              <div class="live-content-text">
                <h4>{{ item.name }}</h4>
                <h5>{{ item.school }}</h5>
                <h6>{{ item.teacher }}</h6>
              </div>
            </div>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <h2>好课推荐</h2>
    <el-divider></el-divider>
    <div v-for="(item,index) in star" v-bind:key="index">
      <router-link to="/course">
        <classview1 class="classview" :img=classpicture[index] :star="item" :classname=classname[index]></classview1>
      </router-link>
    </div>
    <div class="clear"></div>
    <h2>精彩评价</h2>
    <el-divider></el-divider>
    <el-row :gutter="20" class="comment">
      <el-col :span="6" v-for="item in comment" v-bind:key="item.id">
        <router-link to="/live">
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
import classview1 from './childcpn/classview';

export default {
  name: 'nav2',
  components: {
    classview1,
  },
  data() {
    return {
      live: [
        {
          time: "02月16日 19:00开始",
          name: "高等数学1",
          school: "浙江大学",
          teacher: "老师1",
          src: require('../assets/teacherhead1.jpg'),
        },
        {
          time: "02月16日 19:00开始",
          name: "高等数学2",
          school: "上海大学",
          teacher: "老师2",
          src: require('../assets/teacherhead5.jpg'),
        },
        {
          time: "02月16日 19:00开始",
          name: "高等数学3",
          school: "同济大学",
          teacher: "老师3",
          src: require('../assets/teacherhead3.png'),
        },
        {
          time: "02月16日 19:00开始",
          name: "高等数学1",
          school: "浙江大学",
          teacher: "老师1",
          src: require('../assets/teacherhead4.jpg'),
        },
      ],
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
      adpicture: [require('@/assets/ad1.jpg'),
        require('@/assets/ad2.jpg')],
      classpicture: [require('@/assets/course1.webp'),
        require('@/assets/course2.webp'),
        require('@/assets/course3.webp'),
        require('@/assets/course4.webp'),
        require('@/assets/course5.webp'),
        require('@/assets/course6.webp'),
        require('@/assets/course7.webp'),
        require('@/assets/course8.webp'),],
      star: [3, 4, 3.4, 3.5, 2.0, 4, 1, 2.3],
      classname: ['一晚上搞定CSS',
        '一晚上搞定Vue',
        '一晚上搞定HTML',
        '7天学会java',
        '5天学会C++',
        '8天学会php',
        '一个月搞定C++对象']
    };
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
  margin: 60px 20px 20px 20px;
  letter-spacing: 2px;
}

.live-grid-content {
  text-align: left;
  border-radius: 10px;
  border: #E4E7ED 1px solid;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
}

.live-grid-content:hover {
  background-color: #d3dce6;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.live-content {
  display: flex;
}

.live-content-text {

}

.course img {
  margin: 10px;
  border-radius: 100px;
  height: 70px;
  width: 70px;
}

.course h4 {
  margin: 15px 10px;
}

.course h5 {
  margin: 15px 10px;
}

.course h6 {
  margin: 15px 10px 20px 10px;
}

a {
  text-decoration: none;
  color: #1c1f21;
}

.classview {
  position: relative;
  width: 22%;
  height: 200px;
  margin: 15px;
  box-shadow: 0 0 10px rgba(95, 101, 105, 0.15);
  border-radius: 8px;
  float: left;
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

.clear {
  clear: both;
}
</style>

