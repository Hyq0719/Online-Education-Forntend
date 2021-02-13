<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="具体评论" name="first">具体评论</el-tab-pane>
      <el-tab-pane label="评论分析" name="second">数据可视化</el-tab-pane>
    </el-tabs>
    <div v-show="commentView" style="width: 700px">
      <el-card :body-style="{ padding: '20px'}" v-for="(item,index) in comment" :key="index"
               style="position: relative;margin: 20px;overflow: hidden;min-height: 100px">
        <div style="float:left;overflow: hidden">
          <div style="text-align:left"> {{ item.content }}</div>
        </div>
      </el-card>
    </div>
    <div v-show="chartView" style="overflow: hidden">
      <el-col style="height: 400px;width: 500px;overflow: hidden">
        <ECharts id="PolylineChart" :data="option"></ECharts>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentList",
  data() {
    return {
      option: {
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
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      activeName: 'first',
      comment: this.$store.state.commentData,
      commentView: true,
      chartView: false,
    }
  },
  components: {
    ECharts: () => import("@/components/classmanagement/tools/ECharts.vue")
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.index == 0) {
        this.chartView = false;
        this.commentView = true;
      } else if (tab.index == 1) {
        this.chartView = true;
        this.commentView = false;
      }
    }
  },
  mounted() {
    let breadcrumb = [
      {
        link: '/Classmanagement',
        title: '课程管理'
      },
      {
        link: '/Classmanagement/commentAnalyze',
        title: '评论搜索'
      },
      {
        link: '/Classmanagement/commentAnalyze/commentList',
        title: '课程分析'
      },
    ]
    this.$store.commit("savebreadcrumb", breadcrumb)
  }
}
</script>

<style scoped>

</style>
