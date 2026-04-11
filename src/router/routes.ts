//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoutes = [
  {
    //登录
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    //404
    path: '/404',
    component: () => import('@/view/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/screen',
    component: () => import('@/view/screen/index.vue'),
    name: 'Screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/view/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/view/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/view/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/view/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/view/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/view/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/view/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },
]
