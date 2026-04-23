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
