<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
          <el-menu background-color="#001529" text-color="white" active-text-color="#409EFF" router>
            <!-- 根据路由动态生成菜单 -->
             <NavMenu :menuList="userStore.menuRoutes"></NavMenu>
          </el-menu>
      </el-scrollbar>
    </div>
    <!-- 头部导航 -->
    <div class="layout_header">12345</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import NavMenu from './menu/index.vue'
import Main from './main/index.vue'

import { useUserStore } from '@/store/modules/user'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: red;
  position: relative;

  // 左侧菜单
  .layout_slider {
    position: fixed;
    left: 0;
    top: 0;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-bg-color;

    .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
              .el-menu-item {
                color: white !important;
                
                &:hover {
                  color: #409EFF !important; // 悬停色
                }
                
                &.is-active {
                  color: #409EFF !important; // 激活色
                }
              }
        }
  }
  // 头部导航
  .layout_header {
    position: fixed;
    left: $base-menu-width;
    top: 0;
    width: calc(100% - $base-menu-width);
    height: $base-header-height;
    background: blue;
  }
  // 内容展示区
  .layout_main {
    position: absolute;
    left: $base-menu-width;
    top: $base-header-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-header-height);
    padding: 20px;
    background: green;
    overflow: auto;
  }
}
</style>
