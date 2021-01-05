import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        isLogin:false,
        currentData:{}
    },
    mutations:{
        saveIsLogin(state){
            state.isLogin=!state.isLogin;
        },
        saveData(state,currentData){
            state.currentData=currentData;
        }
    }
})