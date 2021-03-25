<template>
  <div>
    <el-main class="card-wrapper" style="padding: 0">
      <el-row  style="height: auto">
        <el-row class="subtitle">
          <h5 style="margin: 10px 24px;float: left">创建直播地址</h5>
        </el-row>
        <el-form :inline="true" label-width="80px" style="margin: 20px 0 10px 0">
          <el-form-item label="直播地址" style="width: 500px;margin-bottom: 0">
            <el-input
                style="width: 400px"
                placeholder="请输入地址"
                v-model="liveAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="send" style="float: right;margin: 0 0 0 50px" >上传地址<i
                class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-form>
        <el-row>
        </el-row>
      </el-row>
    </el-main>

   <el-main class="card-wrapper">
    <el-table :data="addressData">
      <el-table-column prop="liveAddressId" label="liveAddressId"></el-table-column>
      <el-table-column prop="liveAddress" label="liveAddress"></el-table-column>
      <el-table-column label="操作" width="400px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit"
                     @click="liveAddressId=scope.row.liveAddressId;dialogEdit = true;liveInfo= liveData[scope.$index]">
            修改地址
          </el-button>
          <el-button type="primary" icon="el-icon-delete"
                     @click.native.prevent="deleteAddress(scope.row.liveAddressId)">删除地址
          </el-button>
        </template>
      </el-table-column>
    </el-table>
   </el-main>

    <el-dialog title="修改地址" v-if="dialogEdit" :visible.sync="dialogEdit">
      <el-form label-width="80px" style="margin: 20px 0 10px 0">
        <el-form-item label="直播地址:" style="width: 644px;margin-bottom: 0">
          <el-input
              style="width: 550px"
              placeholder="请输入地址"
              v-model="liveAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit" style="margin: 20px 50px 0 0">上传地址<i
              class="el-icon-upload el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "liveAudit",
  data() {
    return {
      addressData: [],
      liveAddress: '',
      dialogEdit: false,

    }
  },
  methods: {
    async getAddress() {
      let that = this;
      await axios.get('http://' + that.Api + "/api/Live_address/"
      ).then(function (res) {
        if (res.data.code === 1000) {
          console.log("address信息", res.data.data)
          that.addressData = res.data.data;
        }
      }), function (err) {
        console.log(err);
      };
    },
    async deleteAddress(Id) {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('liveAddressId', Id);
      await axios.post("http://" + that.Api + "/api/Live_address/deleteLiveAddress", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除成功", response);
        that.getAddress();
      }, function (err) {
        console.log(err);
      });

    },  //删除
    async send() {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = new URLSearchParams();
      a.append('liveAddress', that.liveAddress);
      await axios.post("http://" + that.Api + "/api/Live_address/addLiveAddress", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("添加成功", response);
        that.getAddress();
        that.liveAddress = '';
      }, function (err) {
        console.log(err);
      });

    },
    async edit() {
      let that = this;
      let JWT = that.$store.state.JWT;
      let a = {
        liveAddress: that.liveAddress,
        liveAddressId: that.liveAddressId,
      }

      await axios.post("http://" + that.Api + "/api/Live_address/modifyLiveAddress", a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("修改成功", response);
        that.getAddress();
        that.liveAddress = '';
        that.dialogEdit = false;
      }, function (err) {
        console.log(err);
      });

    },
  },
  mounted() {
    this.getAddress();
    let breadcrumb = [
      {
        title: '审核管理'
      },
      {
        link: {name: 'liveAudit'},
        title: '直播地址管理'
      }
    ];
    this.$store.commit("savebreadcrumb", breadcrumb);
  },
}
</script>

<style scoped>
button:hover {
  background-color: #99ccff;
  text-decoration: none;
  text-decoration-color: #99a9bf;
  text-decoration-width: auto;
}

.card-wrapper{
  background-color: #ffffff;
  box-shadow: 0 0 10px #4d555d;
  border-radius: 5px;
  margin: 0 0 20px 0;
}

.subtitle {
  background-color: #6fadff;
}

.el-form-item__content {
  width: 400px;
}
</style>
