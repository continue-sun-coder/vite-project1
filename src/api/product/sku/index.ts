import request from '@/utils/request'
import type { SkuResponseData } from './type'

const API = {
  // 获取已有的商品数据
  SKU_URL: '/admin/product/list/',
  // 商品上架
  SALE_URL: '/admin/product/onSale/',
  // 商品下架
  CANCELSALE_URL: '/admin/product/cancelSale/',
}

// 获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

// 已有商品上架请求
export const reqSaleSku = (skuId: number) => request.get<any, any>(API.SALE_URL + skuId)

// 下架商品
export const reqCancelSale = (skuId: number) => request.get<any, any>(API.CANCELSALE_URL + skuId)
