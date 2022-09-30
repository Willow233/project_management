
// 采用了API单独模块封装和axios拦截器的方式进行开发
// axios二次封装
// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3007/'

/* axios.defaults.baseURL = {
    dev:'http://127.0.0.1:3007/',
    pro:''
} */
// axios拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios