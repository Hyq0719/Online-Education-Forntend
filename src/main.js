/* jshint esversion：6 */

import Vue from 'vue'
import App from './App.vue'
// import login from "@/login";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
