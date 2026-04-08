// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'

// 引入数据类型
import type { loginForm } from '@/api/user/type'
// 创建用户小仓库
export const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: () => {
    return {
      //直接获取token，刷新页面时，vuex中的token会丢失，所以需要从本地存储获取token
      token: localStorage.getItem('TOKEN'), //用户唯一标识token
    }
  },
  // 异步|逻辑的地方
  actions: {
    async userLogin(data: loginForm) {
      // 登录请求
      let result: any = await reqLogin(data)
      // 登录成功：200，获取到token
      // 登录失败：201，获取到错误信息
      if (result.code == 200) {
        this.token = result.data.token
        // 本地存储，持久化存储一份
        localStorage.setItem('TOKEN', result.data.token)
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
