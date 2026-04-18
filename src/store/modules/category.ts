// 商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { categoryState } from './types/type'

export const useCategoryStore = defineStore('category', {
  state: (): categoryState => {
    return {
      // 一级分类数组
      c1Arr: [],
      // 一级分类的id
      c1Id: '',
      // 二级分类数组
      c2Arr: [],
      // 二级分类的id
      c2Id: '',
      // 三级分类数组
      c3Arr: [],
      // 三级分类id
      c3Id: '',
    }
  },
  actions: {
    // 获取一级分类数据的方法
    async getC1Data() {
      const result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    // 获取二级分类数据的方法
    async getC2Data() {
      const result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code === 200) {
        this.c2Arr = result.data
      }
    },
    // 获取三级分类数据的方法
    async getC3Data() {
      const result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code === 200) {
        this.c3Arr = result.data
      }
    },
  },
  getters: {},
})
