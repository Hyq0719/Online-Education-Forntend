/* jshint esversion：6 */

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCoreVideoPlayer from 'vue-core-video-player'
import router from './router'


Vue.use(ElementUI)
Vue.use(VueCoreVideoPlayer, {
    lang: 'zh-CN'
})
Vue.use(router)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
