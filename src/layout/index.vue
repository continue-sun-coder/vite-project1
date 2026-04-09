<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
    </div>
    <!-- 头部导航 -->
    <div class="layout_header">12345</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <p style="height: 10000000000px; background-color: yellow">23456789</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
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
