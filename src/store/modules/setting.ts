// layout组件相关配置仓库
import { defineStore } from 'pinia'

export const useLayoutSettingStore = defineStore('LayoutSettingStore', {
  state: () => {
    return {
      flod: false, //菜单是否折叠
      refsh: false, //是否刷新页面
    }
  },
})
