<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ flod: layoutSettingStore.flod }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="$route.path"
          :collapse="layoutSettingStore.flod"
          background-color="#001529"
          text-color="white"
          active-text-color="#409EFF"
          router
        >
          <!-- 根据路由动态生成菜单 -->
          <NavMenu :menuList="userStore.menuRoutes"></NavMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 头部导航 -->
    <div class="layout_header" :class="{ flod: layoutSettingStore.flod }">
      <NavHeader></NavHeader>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{ flod: layoutSettingStore.flod }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import NavMenu from './menu/index.vue'
import Main from './main/index.vue'
import NavHeader from './header/index.vue'

import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useLayoutSettingStore } from '@/store/modules/setting'
let userStore = useUserStore()
let $route = useRoute()
let layoutSettingStore = useLayoutSettingStore()

defineOptions({
  name: 'Layout',
})
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  position: relative;

  // 左侧菜单
  .layout_slider {
    position: fixed;
    left: 0;
    top: 0;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-bg-color;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.flod {
      width: $base-menu-flod-width;
    }
  }
  // 头部导航
  .layout_header {
    position: fixed;
    left: $base-menu-width;
    top: 0;
    width: calc(100% - $base-menu-width);
    height: $base-header-height;
    color: black;

    &.flod {
      left: $base-menu-flod-width;
      width: calc(100% - $base-menu-flod-width);
    }
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
    box-sizing: border-box;
    transition: all 0.3s;

    &.flod {
      left: $base-menu-flod-width;
      width: calc(100% - $base-menu-flod-width);
    }
  }
}
</style>
