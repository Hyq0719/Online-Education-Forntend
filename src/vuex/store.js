import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        userData: {},
        courseData: {},
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
        // ChangeData(state, params) {
        //     state.userData.nickName = params.nickname;
        //     state.userData.grade = params.grade;
        //     state.userData.school = params.school;
        //     state.userData.sex = params.sex;
        // },
        saveData(state, userData) {
            state.userData = userData;
        },
        saveCourseData(state, courseData) {
            state.courseData = courseData;
        },
        saveIsRegister(state) {
            state.isRegister = true;
        },
    }
})

