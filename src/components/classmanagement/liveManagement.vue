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
          <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit"
                       @click="liveId=scope.row.liveId;dialogEdit = true;liveInfo= liveData[liveId-1]">修改直播信息
            </el-button>
            <el-button type="primary" icon="el-icon-delete"
                       @click.native.prevent="deleteRow()">删除直播
            </el-button>
          </el-button-group>
          </template>
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

    <el-dialog title="创建直播" v-if="dialogBuild" :visible.sync="dialogBuild">
      <build-live @close="closeDialogBuild"></build-live>
    </el-dialog>

    <el-dialog title="修改直播信息" v-if="dialogEdit" :visible.sync="dialogEdit">
      <build-live @close="closeDialogEdit" :isEdit="true" :liveId="liveId" :liveInfo="liveInfo" ></build-live>
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
      liveId:null,
      liveData: this.$store.state.teacherData.liveData,
      liveInfo:{},
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
      let that=this;
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
