<template>
  <div>
    <el-main class="card-wrapper" style="float:left;width: 500px;display: inline-block">
      <el-table :data="majorData" @row-click="getPrefer">
        <el-table-column prop="majorContent" label="专业"/>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-delete"
                       @click.native.prevent="deleteMajor(scope.row.majorId)">
              删除
            </el-button>
            <el-button type="primary" icon="el-icon-edit"
                       @click.native.prevent="editMajor(scope.row.majorId)">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form :inline="true" label-width="80px" style="margin: 20px 0 10px 0">
        <el-form-item style="width: 300px;margin-bottom: 0">
          <el-input v-model="major2"
                    placeholder="专业名称"
                    maxlength="10"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item style="width: 100px;margin-bottom: 0">
          <el-button type="primary" @click="sendMajor()" style="float: right">创建专业<i
              class="el-icon-upload el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-main>

    <el-main class="card-wrapper" style="float:right;width:500px;display: inline-block"
             v-if="view" v-show="view">
      <el-table :data="preferData">
        <el-table-column prop="preferContent" label="子专业"/>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-delete"
                     @click.native.prevent="deletePrefer(scope.row.preferId)">
            删除
          </el-button>
          <el-button type="primary" icon="el-icon-edit"
                     @click.native.prevent="editPrefer(scope.row.preferId,scope.row.majorId)">
            修改
          </el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-form :inline="true" label-width="80px" style="margin: 20px 0 10px 0">
        <el-form-item style="width: 300px;margin-bottom: 0">
          <el-input v-model="prefer2"
                    placeholder="子专业名称"
                    maxlength="10"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item style="width: 100px;margin-bottom: 0">
          <el-button type="primary" @click="sendPrefer" style="float: right">创建子专业<i
              class="el-icon-upload el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "majorAudit",
  data() {
    return {
      majorData: [],
      preferData: [],
      view: false,
      prefer:null,
      major:null,
      prefer2:null,
      major2:null,
      row:null,
    }
  },
  methods: {
    async getMajor() {
      let that = this;
      let JWT = that.$store.state.JWT;
      await axios.get("http://" + that.Api + "/api/Major/findAllMajor", {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("专业", response);
        that.majorData = response.data.data;
      }, function (err) {
        console.log(err);
      });
    },
    async getPrefer(row, event, column) {
      console.log(row, event, column);
      this.row=row;
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('major_id', row.majorId);
      await axios.post("http://" + that.Api + "/api/Major/getPreferByMajor", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("子专业", response);
        that.preferData = response.data.data;
        that.view = true;
      }, function (err) {
        console.log(err);
      });
    },

    async deleteMajor(b) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('major_id', b);
      await axios.post("http://" + that.Api + "/api/Major/deleteMajor",a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除专业", response);
        that.getMajor();
      }, function (err) {
        console.log(err);
      });
    },
    async deletePrefer(b) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('prefer_id', b);
      await axios.post("http://" + that.Api + "/api/Major/deletePrefer",a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除子专业", response);
        that.getPrefer(that.row,0,0);
      }, function (err) {
        console.log(err);
      });
    },

    async sendMajor() {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('major_content', that.major2);
      await axios.post("http://" + that.Api + "/api/Major/addMajor",a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("增加专业", response);
        that.getMajor();
      }, function (err) {
        console.log(err);
      });
    },
    async sendPrefer() {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('major_id', that.row.majorId);
      a.append('prefer_content', that.prefer2);
      await axios.post("http://" + that.Api + "/api/Major/addPrefer",a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("增加子专业", response);
        that.getPrefer(that.row,0,0);
      }, function (err) {
        console.log(err);
      });
    },

    async editMajor(b) {
      let that = this;
      let JWT = that.$store.state.JWT;

      await this.$prompt('请输入专业名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '专业名称: ' + value,
        });

        that.major=value;
        console.log(value,that.major)
        let params={
          majorContent: that.major,
          majorId: b,
        }
        console.log(params);
        axios.post("http://" + that.Api + "/api/Major/updateMajor", params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JWT,
          }
        }).then(function (response) {
          console.log("更新专业", response);
          that.getMajor();
        }, function (err) {
          console.log(err);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });

    },
    async editPrefer(b,c) {
      let that = this;
      let JWT = that.$store.state.JWT;

      await this.$prompt('请输入子专业名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '子专业名称: ' + value,
        });

        that.prefer=value;
        let a = new URLSearchParams();
        a.append('major_id', c);
        a.append('prefer_content', that.prefer);
        a.append('prefer_id', b);
        axios.post("http://" + that.Api + "/api/Major/updatePrefer", a, {
          headers: {
            'Authorization': JWT,
          }
        }).then(function (response) {
          console.log("更新子专业", response);
          that.getPrefer(that.row,0,0);
        }, function (err) {
          console.log(err);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });

    },
  },
  mounted() {
    this.getMajor();
    let breadcrumb = [
      {
        title: '审核管理'
      },
      {
        link: {name: 'majorAudit'},
        title: '专业管理'
      }
    ];
    this.$store.commit("savebreadcrumb", breadcrumb);
  }
}
</script>

<style scoped>
.card-wrapper {
  background-color: #ffffff;
  box-shadow: 0 0 10px #4d555d;
  border-radius: 5px;
  margin: 0 40px 20px 0;
}

</style>
