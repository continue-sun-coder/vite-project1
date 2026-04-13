<template>
  <div class="breadcrumb-container">
    <!-- 左侧 -->
    <el-icon class="fold-icon" @click="changeIcon">
      <component :is="layoutSettingStore.flod ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 右侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <el-icon class="breadcrumb-icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useLayoutSettingStore } from '@/store/modules/setting'
import { useRoute } from 'vue-router'
let layoutSettingStore = useLayoutSettingStore()
// 定义一个方法来切换菜单状态
const changeIcon = () => {
  layoutSettingStore.flod = !layoutSettingStore.flod
}
let $route = useRoute()
defineOptions({
  name: 'Breadcrumb',
})
</script>

<style scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  font-size: 16px; /* 统一字体大小 */
}

.fold-icon {
  font-size: 22px; /* 折叠图标更大 */
  margin-right: 10px;
  cursor: pointer;
  vertical-align: middle;
}

.breadcrumb-icon {
  font-size: 18px; /* 面包屑图标适中 */
  margin-right: 5px;
  vertical-align: middle;
}

:deep(.el-breadcrumb__item) {
  display: flex;
  align-items: center;
}

:deep(.el-breadcrumb__inner) {
  display: flex;
  align-items: center;
  font-size: 18px;
}
</style>
