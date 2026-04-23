import request from '@/utils/request'
import type { SpuResponseData } from './type'

const API = {
  // 获取已有数据
  SPU_URL: '/admin/product',
}

export const reqGetSPU = (page: number, limit: number, c3Id: number | string) =>
  request.get<any, SpuResponseData>(API.SPU_URL + `/${page}/${limit}?category3Id=${c3Id}`)
