// 属性相关的API文件
import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
// 属性接口
const API = {
  // 一级分类的接口
  C1_URL: '/admin/product/getCategory1',
  C2_URL: '/admin/product/getCategory2',
  C3_URL: '/admin/product/getCategory3',
  // 获取分类下已有的属性和属性值
  ATTR_URL: '/admin/product/attrInfoList',
  // 添加或修改已有属性的接口地址
  ADDUPDATE_URL: '/admin/product/saveAttrInfo',
  // 删除某一个属性
  DELETEATTR_URL: '/admin/product/deleteAttr/',
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

// 添加或修改已有属性
export const reqADDorUPDATEAttr = (data: Attr) => request.post<any, any>(API.ADDUPDATE_URL, data)

// 删除某一已有属性
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)
