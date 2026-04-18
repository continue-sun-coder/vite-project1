// 商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import { reqC1 } from '@/api/product/attr/index'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { categoryState } from './types/type'

export const useCategoryStore = defineStore('category', {
  state: (): categoryState => {
    return {
      // 一级分类数组
      c1Arr: [],
      // 一级分类的id
      c1Id: '',
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
  },
  getters: {},
})
