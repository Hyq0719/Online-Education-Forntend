import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        userData: {},
        courseData: {},
        chapterData: {},
        teacherData: {
            teacherClassData: [],
            teacherChapterData: [],
            teacherVideoData: [],
        },   //教师管理后台用的
        breadcrumb:[],
        isRegister: false,
        isLoginTeacher: false,
    },
    mutations: {
        saveIsLogin(state) {
            state.isLogin = !state.isLogin;
        },
        saveIsLoginTeacher(state) {
            state.isLoginTeacher = !state.isLoginTeacher;
        },
        saveData(state, userData) {
            state.userData = userData;
        },
        saveCourseData(state, courseData) {
            state.courseData = courseData
        },
        saveChapterData(state, chapterData) {
            state.chapterData = chapterData;
        },
        saveTeacherClassData(state, teacherClassData) {
            state.teacherData.teacherClassData = teacherClassData;
        },
        saveTeacherChapterData(state, teacherChapterData) {
            state.teacherData.teacherChapterData = teacherChapterData;
        },
        saveTeacherVideoData(state, teacherVideoData) {
            state.teacherData.teacherVideoData = teacherVideoData;
        },
        savebreadcrumb(state,breadcrumb){
            state.breadcrumb=breadcrumb;
        },
        saveIsRegister(state) {
            state.isRegister = true;
        },
    }
})

