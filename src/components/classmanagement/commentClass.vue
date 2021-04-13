<template>
  <div style="min-height: 480px">
    <div v-show="classView" style="position: relative" class="card-wrapper">
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
        <el-pagination style="left: 410px;margin: 20px 0 0 0"
                       background
                       layout="prev, pager, next"
                       @current-change="handleCurrentChange"
                       :total="this.$store.state.teacherData.teacherClassData.total_element">
        </el-pagination>
      </el-main>

    </div>

    <div v-show="analyzeView" class="card-wrapper">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="具体评论" name="first"></el-tab-pane>
        <el-tab-pane label="评论分析" name="second"></el-tab-pane>
      </el-tabs>

      <div v-show="commentView">
        <div class="search-box">
          <div class="search-wrap">
            <input class="search-word" type="text" @input="querySearch" placeholder="请输入要查找的关键字" v-model="input"
                   @keyup.enter="findComment"/>
            <div>
              <button class="search-bottom" @click="querySearch">搜索评论</button>
            </div>
          </div>
        </div>
        <el-card :body-style="{ padding: '5px'}" v-for="(item,index) in comment" :key="index"
                 style="position: relative;margin: 10px 20px;overflow: hidden;min-height: 80px">
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
            <div style="float:left;text-align:left;font-size: 16px" v-html="item.content"></div>
          </div>
        </el-card>
      </div>

      <div v-show="chartView" :key="key" style="overflow: hidden;padding: 20px">
        <el-row>
          <el-col :span="24" style="font-size: 20px;text-align:left ">
            平均评分： {{ analysisComment.avg_comment_mark }} /5
            <div style="display: inline-block;width: 30px"></div>
            <span id="remark1" ref="remark1" style="font-family: 微软雅黑"><em>{{ remark1w }}</em></span>
            <div style="width: 400px">
              <el-divider/>
            </div>
          </el-col>
          <el-col :span="24" style="font-size: 20px;text-align:left ">
            情感评分： {{ analysisComment.avg_mark }} /5
            <div style="display: inline-block;width: 30px"></div>
            <span id="remark2" ref="remark2" style="font-family: 微软雅黑"><em>{{ remark2w }}</em></span>
            <div style="width: 400px">
              <el-divider/>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="overflow: hidden">
            <div class="card-wrapper2">
              <h2 style="text-align: center;font-size: 20px;font-weight: bold;margin-left: 10px"> 评论词云</h2>
              <wordcloud
                  style="height:300px;width:500px"
                  :data="words"
                  nameKey="name"
                  valueKey="value"
                  :color="myColors"
                  :showTooltip="false"
                  :wordClick="wordClickHandler">
              </wordcloud>

              <div class="footer"></div>
            </div>
          </el-col>
          <el-col :span="12" style="overflow: hidden">
            <div class="card-wrapper2">
              <h2 style="text-align: center;font-size: 20px;font-weight: bold;margin-left: 10px"> 情感分析</h2>
              <ECharts id="BarChart2" :data="option4" height="350px" width="500px"></ECharts>
              <div class="footer"></div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="overflow: hidden">
            <div class="card-wrapper2">
              <h2 style="text-align: center;font-size: 20px;font-weight: bold;margin-left: 10px"> 打分分布</h2>
              <ECharts id="BarChart3" :data="option5" height="350px" width="500px"></ECharts>
              <div class="footer"></div>
            </div>
          </el-col>
          <el-col :span="12" style="overflow: hidden">
            <div class="card-wrapper2">
              <h2 style="text-align: center;font-size: 20px;font-weight: bold;margin-left: 10px"> 最坏的几条评论</h2>
              <el-card :body-style="{ padding: '5px'}" v-for="(item,index) in badComment" :key="index"
                       style="display:block;margin: 5px;overflow: hidden;min-height: 80px">
                <div style="overflow: hidden">
                  <div style="text-align:left;font-size: 12px;margin: 0 10px">
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
                  <div style="float:left;text-align:left;font-size: 16px"> {{ item[0] }}</div>
                </div>
              </el-card>
              <div class="footer"></div>
            </div>
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
      remark1: ["学生对该课程评价不佳，请您提升教学水平", '学生对该课程评价一般，有待提高', '学生对该课程评价非常好，请您继续保持'],
      remark2: ['这门课反响很差', '这门课反响一般', '这门课反响一般'],
      remark1w: "",
      remark2w: "",
      courseId: null,
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
      option2: {
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
          type: 'value',
        },
        series: [
          {type: 'bar'}
        ]
      },
      option4: {
        dataset: {
          source: []
        },
        tooltip: {
          //鼠标悬浮弹框组件
          trigger: 'item',

        },
        legend: {},
        series: [
          {
            type: 'pie',
            radius: ["10%","70%"],
            roseType: "radius",
            label: {
              color: '#000'
            },
            itemStyle: {
              // color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
          }
        ]
      },
      option5: {
        dataset: {
          source: []
        },
        tooltip: {
          //鼠标悬浮弹框组件
          trigger: 'axis',
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {},
        grid: {
          left: "0%",
          top: "10px",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              fontSize: 14,
            }
          },
        },
        yAxis: {
          type: 'value',
          min: 0,
          interval: 1,
          axisLabel: {
            textStyle: {
              fontSize: 14,
            }
          },
        },
        series: [
          {
            type: 'bar',
            barWidth: "35%",
            itemStyle:{
              barBorderRadius:5,
            }
          }
        ]
      },
      badComment: {},
    }
  },
  props: ['id'],
  components: {
    ECharts: () => import("@/components/classmanagement/tools/ECharts.vue"),
    wordcloud,
  },

  methods: {
    querySearch() {
      let that = this;
      let a = new URLSearchParams;
      // console.log(that.comment);
      a.append("courseId", that.courseId);
      a.append("page", 1);
      a.append("query", that.input);
      axios.post("http://" + this.Api + "/api/Course/getCourseCommentWithRegex?" + a,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': that.$store.state.JWT,
            }
          }).then(function (response) {
        console.log("获取搜索", response);

        that.$store.commit("saveCommentData", response.data.data.list);
        that.comment = that.$store.state.commentData;
      }, function (err) {
        console.log(err);
      });
    },
    handleCurrentChange(val) {
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
              that.classData = that.$store.state.teacherData.teacherClassData;
            }
          }, function (err) {
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
      that.courseId = row.courseId;
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
        console.log("nlp结果：", response.data.data);
        if (response.data.code === 1000) {
          if (response.data.data !== null) {
            that.$store.commit("saveAnalysisComment", response.data.data);
            that.analysisComment = that.$store.state.teacherData.analysisComment;
            if (that.analysisComment.avg_comment_mark > 3.0 && that.analysisComment.avg_comment_mark <= 5) {
              that.remark1w = that.remark1[2];
            } else if (that.analysisComment.avg_comment_mark > 1.5 && that.analysisComment.avg_comment_mark <= 3) {
              that.remark1w = that.remark1[1];
            } else if (that.analysisComment.avg_comment_mark <= 1.5)
              that.remark1w = that.remark1[0];
            if (that.analysisComment.avg_mark > 3.0 && that.analysisComment.avg_comment_mark <= 5) {
              that.remark2w = that.remark2[2];
            } else if (that.analysisComment.avg_mark > 1.5 && that.analysisComment.avg_comment_mark <= 3) {
              that.remark2w = that.remark2[1];
            } else if (that.analysisComment.avg_mark <= 1.5)
              that.remark2w = that.remark2[0];
            that.option2.dataset.source = that.analysisComment.word_cut;
            const n = that.analysisComment.mark_distribution;
            // console.log("n", Object.entries(n))
            that.option4.dataset.source = Object.entries(n).map(item => {
              if (item[0] == 'neg') return ["差评", item[1]];
              else if (item[0] == 'pos') return ["好评", item[1]];
              else if (item[0] == 'neu') return ["中评", item[1]];
            });
            console.log(that.option5.dataset.source)
            that.option5.dataset.source = Object.entries(that.analysisComment.comment_mark_distribution).map((item, index) => {
              return [index + "星", item[1]]
            })
            // console.log(that.option4.dataset.source)
            // console.log(that.option5.dataset.source)
            that.badComment = that.analysisComment.worst_comment;
            // console.log("评价性质", that.option4.dataset.source)
            const r = that.analysisComment.word_cut;
            that.words = r.map(item => ({name: item[0], value: item[1]}));
            // console.log("热词:", that.analysisComment.word_cut);
            // console.log("转换后：", r.map(item => ({name: item[0], value: item[1]})));
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
      // console.log(tab, event);
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

<style lang="less" scoped>
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

.card-wrapper {
  background-color: #ffffff;
  box-shadow: 0 0 10px #4d555d;
  border-radius: 5px;
  margin: 0 0 20px 0;
}

.card-wrapper2 {
  position: relative;
  width: 500px;
  min-height: 300px;
  padding: 0 10px;
  /*background-color: #ffffff;*/
  /*box-shadow: 0 0 5px #4d555d;*/
  /*border-radius: 5px;*/
  margin: 0 0 20px 0;
  overflow: hidden;
  //border: 1px  dotted #02a6b5;
  background-color: rgb(252, 252, 252);

  &::before {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 20px;
    height: 20px;
    border-left: 3px solid #02a6b5;;
    border-top: 3px solid #02a6b5;
    content: "";
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-right: 3px solid #02a6b5;;
    border-top: 3px solid #02a6b5;
    content: "";
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-left: 3px solid #02a6b5;;
      border-bottom: 3px solid #02a6b5;
      content: "";
    }

    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      border-right: 3px solid #02a6b5;;
      border-bottom: 3px solid #02a6b5;
      content: "";
    }
  }
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}
</style>
