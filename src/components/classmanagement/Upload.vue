<template>
  <div>
    <div class="title">
      <h3>
        上传课程
      </h3>
      <el-divider></el-divider>
    </div>
    <el-row class="box-wrapper" style="height: auto">
      <el-row class="subtitle">
        <h5 style="margin: 10px 24px;float: left">创建课程</h5>
      </el-row>
      <el-row>
        <el-button type="primary" @click="dialog = true" style="margin: 10px 20px;float: right">创建<i
            class="el-icon-upload el-icon--right"></i></el-button>
      </el-row>
    </el-row>

    <el-row class="box-wrapper" style="height: auto">
      <el-row class="subtitle">
        <h5 style="margin: 10px 24px;float: left">上传课程视频</h5>
      </el-row>
      <el-row>
        <el-button type="primary" @click="dialog2 = true" style="margin: 10px 20px;float: right">上传<i
            class="el-icon-upload el-icon--right"></i></el-button>
      </el-row>
    </el-row>

    <el-row class="box-wrapper" style="height: auto">
      <el-row class="subtitle">
        <h5 style="margin: 10px 24px;float: left">上传记录</h5>
      </el-row>
      <el-row>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
          <el-table-column
              prop="name"
              label="课程名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="section"
              label="章节号"
              width="80">
          </el-table-column>
          <el-table-column
              prop="sectionname"
              label="章节名称">
          </el-table-column>
          <el-table-column
              prop="videoname"
              label="视频名称">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button-group style="margin-left: 24px">
                <el-button type="primary"
                           icon="el-icon-edit"
                ></el-button>
                <el-button type="primary"
                           icon="el-icon-delete"
                           @click.native.prevent="deleteRow(scope.$index, tableData)"></el-button>
              </el-button-group>
            </template>

          </el-table-column>
        </el-table>
      </el-row>
    </el-row>

    <el-drawer
        title="新建课程"
        :before-close="handleClose1"
        :visible.sync="dialog"
        direction="rtl"
        ref="drawer"
        size="850px"

    >
      <build-class @close="drawerClose"></build-class>

    </el-drawer>
    <el-drawer
        title="上传课程"
        :before-close="handleClose1"
        :visible.sync="dialog2"
        direction="rtl"
        ref="drawer"
        size="500px"
    >
      <update-class @close="drawerClose"></update-class>

    </el-drawer>

  </div>

</template>

<script>

export default {
  name: "Upload",
  data() {
    return {
      dialog: false,      //侧边栏状态
      dialog2: false,
      dynamicTags: ['计算机'],
      form: {
        name: '',
        intro: '',
        Isvip: 0,
      },
      imgNum: 1,
      imgSize: 2048000,
      tableData: [{
        courseID: '20160502',
        name: '线性代数',
        section: '4',
        sectionname: '行列式',
        videoname: '范德蒙行列式'
      }, {
        courseID: '20160503',
        name: '线性代数',
        section: '4',
        sectionname: '行列式',
        videoname: '正交矩阵',
      },]
    };

  },
  components: {
    buildClass: () => import('@/components/classmanagement/buildClassPage'),
    updateClass: () => import('@/components/classmanagement/editVideo')
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleClose1(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    drawerClose(data){
      this.dialog=data;
      this.dialog2=data;
    }
  },

}
</script>

<style scoped>
.title {
  margin: 50px 30px;
  text-align: left;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.box-wrapper {
  border: #1c1f21 solid 1px;
  border-radius: 6px;
  margin: 16px 30px;
  width: 1000px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.subtitle {
  background-color: #6fadff;
}

</style>
