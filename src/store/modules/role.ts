// 角色管理相关仓库
import { defineStore } from 'pinia'
import { reqAllRoleList, reqSetPermission } from '@/api/acl/role'
import type { RoleData, Records, MenuResponseData, MenuList } from '@/api/acl/role/type'

export interface RoleState {
  roles: Records
  total: number
  currentPage: number
  pageSize: number
}

export const useRoleStore = defineStore('Role', {
  state: (): RoleState => {
    return {
      roles: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
    }
  },

  actions: {
    // 获取角色列表
    async getRoles(page: number = 1, pageSize: number = 5, keyword: string = '') {
      const result = await reqAllRoleList(page, pageSize, keyword)
      if (result.code === 200) {
        this.roles = result.data.records
        this.total = result.data.total
        this.currentPage = page
        this.pageSize = pageSize
        return 'ok'
      }
      return Promise.reject(new Error('获取角色列表失败'))
    },

    // 更新角色权限
    async updateRolePermission(roleId: number, permissionId: number[]) {
      const result = await reqSetPermission(roleId, permissionId)
      if (result.code === 200) {
        // 更新成功后，重新获取当前页的角色数据
        await this.getRoles(this.currentPage, this.pageSize)
        return 'ok'
      }
      return Promise.reject(new Error('更新权限失败'))
    },
  },

  getters: {
    // 根据ID获取角色
    getRoleById: (state) => (id: number) => {
      return state.roles.find((role) => role.id === id)
    },
  },
})
