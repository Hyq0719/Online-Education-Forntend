<template>
  <div>
    <div v-show="classView" style="position: relative;height: 600px">
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

      <div>
        <el-pagination style="position: absolute;bottom: 10px;left: 400px"
                       background
                       layout="prev, pager, next"
                       @current-change="handleCurrentChange"
                       :total="page">
        </el-pagination>
      </div>
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

      <div v-show="chartView" :key="key" style="overflow: hidden;padding: 20px">
        <el-row>
          <el-col :span="24" style="font-size: 16px;text-align:left ">
            平均评分： {{ analysisComment.avg_mark }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="overflow: hidden">
            <ECharts id="PolylineChart" :data="option1" height="300px" width="400px"></ECharts>
          </el-col>
          <el-col :span="12" style="overflow: hidden" >
            <ECharts id="BarChart1" :data="option2" height="300px" width="400px"></ECharts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="overflow: hidden" >
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
          <el-col :span="12" style="overflow: hidden">
            <ECharts id="BarChart2" :data="option4" height="300px" width="400px"></ECharts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="overflow: hidden;float: left">
            <span style="float: left;font-size: 14px;font-weight: bold;margin-left: 10px">最坏的几条评论</span>
            <el-card :body-style="{ padding: '5px'}" v-for="(item,index) in badComment" :key="index"
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
      page:this.$store.state.teacherData.teacherClassData.total_element,
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
      option4: {
        title: {
          text: '评论性质柱状图',
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
      badComment:{},
    }
  },
  props: ['id'],
  components: {
    ECharts: () => import("@/components/classmanagement/tools/ECharts.vue"),
    wordcloud,
  },

  methods: {
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.getCourse(val);
    },
    async getCourse(val) {
      let that = this;
      let b = new URLSearchParams();
      let c = that.$store.state.userData.userId;
      b.append("teacherId", c);
      b.append("sort", 1);
      b.append("page", val);
      await axios.post('http://' + that.Api + "/api/Course/getCourseByTeacherId", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
            console.log("老师的课程信息", res);
            if (res.data.code === 1000) {
              that.$store.commit('saveTeacherClassData', res.data.data);
              that.classData=that.$store.state.teacherData.teacherClassData;
            } },function (err) {
            console.log(err);
          }
      );
    },
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
        console.log("nlp结果：",response.data.data);
        if (response.data.code === 1000) {
          if (response.data.data !== null) {
            that.$store.commit("saveAnalysisComment", response.data.data);
            that.analysisComment = that.$store.state.teacherData.analysisComment;
            that.option2.dataset.source = that.analysisComment.word_cut;
            const n = that.analysisComment.mark_distribution;
            that.option4.dataset.source = Object.entries(n);
            that.badComment = that.analysisComment.worst_comment;
            console.log("评价性质", that.option4.dataset.source)
            const r = that.analysisComment.word_cut;
            that.words = r.map(item => ({name: item[0], value: item[1]}));
            console.log("热词:", that.analysisComment.word_cut);
            console.log("转换后：", r.map(item => ({name: item[0], value: item[1]})));
            that.chartBarView = true;
            that.optionc = that.optionc + 1;
          }
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
    this.getCourse(1);
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
