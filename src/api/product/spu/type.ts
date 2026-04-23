export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// export interface spuSaleAttrList{

// }

// export interface spuImageList {}

// SPU数据的ts类型
export interface SPU {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  // SPU品牌的id
  tmId: number
  // SPU的销售属性
  spuSaleAttrList: null
  // SPU的照片墙
  spuImageList: null
}

export type Records = SPU[]
// 已有的SPU接口返回的数据类型
export interface SpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 已有品牌的ts数据类型
export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}

export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}

// 商品图片的tsleix
export interface SpuImg {
  id: number
  createTime: string
  updateTime: string
  spuId: number
  imgName: string
  imgUrl: string
}

export interface SpuImgs extends ResponseData {
  data: SpuImg[]
}

// 销售属性值对象
export interface SaleAttrValue {
  id?: number
  createTime: null
  updateTime: null
  spuId: number
  baseSaleSttrId: number
  saleAttrValueName: string
  saleAttrName: string
  isChecked: null
}
// 存储已有的销售属性值数组类型
export type spuSaleAttrValueList = SaleAttrValue[]
// 销售属性对象
export interface SaleAttr {
  id?: number
  createTime: null
  updateTime: null
  spuId: number
  baseSaleSttrId: number
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList
}
// SPU已有的销售属性接口返回数据的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 全部SPU的返回数据
export interface AllSaleAttr {
  id: number
  name: string
}

export interface AllSaleAttrResponseDate extends ResponseData {
  data: AllSaleAttr[]
}
