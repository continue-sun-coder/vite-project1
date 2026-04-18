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

// 属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
// 存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]
// 属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
// 存储每个属性对象的数组类型
export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
  data: AttrList
}
