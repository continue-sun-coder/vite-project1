<template>
  <el-card>
      <el-form :inline="true" > 
          <el-form-item label="一级分类" >
            <el-select placeholder="请选择" v-model="categoryStore.c1Id">
              <el-option
                v-for="item in categoryStore.c1Arr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-select v-model="categoryStore.c2Id" placeholder="请选择">
              <el-option
                v-for="item in categoryStore.c2Arr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="三级分类">
            <el-select v-model="categoryStore.c3Id" placeholder="请选择">
              <el-option
                v-for="item in categoryStore.c3Arr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/store/modules/category'

const categoryStore = useCategoryStore()

// 组件挂载完成后，通知仓库获取一级分类的数据
onMounted(() => {
  categoryStore.getC1Data()

})
</script>

<style scoped lang="scss">
.el-select {
  width: 200px;
}
.el-card {
  margin-bottom: 15px;
}
</style>