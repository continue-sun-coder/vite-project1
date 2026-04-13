<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick} from 'vue'
import { useLayoutSettingStore } from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
// 定义一个flag来控制组件的渲染
let flag = ref(true)
// 监听用户是否点击了更新按钮
watch(
  () => layoutSettingStore.refsh,
  () => {
    flag.value = false
    // 使用nextTick来确保DOM更新完成后再重新渲染组件
    nextTick(() => {
      flag.value = true
    })
  }
)
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
