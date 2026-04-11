<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  img {
    width: 50px;
    height: 50px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
