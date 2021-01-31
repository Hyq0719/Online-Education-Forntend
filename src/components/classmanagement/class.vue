<template>
  <el-container>

    <el-main v-show="classview">
      <el-table :data="classData">
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
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit" @click="openChapter(scope.row.courseId)">管理章节</el-button>
              <el-button type="primary" icon="el-icon-delete"
                         @click.native.prevent="deleteRow(scope.$index, tableData)">删除课程
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-main v-show="chapterview">
      <el-table :data="chapterData">
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
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit">管理章节</el-button>
              <el-button type="primary" icon="el-icon-delete"
                         @click.native.prevent="deleteRow(scope.$index, tableData)">删除课程
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Classmanagement_class",
  data() {
    return {
      classview: true,
      chapterview: false,
      classData: this.$store.state.teacherClassData.data,
      chapterData: {},
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
      // 待加入后台删除
    },
    openChapter(id) {
      let that = this;
      // let a = new URLSearchParams();
      // let c=id;
      // console.log(c);
      // a.append('courseId', id);
      axios.get('http://37zo042868.wicp.vip/api/Course/getCourseChapter/{courseId}?courseId=' + id).then(function (res) {
        console.log(res);
        that.chapterData = res.data.data;
      })
      that.classview = false;
      that.chapterview = true;
    }
  }
}
</script>

<style scoped>

.search-bottom {
  cursor: pointer;
  float: left;
  color: #fff;
  background: #00a1d6;
  font-size: 14px;
  letter-spacing: 2px;
  line-height: 20px;
  text-align: center;
  width: 90px;
  border-radius: 4px;
  border: none;
}

button:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}
</style>
