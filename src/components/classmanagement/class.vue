<template>
  <div>

    <el-main v-show="classview" style="overflow:hidden;position: relative;height: 580px">
      <el-table :data="classData.list">
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
              <el-button type="primary"
                         @click="courseId=scope.row.courseId;dialogClassEdit = true">修改课程
              </el-button>
              <el-button type="primary" icon="el-icon-delete"
                         @click.native.prevent="deleteClass(scope.row.courseId)">删除课程
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div>
        <el-button circle @click="dialogClassBuild = true" style="position: absolute;bottom: 80px;left: 20px">
          <i class="el-icon-circle-plus-outline"></i>
        </el-button>
        <el-pagination style="position: absolute;bottom: 0;left: 300px"
                       background
                       layout="prev, pager, next"
                       :total="1">
        </el-pagination>
      </div>
    </el-main>

    <el-dialog title="创建课程" v-if="dialogClassBuild" :visible.sync="dialogClassBuild">
      <build-class-page @close="closeDialog"></build-class-page>
    </el-dialog>

    <el-dialog title="修改课程" v-if="dialogClassEdit" :visible.sync="dialogClassEdit">
      <build-class-page @close="closeDialog" :isEdit="true" :courseId="courseId"></build-class-page>

    </el-dialog>


    <el-main v-show="chapterview">
      <el-row class="box-wrapper" style="height: auto">
        <el-row class="subtitle">
          <h5 style="margin: 10px 24px;float: left">创建章节</h5>
        </el-row>
        <el-form :inline="true" label-width="80px" style="margin: 20px 0 10px 0">
          <el-form-item label="章节名称" style="width: 300px;margin-bottom: 0">
            <el-input v-model="chapterIntro"
                      placeholder="请输入内容"
                      maxlength="10"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item style="width: 300px;margin-bottom: 0">
            <el-button type="primary" @click="sendChapter()" style="float: right">创建<i
                class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-form>
        <el-row>

        </el-row>
      </el-row>
      <el-table :data="chapterData">
        <el-table-column label="章节号">
          <template slot-scope="scope">
            {{ scope.row.courseChapterPK.chapterId }}
          </template>
        </el-table-column>
        <el-table-column prop="chapterIntro" label="章节名称">
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit"
                         @click="openVideo(scope.row.courseChapterPK.courseId,scope.row.courseChapterPK.chapterId)">
                管理视频
              </el-button>
              <el-button type="primary"
                         @click="dialog1 = true;courseId = scope.row.courseChapterPK.courseId;chapterId=scope.row.courseChapterPK.chapterId ">修改章节
              </el-button>
              <el-button type="primary" icon="el-icon-delete"
                         @click.native.prevent="deleteChapter(scope.row.courseChapterPK.courseId,scope.row.courseChapterPK.chapterId)">删除章节
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-main v-show="videoview">
      <el-row class="box-wrapper" style="height: auto">
        <el-row class="subtitle">
          <h5 style="margin: 10px 24px;float: left">上传视频</h5>
        </el-row>
        <el-form :inline="true" label-width="80px" style="margin: 20px 0 10px 0">
          <el-form-item label="视频号" label-position="left" style="width: 300px;margin-bottom: 0">
            <el-input
                placeholder="请输入内容"
                maxlength="2"
                show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="视频名称" style="width: 300px;margin-bottom: 0">
            <el-input
                placeholder="请输入内容"
                maxlength="10"
                show-word-limit></el-input>
          </el-form-item>
          <el-form-item style="width: 300px;margin-bottom: 0">
            <el-button type="primary" @click="sendVideo" style="float: right">上传<i
                class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-form>
        <el-row>

        </el-row>
      </el-row>

      <el-table :data="videoData">
        <el-table-column label="视频号">
          <template slot-scope="scope">
            {{ scope.row.courseChapterVideoPK.videoId }}
          </template>
        </el-table-column>
        <el-table-column prop="videoName" label="视频名称">
        </el-table-column>
        <el-table-column label="操作" width="400px">
                    <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="dialog2 = true">修改视频</el-button>
            <el-button type="primary" icon="el-icon-delete"
                       @click.native.prevent="deleteVideo(scope.row.courseChapterPK.courseId,scope.row.courseChapterPK.chapterId)">删除课程
            </el-button>
          </el-button-group>
                    </template>
        </el-table-column>
      </el-table>
    </el-main>


    <el-drawer
        title="修改章节"
        :with-header="false"
        :before-close="handleClose"
        v-if="dialog1"
        :visible.sync="dialog1"
        direction="rtl"
        ref="drawer"
        size="600px"

    >
      <editChapter @close="drawerClose" :courseId="courseId" :chapterId="chapterId" ></editChapter>
    </el-drawer>

    <el-drawer
        title="修改视频"
        :with-header="false"
        :before-close="handleClose"
        v-if="dialog2"
        :visible.sync="dialog2"
        direction="rtl"
        ref="drawer"
        size="550px"

    >
      <editVideo @close="drawerClose"></editVideo>
    </el-drawer>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Classmanagement_class",
  props: ['id'],
  data() {
    return {
      dialogClassEdit: false,
      dialog1: false,
      dialog2: false,
      classview: true,
      chapterview: false,
      videoview: false,
      dialogClassBuild: false,
      classData: this.$store.state.teacherData.teacherClassData,
      chapterData: this.$store.state.teacherData.teacherChapterData,
      videoData: this.$store.state.teacherData.teacherVideoData,
      chapterIntro: "",
      courseId: null,  //临时传参用
      chapterId:null,
    }
  },
  components: {
    editChapter: () => import('@/components/classmanagement/editchapter'),
    editVideo: () => import('@/components/classmanagement/editVideo'),
    buildClassPage: () => import('@/components/classmanagement/tools/buildClassPage')
  },
  methods: {
    closeDialog() {
      this.dialogClassBuild = false;
      this.dialogClassEdit = false;
    },
    async deleteClass(a) {
      let that = this;
      let JWT = that.$store.state.JWT;
      await axios.post("http://" + that.Api + "/api/Course/getCourseById?courseId=" + a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除课程", response);
      }, function (err) {
        console.log(err);
      });
    },  //删除课程
    async deleteChapter(course,chapter) {
      let that = this;
      let JWT = that.$store.state.JWT;
      await axios.post("http://" + that.Api + "/api/Course/deleteCourseChapter?chapterId=" + chapter+"&courseId="+course, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除章节", response);
      }, function (err) {
        console.log(err);
      });
    },  //删除课程
    async deleteVideo(a) {
      let that = this;
      let JWT = that.$store.state.JWT;
      await axios.post("http://" + that.Api + "/api/Course/getCourseById?courseId=" + a, {
        headers: {
          'Authorization': JWT,
        }
      }).then(function (response) {
        console.log("删除课程", response);
      }, function (err) {
        console.log(err);
      });
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {
          });
    },

    async openChapter(id) {
      let that = this;
      await axios.get("http://" + that.Api + "/api/Course/getCourseChapter/" + id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        console.log("章节信息",res);
        that.$store.commit("saveTeacherChapterData", res.data.data);
      })
      that.chapterData = that.$store.state.teacherData.teacherChapterData;

      that.$router.push({name: 'classManagementClass', params: {id: 2}});
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '课程列表'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        }
      ]
      this.$store.commit("savebreadcrumb", breadcrumb)
    },   //打开章节时调用

    async openVideo(course, chapter) {
      let that = this;
      await axios.post("http://" + that.Api + "/api/Course/getCourseChapterViedo?chapterId=" + chapter + "&courseId=" + course, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        that.$store.commit("saveTeacherVideoData", res.data.data);
        console.log(res)
      })
      that.videoData = that.$store.state.teacherData.teacherVideoData;

      that.$router.push({name: 'classManagementClass', params: {id: 3}});
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '列表管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 3}},
          title: '视频管理'
        },
      ]
      this.$store.commit("savebreadcrumb", breadcrumb)
    },   //打开视频时调用

    drawerClose(data) {
      this.dialog1 = data;
      this.dialog2 = data;
    },

    sendVideo() {
    },

    async sendChapter() {
      let that = this;
      let a = new URLSearchParams();
      let course ;
      let chapter ;
      let intro;
      console.log(that.chapterData);
      if (that.chapterData.length === 0)
      {
         course = that.courseId;
         chapter = 1;
         intro = that.chapterIntro;
      }
      else
      {
        course = that.chapterData[0].courseChapterPK.courseId;
        chapter = that.chapterData.length + 1;
        intro = that.chapterIntro;
      }
      a.append('courseId', course);
      a.append('chapterId', chapter);
      a.append('intro', intro);
      await axios.post("http://" + that.Api + "/api/Course/addCourseChapter", a, {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        console.log(res);
      })
      await axios.get("http://" + that.Api + "/api/Course/getCourseChapter/" + course, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': that.$store.state.JWT,
        }
      }).then(function (res) {
        // console.log(res);
        that.$store.commit("saveTeacherChapterData", res.data.data)
      })
      that.chapterData = that.$store.state.teacherData.teacherChapterData;
    },  //创建章节
  },
  mounted: function () {

    // console.log(this.classData);
    let that = this;
    let a = that.$route.params.id;
    if (a == 1) {
      that.classview = true;
      that.chapterview = false;
      that.videoview = false;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '课程列表'
        }
      ]
      this.$store.commit("savebreadcrumb", breadcrumb);
    } else if (a == 2) {
      that.classview = false;
      that.chapterview = true;
      that.videoview = false;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '课程列表'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        }
      ]
      this.$store.commit("savebreadcrumb", breadcrumb)
    } else if (a == 3) {
      that.classview = false;
      that.chapterview = false;
      that.videoview = true;
      let breadcrumb = [
        {
          link: '/Classmanagement/blank',
          title: '课程管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 1}},
          title: '列表管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 2}},
          title: '章节管理'
        },
        {
          link: {name: 'classManagementClass', params: {id: 3}},
          title: '视频管理'
        },
      ]
      this.$store.commit("savebreadcrumb", breadcrumb)
    }
  },
  watch: {
    id(id) {
      let that = this;
      let a = id;
      console.log(a);
      if (a === 1) {
        that.classview = true;
        that.chapterview = false;
        that.videoview = false;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 1}},
            title: '课程列表'
          }
        ]
        this.$store.commit("savebreadcrumb", breadcrumb);
      } else if (a === 2) {
        that.classview = false;
        that.chapterview = true;
        that.videoview = false;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 1}},
            title: '课程列表'
          },
          {
            link: {name: 'classManagementClass', params: {id: 2}},
            title: '章节管理'
          }
        ]
        this.$store.commit("savebreadcrumb", breadcrumb)
      } else if (a === 3) {
        that.classview = false;
        that.chapterview = false;
        that.videoview = true;
        let breadcrumb = [
          {
            link: '/Classmanagement/blank',
            title: '课程管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 1}},
            title: '列表管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 2}},
            title: '章节管理'
          },
          {
            link: {name: 'classManagementClass', params: {id: 3}},
            title: '视频管理'
          },
        ]
        this.$store.commit("savebreadcrumb", breadcrumb)
      }
    },
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
