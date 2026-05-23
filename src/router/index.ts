import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior() {
    // 始终滚动到顶部
    return {
      top: 0,
      left: 0,
    }
  },
})

export default router
