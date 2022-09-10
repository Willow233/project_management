import Vue from 'vue'
import VueRouter from 'vue-router'
import WLogin from '@/components/WLogin'


Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    { path:'/', redirect:'/login' },
    { path:'/login', component:WLogin }
  ]
})
