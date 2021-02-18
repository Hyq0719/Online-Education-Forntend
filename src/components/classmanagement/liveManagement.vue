<template>
  <div>
    <el-main style="overflow:hidden;position: relative;height: 580px">
      <el-table :data="liveData">
        <el-table-column prop="liveName" label="直播名称"></el-table-column>
        <el-table-column prop="startTime" label="直播时间">
        </el-table-column>
        <el-table-column prop="liveArrange" label="线路">
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit"
                       @click="dialogEdit = true">修改直播信息
            </el-button>
            <el-button type="primary" icon="el-icon-delete"
                       @click.native.prevent="deleteRow()">删除课程
            </el-button>
          </el-button-group>
        </el-table-column>
      </el-table>

      <div>
        <el-button circle @click="dialogBuild = true" style="position: absolute;bottom: 80px;left: 20px">
          <i class="el-icon-circle-plus-outline"></i>
        </el-button>
        <el-pagination style="position: absolute;bottom: 0;left: 300px"
                       background
                       layout="prev, pager, next"
                       :total="1">
        </el-pagination>
      </div>

    </el-main>

    <el-dialog title="创建直播" :visible.sync="dialogBuild">
      <build-live @close="closeDialogBuild"></build-live>
    </el-dialog>

    <el-dialog title="修改直播信息" :visible.sync="dialogEdit">
      <build-live @close="closeDialogEdit"></build-live>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "liveManagement",
  data() {
    return {
      dialogEdit: false,
      dialogBuild: false,
      liveData: this.$store.state.teacherData.liveData,
    }
  },
  components:{
    buildLive: () => import("@/components/classmanagement/tools/buildLive"),
  },
  methods: {
    closeDialogBuild(){
      this.dialogBuild=false;
    },
    closeDialogEdit(){
      this.dialogEdit=false;
    },
    displayLive() {
      let that = this;
      let c = that.$store.state.userData.userId;
      let b = new URLSearchParams();
      b.append("teacherId", c);
      axios.post('http://' + that.Api + "/api/Live/findAllLiveByTeacher", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
        console.log(res);
        if (res.data.code === 1000) {
          console.log("直播信息:", res.data.data)
          that.$store.state.teacherData.liveData = res.data.data;
          that.liveData = that.$store.state.teacherData.liveData;
        }
      }), function (err) {
        console.log(err);
      };
    },
  },
  mounted() {
    let that = this;
    that.displayLive();
    let breadcrumb = [
      {
        link: '/Classmanagement/blank',
        title: '课程管理'
      },
      {
        link: {name: 'liveManagement'},
        title: '直播管理'
      },
    ]
    this.$store.commit("savebreadcrumb", breadcrumb)
  }
}
</script>

<style scoped>

</style>
