<template>
  <div>
    <div v-show="classView">
      <el-main>
        <el-table :data="classData.list" @row-click="findComment">
          <el-table-column prop="name" label="课程名称">
          </el-table-column>
          <el-table-column label="是否为vip课程">
            <template slot-scope="props">
              {{ props.row.needVip ? "需要" : "不需要" }}
            </template>
          </el-table-column>
          <el-table-column prop="uploadTime" label="更新时间">
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="props">
              {{ props.row.prefer.major.majorContent }}-{{ props.row.prefer.preferContent }}
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </div>

    <div v-show="analyzeView">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="具体评论" name="first"></el-tab-pane>
        <el-tab-pane label="评论分析" name="second">数据可视化</el-tab-pane>
      </el-tabs>

      <div v-show="commentView">
        <div class="search-box">
          <div class="search-wrap">
            <input class="search-word" type="text" placeholder="请输入要查找的关键字" v-model="input" @keyup.enter="findComment"/>
            <div>
              <button class="search-bottom" @click="findComment">搜索评论</button>
            </div>
          </div>
        </div>
        <el-card :body-style="{ padding: '5px'}" v-for="(item,index) in comment" :key="index"
                 style="position: relative;margin: 5px;overflow: hidden;min-height: 80px">
          <div style="overflow: hidden">
            <div style="text-align:left;font-size: 12px;margin: 0 10px">
              <div style="display: inline;margin-right: 20px"> {{ item.time }}</div>
              <div style="display: inline;margin-right: 20px"> 点赞数：{{ item.likes }}</div>
              <el-rate style="display: inline"
                       v-model="item.commentMark"
                       disabled
                       show-score
                       text-color="#ff9900"
                       score-template="{value}">
              </el-rate>
            </div>
          </div>
          <div style="overflow: hidden;margin: 10px 10px">
            <div style="float:left;text-align:left;font-size: 16px"> {{ item.content }}</div>
          </div>
        </el-card>
      </div>

      <div v-show="chartView" style="overflow: hidden;padding: 20px">
        <el-row>
          <el-col :span="24" style="font-size: 16px;text-align:left ">
            平均评分： {{ analysisComment.avg_mark }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="overflow: hidden">
            <ECharts id="PolylineChart" :data="option1" height="300px" width="400px"></ECharts>
          </el-col>
          <el-col :span="12" style="overflow: hidden" :key="key">
            <ECharts id="BarChart" :data="option2" height="300px" width="400px"></ECharts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="overflow: hidden" :key="key">
            <span style="float: left;font-size: 14px;font-weight: bold;margin-left: 10px"> 热词词云</span>
            <wordcloud
                style="height:300px;width:400px"
                :data="words"
                nameKey="name"
                valueKey="value"
                :color="myColors"
                :showTooltip="false"
                :wordClick="wordClickHandler">
            </wordcloud>
          </el-col>
        </el-row>
      </div>


    </div>

  </div>
</template>

<script>
import axios from "axios";
import wordcloud from 'vue-wordcloud';



export default {
  name: "commentClass",
  data() {
    return {
      myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
      words: [],
      key: 1,
      analyzeView: false,
      classView: true,
      classData: this.$store.state.teacherData.teacherClassData,
      input: '',
      activeName: 'first',
      comment: this.$store.state.commentData,
      analysisComment: this.$store.state.teacherData.analysisComment,
      commentView: true,
      chartView: false,
      chartBarView: false,
      optionc: 1,
      option1: {
        title: {
          text: '评论数变化图',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          //鼠标悬浮弹框组件
          trigger: 'axis'
        },
        legend: {
          //多个视图配置
          data: ['五星', '四星', '三星', '二星', '一星'],
          top: "10%"
        },
        grid: {
          //配置视图的位置 左右默认10%
          bottom: '15%',
          top: '30%',
          containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '五星',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '四星',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '三星',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '二星',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '一星',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      option2: {
        title: {
          text: '热评词柱状图',
          textStyle: {
            fontSize: 14
          }
        },
        dataset: {
          source: []
        },
        tooltip: {
          //鼠标悬浮弹框组件
          trigger: 'axis'
        },
        legend: {},
        grid: {},
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {type: 'bar'}
        ]
      },
      echarts05Data: [
        {
          name: "十九大精神",
          value: 15000
        },
        {
          name: "两学一做",
          value: 10081
        },
        {
          name: "中华民族",
          value: 9386
        },
        {
          name: "马克思主义",
          value: 7500
        },
        {
          name: "民族复兴",
          value: 7500
        },
        {
          name: "社会主义制度",
          value: 6500
        },
        {
          name: "国防白皮书",
          value: 6500
        },
        {
          name: "创新",
          value: 6000
        },
        {
          name: "民主革命",
          value: 4500
        },
        {
          name: "文化强国",
          value: 3800
        },
        {
          name: "国家主权",
          value: 3000
        },
        {
          name: "武装颠覆",
          value: 2500
        },
        {
          name: "领土完整",
          value: 2300
        },
        {
          name: "安全",
          value: 2000
        },
        {
          name: "从严治党",
          value: 1900
        },
        {
          name: "现代化经济体系",
          value: 1800
        },
        {
          name: "国防动员",
          value: 1700
        },
        {
          name: "信息化战争",
          value: 1600
        },
        {
          name: "局部战争",
          value: 1500
        },
        {
          name: "教育",
          value: 1200
        },
        {
          name: "职业教育",
          value: 1100
        },
        {
          name: "兵法",
          value: 900
        },
        {
          name: "一国两制",
          value: 800
        },
        {
          name: "特色社会主义思想",
          value: 700
        },
      ],
      msg: 'Welcome to Your Vue.js App',
      option3:  {
        title: {
          text: "热爱祖国",
          x: "center"
        },
        backgroundColor: "#fff",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function () {
                  return (
                      "rgb(" +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ")"
                  );
                }
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: [
              {
                name: "十九大精神",
                value: 15000
              },
              {
                name: "两学一做",
                value: 10081
              }, {
                name: "中华民族",
                value: 9386
              },
              {
                name: "马克思主义",
                value: 7500
              },
              {
                name: "民族复兴",
                value: 7500
              },
              {
                name: "社会主义制度",
                value: 6500
              },
              {
                name: "国防白皮书",
                value: 6500
              },
              {
                name: "创新",
                value: 6000
              },
              {
                name: "民主革命",
                value: 4500
              },
              {
                name: "文化强国",
                value: 3800
              },
              {
                name: "国家主权",
                value: 3000
              },
              {
                name: "伟大复兴",
                value: 2500
              },
              {
                name: "领土完整",
                value: 2300
              },
              {
                name: "安全",
                value: 2000
              },
              {
                name: "从严治党",
                value: 1900
              },
              {
                name: "现代化经济体系",
                value: 1800
              },
              {
                name: "国防动员",
                value: 1700
              },
              {
                name: "信息化战争",
                value: 1600
              },
              {
                name: "局部战争",
                value: 1500
              },
              {
                name: "教育",
                value: 1200
              },
              {
                name: "中国梦",
                value: 1100
              },
              {
                name: "孙子兵法",
                value: 900
              },
              {
                name: "一国两制",
                value: 800
              },
              {
                name: "特色社会主义思想",
                value: 700
              },
            ]
          }
        ]
      },

    }
  },
  props: ['id'],
  components: {
    ECharts: () => import("@/components/classmanagement/tools/ECharts.vue"),
    wordcloud,
  },

  methods: {
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm);
    },
    async findComment(row, column, event) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      console.log(row, column, event);
      a.append('courseId', row.courseId);
      a.append('page', 1);
      a.append('sort', 1);
      await axios.post("http://" + that.Api + "/api/Course/getCourseComments", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log(response);
        if (response.data.code === 1000) {
          that.$store.commit("saveCommentData", response.data.data.list);
          that.comment = that.$store.state.commentData;
          that.$router.push({name: 'commentClass', params: {id: 2}});
        }
      }, function (err) {
        console.log(err);
        that.$message({
          showClose: true,
          message: '获取课程评论失败',
          type: 'error'
        });
      });

      let b = new URLSearchParams();
      b.append('course_id', row.courseId);
      await axios.post("http://" + that.Api + "/api/Teacher/analysisCommentByCourse", b, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log(response);
        if (response.data.code === 1000) {
          that.$store.commit("saveAnalysisComment", response.data.data);
          that.analysisComment = that.$store.state.teacherData.analysisComment;
          that.option2.dataset.source = that.analysisComment.word_cut;
          const r=that.analysisComment.word_cut;
          that.words = r.map(item =>({name:item[0],value:item[1]}));
          console.log("热词:",that.analysisComment.word_cut);
          console.log("转换后：",r.map(item =>({name:item[0],value:item[1]})));
          that.chartBarView = true;
          that.optionc = that.optionc + 1;
          // that.option2.dataset.source.push(1);
          // that.option2.dataset.source.pop();
        }
      }, function (err) {
        console.log(err);
        that.$message({
          showClose: true,
          message: '获取课程评论分析失败',
          type: 'error'
        });
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.index == 0) {
        this.chartView = false;
        this.commentView = true;
      } else if (tab.index == 1) {
        this.chartView = true;
        this.commentView = false;
      }
    },
  },
  mounted() {
    let that = this;
    let a = that.$route.params.id;
    console.log(a);
    if (a == 1) {
      that.classView = true;
      that.analyzeView = false;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'commentClass', params: {id: 1}},
          title: '选择课程'
        }
      ];
      this.$store.commit("savebreadcrumb", breadcrumb);
    } else if (a == 2) {
      that.classView = false;
      that.analyzeView = true;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'commentClass', params: {id: 1}},
          title: '选择课程'
        },
        {
          link: {name: 'commentClass', params: {id: 2}},
          title: '评论分析'
        }
      ]
      this.$store.commit("savebreadcrumb", breadcrumb);
    }
  },
  watch: {
    id(id) {
      let that = this;
      let a = id;
      console.log(a);
      if (a == 1) {
        that.classView = true;
        that.analyzeView = false;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'commentClass', params: {id: 1}},
            title: '选择课程'
          }
        ];
        this.$store.commit("savebreadcrumb", breadcrumb);
      } else if (a == 2) {
        that.classView = false;
        that.analyzeView = true;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'commentClass', params: {id: 1}},
            title: '选择课程'
          },
          {
            link: {name: 'commentClass', params: {id: 2}},
            title: '评论分析'
          }
        ]
        this.$store.commit("savebreadcrumb", breadcrumb);
      }
    },
    optionc() {
      ++this.key;
      console.log("nlp处理成功")
    },
  },
}
</script>

<style scoped>
.search-wrap {
  height: 44px;
  margin: 0 auto;
  position: relative;
  width: 587px;
}

.search-word {
  height: 18px;
  box-shadow: none;
  padding: 11px 15px;
  background: transparent;
  width: 296px;
  border: 2px solid #ccd0d7;
  border-radius: 4px;
  font-size: 16px;
  color: #222;
  float: left;
  margin-right: 10px;
}

.search-bottom {
  cursor: pointer;
  float: left;
  color: #fff;
  background: #00a1d6;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 42px;
  text-align: center;
  width: 90px;
  border-radius: 4px;
  border: none;
}

.search-box {
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  padding-top: 40px;
  overflow: hidden;
  clear: both;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}
</style>
