/* jshint esversion：6 */

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCoreVideoPlayer from 'vue-core-video-player'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store';
import Api from './Api';

Vue.prototype.Api = Api.BASE_URL;

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueCoreVideoPlayer, {
    lang: 'zh-CN'
})
Vue.use(router)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
