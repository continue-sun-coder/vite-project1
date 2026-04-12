<template>
  <div class="header">
    <div class="header_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="header_right">
      <Theme></Theme>
    </div>
  </div>
</template>

<script setup lang="ts">
import Theme from './theme/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
defineOptions({
  name: 'NavHeader'
})
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
    .header_left {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }

    .header_right {
        display: flex;
        align-items: center;
    }
}
</style>