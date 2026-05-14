// layout组件相关配置仓库
import { defineStore } from 'pinia'

export const useLayoutSettingStore = defineStore('LayoutSettingStore', {
  state: () => {
    return {
      fold: false, //菜单是否折叠
      refresh: false, //是否刷新页面
    }
  },
})

export default useLayoutSettingStore
