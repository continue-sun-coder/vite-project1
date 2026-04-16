// 品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
//接口地址
const API = {
  TRADEMARK_URL: '/admin/product/baseTrademark',
  // 添加品牌
  ADD_TRADEMARK_URL: '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATE_TRADEMARK_URL: '/admin/product/baseTrademark/update',
  // 删除品牌
  DELETE_TRADEMARK_URL: '/admin/product/baseTrademark/remove',
}
// 获取已有品牌的接口方法
// page:获取第几页（默认第一页）
// limit:获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `/${page}/${limit}`)

// 添加和修改品牌的接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  // 如果data中有id,则是修改品牌的接口方法
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    // 否则是添加品牌的接口方法
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  }
}
