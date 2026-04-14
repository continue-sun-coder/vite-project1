// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'

// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { userState } from './types/type'

// 引入工具函数
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

// 引入路由（常量路由），因为以后
import { constantRoutes } from '@/router/routes'
// import { reactive } from 'vue'
// 创建用户小仓库
export const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): userState => {
    return {
      //直接获取token，刷新页面时，vuex中的token会丢失，所以需要从本地存储获取token
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoutes,
      username: '',
      avatar: '',
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      // 登录请求
      const result: loginResponseData = await reqLogin(data)
      // 登录成功：200，获取到token
      // 登录失败：201，获取到错误信息
      if (result.code == 200) {
        this.token = result.data.token as string
        // 本地存储，持久化存储一份
        SET_TOKEN(this.token)
        await this.userInfo()
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息的方法
    async userInfo() {
      // 获取用户信息进入存储仓库（头像、名字）
      const res = await reqUserInfo()
      if (res.code == 200) {
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error('获取用户信息失败'))
      }
    },
    // 退出登录的方法
    userLogout() {
      console.log('退出登录')
      this.token = ''
      this.username = ''
      this.avatar = ''
      // 本地存储也要清除
      REMOVE_TOKEN()
      console.log('退出登录成功')
    },
  },
  getters: {},
})
