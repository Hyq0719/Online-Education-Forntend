import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        currentData: {},
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
        saveData(state, currentData) {
            state.currentData = currentData;
        },
        saveIsRegister(state) {
            state.isRegister = true;
        },
    }
})

