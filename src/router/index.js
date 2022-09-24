import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginApp from '@/components/LoginApp'
import Login from '@/views/loginapp/Login'
import RegUser from '@/views/loginapp/RegUser'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/views/users/Users'
import RightList from '@/views/rights/RightList'
import RoleList from '@/views/rights/RoleList'

Vue.use(VueRouter)

// 因为要挂载路由守卫 因此不能直接export default
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/loginapp/login' },
    { path: '/loginapp',
      component: LoginApp,
      children: [
        { path: '/loginapp/login', component: Login },
        { path: '/loginapp/reguser', component: RegUser }
      ]
    },
    { path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rightlist', component: RightList },
        { path: '/rolelist', component: RoleList }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/loginapp' || "/loginapp/login" || "/loginapp/reguser") return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/loginapp')
  next()

})

export default router
