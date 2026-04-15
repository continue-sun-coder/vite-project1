// 路由鉴权，项目当中路由能不能被访问的权限的设置
import router from '@/router'
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false }) // 进度条配置
// 获取用户仓库内token数据，判断用户是否登录成功
import { useUserStore } from './store/modules/user'
import setting from './setting'
// import pinia from './store'

// 全局前置守卫
router.beforeEach(async (to, from) => {
  document.title = `${setting.title} - ${to.meta.title}`
  // to:  将要访问的路由
  // from: 从哪个路由来
  // next: 路由的放行函数
  nprogress.start()
  const userStore = useUserStore()
  const token = userStore.token
  // 获取用户名字
  const username = userStore.username
  // 如果登录成功
  if (token) {
    // 不能到登录页面，其他页面可以
    if (to.path == '/login') {
      return '/'
    } else {
      // 有用户信息则放行，否则在守卫发请求获取到用户信息后再放行
      if (username) {
        return true
      } else {
        try {
          await userStore.userInfo()
          return true
        } catch (error) {
          // tokeng过期了，获取不到用户信息了
          await userStore.userLogout()
          return { path: '/login', query: { redirect: to.path } }
        }
      }
    }
  } else {
    // 登录失败，前往登录页面，记录下想去的页面
    if (to.path == '/login') {
      return true
    } else {
      return { path: '/login', query: { redirect: to.path } }
    }
  }
})
// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})

// 1.路由切换时的进度条
// 2.路由组件访问权限的设置
// 3.
