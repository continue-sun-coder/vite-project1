import request from '@/utils/request'
import type { PermissionResponsData } from './type'

// 枚举地址
const API = {
  // 获取全部菜单与按钮的标识数据
  ALLPERMISSION_URL: '/admin/acl/permission',
  // 新增子菜单
  ADDMENU_URL: '/admin/acl/permission/save',
  // 更新菜单
  UPDATEMENU_URL: '/admin/acl/permission/update',
  // 删除菜单
  REMOVEMENU_URL: '/admin/acl/permission/remove/',
}

// 获取菜单数据
export const reqAllPermisson = () => request.get<any, PermissionResponsData>(API.ALLPERMISSION_URL)
