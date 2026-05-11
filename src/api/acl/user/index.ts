import request from '@/utils/request'
import type { UserResponseData, User } from './type'

const API = {
  // 获取全部已有用户账号信息
  ALLUSER_URL: '/admin/acl/user/',
  // 添加一个新的用户
  ADDUSER_URL: '/admin/acl/user/save',
  // 更新已有用户账号
  UPDATEUSER_URL: '/admin/acl/user/update',
}

// 获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)

// 添加用户与更新用户接口
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    //携带参数有ID，更新
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
