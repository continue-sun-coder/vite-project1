// 属性相关的API文件
import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData } from './type'
// 属性接口
const API = {
  // 一级分类的接口
  C1_URL: '/admin/product/getCategory1',
  C2_URL: '/admin/product/getCategory2',
  C3_URL: '/admin/product/getCategory3',
  // 获取分类下已有的属性和属性值
  ATTR_URL: '/admin/product/attrInfoList',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + `/${category1Id}`)

export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + `/${category2Id}`)

// 获取对应分类下已有属性与属性值接口
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(API.ATTR_URL + `/${category1Id}/${category2Id}/${category3Id}`)
