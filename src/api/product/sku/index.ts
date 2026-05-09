import request from '@/utils/request'
import type { SkuResponseData } from './type'

const API = {
  // 获取已有的商品数据
  SKU_URL: '/admin/product/list/',
}

// 获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
