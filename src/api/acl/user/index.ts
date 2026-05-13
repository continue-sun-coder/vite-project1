import request from '@/utils/request'
import type { UserResponseData, User, AllRoleResponseData, SetRoleData } from './type'

const API = {
  // 获取全部已有用户账号信息
  ALLUSER_URL: '/admin/acl/user/',
  // 添加一个新的用户
  ADDUSER_URL: '/admin/acl/user/save',
  // 更新已有用户账号
  UPDATEUSER_URL: '/admin/acl/user/update',
  // 获取全部角色，当前账号拥有的角色接口
  ALLROLEURL: '/admin/acl/user/toAssign/',
  // 已有用户分配角色接口
  SETROLE_URL: '/admin/acl/user/doAssignRole',
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

// 获取全部角色，当前用户包含的职位
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)

// 给用户分配角色接口
export const reqSetUserRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data)
