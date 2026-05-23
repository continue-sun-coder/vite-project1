# 猫罐头管理台

<div align="center">

  <!-- 技术栈徽章 -->
  <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white" alt="Vue 3.5"/>
  <img src="https://img.shields.io/badge/TypeScript-6.0-007ACC?logo=typescript&logoColor=white" alt="TypeScript 6.0"/>
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white" alt="Vite 8.0"/>
  <img src="https://img.shields.io/badge/Element_Plus-2.13-409EFF?logo=element-plus&logoColor=white" alt="Element Plus 2.13"/>
  <img src="https://img.shields.io/badge/Pinia-3.0-FFD700?logo=pinia&logoColor=black" alt="Pinia 3.0"/>
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"/>

</div>

## 项目简介

猫罐头管理台是一个基于 Vue 3 + Vite + TypeScript 构建的现代化后台管理系统，提供权限管理、商品管理、数据大屏等核心功能。项目采用最新的前端技术栈，实现了完整的权限控制机制和优秀的用户体验。

## 技术栈

- **前端框架**: Vue 3.5 + Composition API
- **构建工具**: Vite 8.0
- **语言**: TypeScript 6.0
- **状态管理**: Pinia 3.0
- **路由管理**: Vue Router 5.0
- **UI组件库**: Element Plus 2.13
- **图表库**: ECharts 6.1
- **HTTP请求**: Axios 1.14
- **CSS预处理器**: Sass 1.99
- **代码规范**: ESLint + Prettier + Stylelint

## 项目预览

