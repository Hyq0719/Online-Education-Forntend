import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        currentData: {},
        isRegister: false,
        isTeacher: false,
    },
    mutations: {
        saveIsLogin(state) {
            state.isLogin = !state.isLogin;
        },
        saveData(state, currentData) {
            state.currentData = currentData;
        },
        saveIsRegister(state) {
            state.isRegister = true;
        },
        saveIsTeacher(state){             //用户是否注册为老师
            state.isTeacher = true;
        }
    }
})

