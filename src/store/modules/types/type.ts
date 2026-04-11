import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库数据state类型
export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[] // 首页动态菜单的路由定义
}
