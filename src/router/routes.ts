// 对外暴露配置路由（常量路由）
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/view/home/index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/view/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
