<template>
  <div style="background-color: #ffffff;box-shadow: 0 0 10px #4d555d;border-radius: 5px;">
    <el-main style="overflow:hidden;position: relative;min-height: 480px">
      <template>
        <el-radio-group v-model="radio" style="float: left;margin: 5px 20px">
          <el-radio :label="1" @change="displayLive">全部直播</el-radio>
          <el-radio :label="2" @change="displayLiving">正在直播</el-radio>
          <el-radio :label="3" @change="displayLiveFuture">即将直播</el-radio>
        </el-radio-group>
      </template>

      <el-table :data="liveData" v-if="total" v-show="total">
        <el-table-column prop="liveName" label="直播名称"></el-table-column>
        <el-table-column label="直播时间">
          <template slot-scope="scope">
            {{ scope.row.liveDate }}-{{ options1[scope.row.liveArrange-1] }}
          </template>
        </el-table-column>
        <el-table-column prop="addressId" label="线路">
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit"
                         @click="liveId=scope.row.liveId;dialogEdit = true;liveInfo= liveData[scope.$index]">修改直播信息
              </el-button>
              <el-button type="primary" icon="el-icon-delete"
                         @click.native.prevent="deleteLive(scope.row.liveId)">删除直播
              </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="liveData" v-if="ing" v-show="ing">
        <el-table-column prop="liveName" label="直播名称"></el-table-column>
        <el-table-column label="直播时间">
          <template slot-scope="scope">
            {{ scope.row.liveDate }}-{{ options1[scope.row.liveArrange-1] }}
          </template>
        </el-table-column>
        <el-table-column prop="addressId" label="线路">
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit"
                         @click="liveId=scope.row.liveId;dialogEdit = true;liveInfo= liveData[scope.$index]">修改直播信息
              </el-button>

              <el-button type="warning"
                         @click="$router.push('/live')">进入直播
              </el-button>

              <el-button type="danger" icon="el-icon-delete"
                         @click.native.prevent="deleteLive(scope.row.liveId)">删除直播
              </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="liveData" v-if="future" v-show="future">
        <el-table-column prop="liveName" label="直播名称"></el-table-column>
        <el-table-column label="直播时间">
          <template slot-scope="scope">
            {{ scope.row.liveDate }}-{{ options1[scope.row.liveArrange-1] }}
          </template>
        </el-table-column>
        <el-table-column prop="addressId" label="线路">
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit"
                         @click="liveId=scope.row.liveId;dialogEdit = true;liveInfo= liveData[scope.$index]">修改直播信息
              </el-button>
              <el-button type="primary" icon="el-icon-delete"
                         @click.native.prevent="deleteLive(scope.row.liveId)">删除直播
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div>
        <el-button circle @click="dialogBuild = true" style="position: fixed;bottom: 160px;left: 240px">
          <i class="el-icon-circle-plus-outline"></i>
        </el-button>
      </div>

    </el-main>

    <el-dialog title="创建直播" v-if="dialogBuild" :visible.sync="dialogBuild">
      <build-live @close="closeDialogBuild"></build-live>
    </el-dialog>

    <el-dialog title="修改直播信息" v-if="dialogEdit" :visible.sync="dialogEdit">
      <build-live @close="closeDialogEdit" :isEdit="true" :liveId="liveId" :liveInfo="liveInfo"></build-live>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "liveManagement",
  data() {
    return {
      radio:1,
      dialogEdit: false,
      dialogBuild: false,
      liveId: null,
      liveData: this.$store.state.teacherData.liveData,
      liveInfo: {},
      options1: [' 8:00', '10:00', '14:00', '16:00', '18:00'],
      ing:false,
      future:false,
      total:false,
    }
  },
  components: {
    buildLive: () => import("@/components/classmanagement/tools/buildLive"),
  },
  methods: {
    async deleteLive(liveId) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('liveId', liveId);
      await axios.post("http://" + that.Api + "/api/Live/deleteLive", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除直播", response);
        that.displayLive();
      }, function (err) {
        console.log(err);
      });

    },  //删除直播
    closeDialogBuild() {
      this.dialogBuild = false;
      this.displayLive();
    },
    closeDialogEdit() {
      this.dialogEdit = false;
      this.displayLive();
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
        if (res.data.code === 1000) {
          console.log("全部直播信息:", res.data.data)
          that.$store.commit("saveLiveData",res.data.data);
          that.liveData = that.$store.state.teacherData.liveData;
          that.total=true;
          that.ing=false;
          that.future=false;
        }
      }), function (err) {
        console.log(err);
      };
    },
    displayLiveFuture() {
      let that = this;
      let c = that.$store.state.userData.userId;
      let b = new URLSearchParams();
      b.append("teacherId", c);
      axios.post('http://' + that.Api + "/api/Live/findAllValidLiveFutureByTeacher", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
        if (res.data.code === 1000) {
          console.log("即将直播信息:", res.data.data)
          that.$store.commit("saveLiveData",res.data.data);
          that.liveData = that.$store.state.teacherData.liveData;
          that.total=false;
          that.ing=false;
          that.future=true;
        }
      }), function (err) {
        console.log(err);
      };
    },
    displayLiving() {
      let that = this;
      let c = that.$store.state.userData.userId;
      let b = new URLSearchParams();
      b.append("teacherId", c);
      axios.post('http://' + that.Api + "/api/Live/findAllValidLiveNowByTeacher", b,
          {
            headers: {
              'Authorization': that.$store.state.JWT,
            }
          }
      ).then(function (res) {
        if (res.data.code === 1000) {
          console.log("正在直播信息:", res.data.data)
          that.$store.commit("saveLiveData",res.data.data);
          that.liveData = that.$store.state.teacherData.liveData;
          that.total=false;
          that.ing=true;
          that.future=false;
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
