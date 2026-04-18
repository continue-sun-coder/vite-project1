export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 分类对象的ts数据类型
export interface CategoryObj {
  id: number | string
  name: string
  Category1Id?: number
  Category2Id?: number
}
// 相应分类接口返回数据的ts类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
