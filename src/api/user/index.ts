//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import type { loginForm, loginResponseData, userReponseData } from './type'

//项目用户相关的请求地址
// 把enum改成对象，方便使用
const API = {
  LOGIN_URL: '/admin/acl/index/login',
  USERINFO_URL: '/admin/acl/index/info',
  LOGOUT_URL: '/admin/acl/index/logout',
}
//登录接口
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息

export const reqUserInfo = () => request.get<any, userReponseData>(API.USERINFO_URL)

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
