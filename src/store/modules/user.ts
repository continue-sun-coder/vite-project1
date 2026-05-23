// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { loginForm, loginResponseData, userReponseData } from '@/api/user/type'
import type { userState } from './types/type'

// 引入工具函数
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

// 引入路由（常量路由），因为以后
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
// 引入路由实例
import router from '@/router'
// 引入深拷贝方法
//@ts-expect-error 没有ts类型
import cloneDeep from 'lodash/cloneDeep'
// import { reactive } from 'vue'

// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      //
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

// 创建用户小仓库
export const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): userState => {
    return {
      //直接获取token，刷新页面时，vuex中的token会丢失，所以需要从本地存储获取token
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute as [],
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      // 登录请求
      const result: loginResponseData = await reqLogin(data)
      // console.log(result)
      // 登录成功：200，获取到token
      // 登录失败：201，获取到错误信息
      if (result.code == 200) {
        this.token = result.data as string
        // 本地存储，持久化存储一份
        SET_TOKEN(this.token)
        await this.userInfo()
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message || '登录失败'))
      }
    },
    // 获取用户信息的方法
    async userInfo() {
      // 获取用户信息进入存储仓库（头像、名字）
      const res: userReponseData = await reqUserInfo()
      if (res.code == 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        this.buttons = res.data.buttons
        // 计算出当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), res.data.routes)
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute]
        // 目前路由管理的只有常量路由，用户计算完毕的异步路由和任意路由需要动态添加
        const newRoutes = [...userAsyncRoute, ...anyRoute]
        newRoutes.forEach((route) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message || '获取用户信息失败'))
      }
    },
    // 退出登录的方法
    async userLogout() {
      // console.trace('userLogout被调用了')
      const result = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        // 本地存储也要清除
        REMOVE_TOKEN()

        // 清除之前动态添加的路由
        const routes = router.getRoutes()
        routes.forEach(route => {
          if (route.name && !constantRoute.find(r => r.name === route.name)) {
            router.removeRoute(route.name)
          }
        })

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message || '退出登录失败'))
      }
    },
  },
  getters: {},
})
