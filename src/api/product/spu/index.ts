import request from '@/utils/request'
import type {
  SpuResponseData,
  AllTradeMark,
  SpuImgs,
  SaleAttrResponseData,
  AllSaleAttrResponseDate,
} from './type'

const API = {
  // 获取已有数据
  SPU_URL: '/admin/product',
  // 获取全部品牌的数据
  ALLTRADEMARK_URL: '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU的全部图片
  IMAGE_URL: '/admin/product/spuImageList/',
  // 获取某个SPU全部已有的销售属性
  SPUSALEATTR_URL: '/admin/product/spuSaleAttrList/',
  // 获取全部的销售属性
  ALLSALEATTR_URL: '/admin/product/baseSaleAttrList',
}
// 获取某个三级分类下已有的SPU的数据
export const reqGetSPU = (page: number, limit: number, c3Id: number | string) =>
  request.get<any, SpuResponseData>(API.SPU_URL + `/${page}/${limit}?category3Id=${c3Id}`)

// 获取全部品牌的数据
export const reqAllTrademark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)

// 获取某个SPU全部商品的图片地址
export const reqSpuImageList = (id: number) => request.get<any, SpuImgs>(API.ALLTRADEMARK_URL + id)

// 获取某SPU的全部已有销售属性
export const reqSpuSaleAttr = (id: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUSALEATTR_URL + id)

// 获取全部的销售属性
export const reqAllSaleAttr = () => request.get<any, AllSaleAttrResponseDate>(API.ALLSALEATTR_URL)
