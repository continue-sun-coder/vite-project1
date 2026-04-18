import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
// 定义小仓库数据state类型
export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[] // 首页动态菜单的路由定义
  username: string
  avatar: string
}

// 定义分类仓库数据state类型
export interface categoryState {
  c1Arr: CategoryObj[]
  c1Id: number | string
}
