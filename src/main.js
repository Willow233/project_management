import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入样式
import './assets/css/global.css'
import './assets/css/reset.css'
import './assets/fonts/iconfont.css'
// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3007/'
// axios.interceptors.request.user(config => {
//   config.header.Authorization = window.sessionStorage.getItem('token')
// })
Vue.prototype.$http = axios

// 关闭提示

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
