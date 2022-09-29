import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入样式
import './assets/css/global.css'
import './assets/css/reset.css'
import './assets/fonts/iconfont.css'

import TreeTable from 'vue-table-with-tree-grid'
// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3007/'
//通过axios
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

// 导入mock
import '../api/mock.js'

// 关闭提示

Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