| 功能模块 | 预览图 | 功能描述 |
|---------|--------|----------|
| **登录页** | ![登录页](https://via.placeholder.com/300x200/409EFF/ffffff?text=Login) | 简洁现代的登录界面，支持多种认证方式 |
| **数据大屏** | ![数据大屏](https://via.placeholder.com/300x200/67C23A/ffffff?text=Screen) | 实时数据可视化，多种图表类型展示 |
| **权限管理** | ![权限管理](https://via.placeholder.com/300x200/E6A23C/ffffff?text=ACL) | 完整的RBAC权限控制，支持动态路由 |
| **商品管理** | ![商品管理](https://via.placeholder.com/300x200/F56C6C/ffffff?text=Product) | 商品分类、规格、库存等全链路管理 |

## 功能特性

### 🎨 核心功能

- **权限管理**: 完整的路由权限控制，支持动态路由加载
- **用户管理**: 用户登录、退出、信息获取
- **商品管理**: 品牌、属性、SPU、SKU管理
- **数据大屏**: 可视化数据展示，包含多种图表类型
- **404页面**: 友好的错误页面处理

### 🛠️ 技术特性

- **TypeScript**: 完整的类型安全支持
- **响应式设计**: 适配不同屏幕尺寸
- **暗黑模式**: 支持主题切换
- **进度条**: 路由切换时的加载进度显示
- **SVG图标**: 使用SVG图标系统
- **代码规范**: ESLint + Prettier + Stylelint

## 环境要求

| 环境 | 版本要求 | 说明 |
|------|----------|------|
| **Node.js** | ≥ 16.0.0 | 建议使用LTS版本 |
| **pnpm** | ≥ 8.0.0 | 推荐使用pnpm作为包管理器 |
| **Git** | ≥ 2.0.0 | 版本控制工具 |
| **VS Code** | ≥ 1.80.0 | 推荐开发IDE |

## 快速开始

### 安装依赖

```bash
# 使用pnpm（推荐）
pnpm install

# 或使用npm
npm install
```

### 启动开发服务器

```bash
# 开发环境
pnpm dev

# 或
npm run dev
```

### 构建项目

```bash
# 测试环境
pnpm build:test

# 生产环境
pnpm build:pro

# 或
npm run build
```

### 代码检查和格式化

```bash
# 运行所有检查
pnpm lint:all

# 自动修复
pnpm fix

# 格式化代码
pnpm format
```

## 项目亮点

### 🔐 动态路由权限控制系统

**技术难点**:
- 如何实现前端路由与后端权限的动态对接
- 如何避免不同用户间的路由权限残留
- 如何确保刷新页面后权限状态的一致性

**解决方案**:
1. **路由分层设计**: 将路由分为常量路由、异步路由和动态路由三层
2. **权限映射机制**: 将后端返回的权限数据映射为前端路由配置
3. **动态添加路由**: 使用`router.addRoute()`在用户登录时动态添加权限路由
4. **路由清理机制**: 在退出登录时清理所有动态添加的路由，避免权限残留

**创新点**:
- 实现了路由级别的细粒度权限控制
- 支持多角色、多层级的权限管理
- 通过路由守卫实现全局权限验证

### 🎯 按钮级权限控制实现

**实现方式**:
1. **自定义指令**: 开发`v-has`指令，用于控制按钮显示权限
2. **权限校验**: 在指令中校验当前用户是否拥有指定权限
3. **动态渲染**: 根据权限结果动态控制DOM元素的显示/隐藏

**核心代码逻辑**:
```typescript
// 权限指令实现
const hasButton = {
  mounted(el: HTMLElement, binding: any) {
    const { value } = binding
    const roles = useUserStore().roles
    if (!roles.includes(value)) {
      el.style.display = 'none'
    }
  }
}
```

**优势**:
- 细粒度控制到按钮级别
- 代码侵入性小，使用简单
- 支持权限的动态更新

### 🌳 递归菜单组件设计

**设计思路**:
1. **递归组件**: 使用递归方式渲染多级菜单结构
2. **动态路由**: 菜单项与路由配置动态绑定
3. **权限集成**: 菜单渲染时自动过滤无权限项
4. **状态管理**: 使用Pinia管理菜单展开状态

**关键技术**:
- Vue 3的递归组件机制
- 动态路由与菜单的映射关系
- 权限数据与菜单渲染的联动

**用户体验优化**:
- 支持菜单搜索和筛选
- 记住用户的菜单展开状态
- 响应式设计适配移动端

## 主要功能说明

### 权限管理系统

项目实现了完整的权限控制机制：

1. **常量路由**: 所有用户都可访问的基础路由（登录、首页、404等）
2. **异步路由**: 需要根据用户权限动态加载的路由
3. **动态路由**: 在用户登录时根据权限动态添加到路由器
4. **路由守卫**: 通过`permission.ts`实现全局路由守卫，控制访问权限
5. **按钮权限**: 通过自定义指令`v-has`控制按钮级别的权限

### 路由管理

- **路由定义**: `src/router/routes.ts`中定义了所有路由配置
- **动态添加**: 用户登录成功后根据权限动态添加路由
- **路由清理**: 退出登录时清理动态添加的路由，避免权限残留

### 状态管理

使用Pinia进行状态管理，主要模块包括：
- **user**: 用户信息、token、权限路由等

## 项目结构

```
src/
├── api/                    # API接口
│   ├── user/              # 用户相关接口
│   └── user/type.ts       # 用户接口类型定义
├── assets/                 # 静态资源
├── components/             # 全局组件
│   ├── Category/          # 分类组件
│   └── SvgIcon/           # SVG图标组件
├── directive/              # 全局指令
│   └── has.ts            # 权限指令
├── layout/                 # 布局组件
│   ├── header/           # 头部区域
│   │   ├── breadcrumb/  # 面包屑
│   │   └── theme/       # 主题切换
│   ├── main/             # 主内容区域
│   ├── menu/             # 侧边菜单
│   └── index.vue         # 布局入口
├── router/                # 路由配置
│   ├── routes.ts         # 路由定义
│   └── index.ts          # 路由实例
├── store/                 # 状态管理
│   ├── modules/          # 模块
│   │   ├── user.ts      # 用户模块
│   │   └── types/       # 类型定义
│   └── index.ts          # Pinia实例
├── styles/                # 全局样式
├── utils/                 # 工具函数
│   └── token.ts          # Token管理
├── view/                  # 页面视图
│   ├── acl/              # 权限管理
│   │   ├── user/        # 用户管理
│   │   ├── role/        # 角色管理
│   │   └── permission/  # 菜单管理
│   ├── product/          # 商品管理
│   │   ├── trademark/   # 品牌管理
│   │   ├── attr/        # 属性管理
│   │   ├── spu/         # SPU管理
│   │   └── sku/         # SKU管理
│   ├── screen/           # 数据大屏
│   │   └── components/  # 大屏组件
│   ├── home/             # 首页
│   ├── login/            # 登录页
│   └── 404/              # 404页面
├── App.vue                # 根组件
├── main.ts               # 入口文件
├── permission.ts         # 路由权限控制
└── setting.ts            # 项目配置
```

## 更新日志

### v1.0.0 (2024-05-23)
🎉 **项目初始化**
- 完成项目基础架构搭建
- 集成Vue 3 + Vite + TypeScript技术栈
- 实现基础权限管理系统

✨ **新增功能**
- 完整的用户认证系统
- 动态路由权限控制
- 数据大屏可视化
- 商品管理模块

🐛 **问题修复**
- 修复404页面跳转后退出登录卡顿白屏问题
- 修复权限路由残留问题
- 优化路由守卫逻辑

📝 **文档完善**
- 编写完整的README文档
- 添加代码注释和类型定义
- 完善开发规范说明

## 浏览器兼容性

| 浏览器 | 最低版本 | 推荐版本 |
|--------|----------|----------|
| **Chrome** | 80 | 90+ |
| **Firefox** | 75 | 85+ |
| **Safari** | 13 | 14+ |
| **Edge** | 80 | 90+ |
| **Opera** | 67 | 75+ |

> **注意**: 项目使用了现代Web API，建议使用最新版浏览器以获得最佳体验。

## 常见问题及修复

### 1. 404页面跳转后退出登录卡顿白屏问题

**问题描述**: 在404页面跳转回首页之后，退出登录出现卡顿，无法回到登录页面，刷新会一直加载白屏。

**解决方案**: 在`src/permission.ts`中修复导航守卫逻辑：

```typescript
// 修复前
if (to.path == '/login') {
  return '/'
}

// 修复后
if (to.path === '/login') {
  next({ path: '/' })
}
```

**修复原理**: 必须调用`next()`函数来解析导航，直接返回字符串会导致导航循环。

### 2. 权限路由残留问题

**问题描述**: 从admin账户在普通用户无法查看的页面退出后，登录普通用户，路由显示是原来的退出前的路由，页面也是，需要刷新之后才会到404。

**解决方案**: 在`src/store/modules/user.ts`的`userLogout()`方法中添加路由清理逻辑：

```typescript
// 清除之前动态添加的路由
const routes = router.getRoutes()
routes.forEach((route) => {
  if (route.name && !constantRoute.find((r) => r.name === route.name)) {
    router.removeRoute(route.name)
  }
})
```

**修复原理**: 退出登录时清理所有动态添加的异步路由，避免不同用户间的路由权限冲突。

## 开发规范

### 代码规范

- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 使用Stylelint进行样式检查
- 提交代码前自动运行检查（husky + commitlint）

### 文件命名

- 组件文件使用PascalCase命名
- 工具函数使用camelCase命名
- 样式文件使用kebab-case命名

### 组件开发

- 使用Composition API
- 合理使用TypeScript类型定义
- 组件props和emits明确定义类型

## 部署

### 环境要求

- Node.js >= 16
- pnpm >= 8.0

### 部署步骤
1. 构建项目：`pnpm build:pro`
2. 将`dist`目录部署到Web服务器
3. 配置服务器路由回退到index.html（支持前端路由）

## 联系方式

**作者**: 猫罐头开发团队  
**邮箱**: kunlan.huang@outlook.com  
**GitHub**: https://github.com/continue-sun-coder/vite-project1.git

## 使用说明

这是一个实习项目，主要用于学习和实践Vue 3 + TypeScript + Vite开发。

## 许可证

MIT License

---

**项目基于 Vue 3 + Vite + TypeScript 构建，持续更新中...**
