<template>
  <div>
    <svg :style="{ width, height }">
      <use :href="`${prefix}${name}`" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Props {
  prefix?: string
  name: string
  color?: string
  width?: string
  height?: string
}

withDefaults(defineProps<Props>(), {
  prefix: '#icon-',
  color: 'currentColor',
  width: '16px',
  height: '16px',
})
</script>

<style scoped></style>
