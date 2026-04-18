<template>
  <div>
    <!-- 三级分类组件 -->
    <Category />
    <el-card>
      <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id? false : true" style="margin: 15px 0">添加平台属性</el-button>
      <el-table style="width: 100%" border>
        <el-table-column prop="date" type="index" label="序号" width="80px" align="center" />
        <el-table-column prop="name" label="属性名称" width="120px" align="center" />
        <el-table-column prop="address" label="属性值名称" align="center" />
        <el-table-column prop="address" label="操作" width="80px" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store/modules/category'
let categoryStore = useCategoryStore()

</script>

<style scoped lang="scss">
</style>
