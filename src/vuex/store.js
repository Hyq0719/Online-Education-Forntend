import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)
Vue.use(VueCookies)

export default new Vuex.Store({
    state: {
        isLogin: JSON.parse(sessionStorage.getItem('isLogin')) || false,
        JWT: JSON.parse(VueCookies.get('JWT')) || false,
        Preferences: JSON.parse(sessionStorage.getItem('Preferences')) || false,
        userData: JSON.parse(sessionStorage.getItem('userData')) || false,
        courseData: JSON.parse(sessionStorage.getItem('courseData')) || false,
        chapterData: JSON.parse(sessionStorage.getItem('chapterData')) || false,
        teacherData: {
            teacherClassData: [],
            teacherChapterData: [],
            teacherVideoData: [],
        },   //教师管理后台用的
        breadcrumb: [],
        isRegister: false,
        isLoginTeacher: JSON.parse(sessionStorage.getItem('isLoginTeacher')) || false,
    },
    mutations: {
        saveIsLogin(state) {
            state.isLogin = !state.isLogin;
            sessionStorage.setItem('isLogin', JSON.stringify(state.isLogin));
        },
        saveIsLoginTeacher(state) {
            state.isLoginTeacher = !state.isLoginTeacher;
            sessionStorage.setItem('isLoginTeacher', JSON.stringify(state.isLoginTeacher));
        },
        saveJWT(state, JWT) {
            state.JWT = JWT;
            VueCookies.set('JWT', JSON.stringify(state.JWT), "7D");
        },
        savePreferences(state, Preferences) {
            state.Preferences = Preferences;
            sessionStorage.setItem('Preferences', JSON.stringify(state.Preferences));
        },
        saveAvatar(state) {
            state.userData.studentPicUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
            sessionStorage.setItem('userData', JSON.stringify(state.userData));
        },
        saveAvatarTeacher(state) {
            state.userData.teacherPicUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
            sessionStorage.setItem('userData', JSON.stringify(state.userData));
        },
        saveMajor(state) {
            state.userData.major = {
                majorContent: '',
            }
            sessionStorage.setItem('userData', JSON.stringify(state.userData));
        },
        saveData(state, userData) {
            state.userData = userData;
            sessionStorage.setItem('userData', JSON.stringify(state.userData));
        },
        saveCourseData(state, courseData) {
            state.courseData = courseData;
            sessionStorage.setItem('courseData', JSON.stringify(state.courseData));
        },
        saveChapterData(state, chapterData) {
            state.chapterData = chapterData;
            sessionStorage.setItem('chapterData', JSON.stringify(state.chapterData));
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
        savebreadcrumb(state, breadcrumb) {
            state.breadcrumb = breadcrumb;
        },
        saveIsRegister(state) {
            state.isRegister = true;
        },
    }
})

