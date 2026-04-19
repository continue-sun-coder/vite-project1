<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="categoryStore.c1Id" @change="handlerC1Change" :disabled="scene==0? false:true">
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" placeholder="请选择" @change="handlerC2Change" :disabled="scene==0? false:true">
          <el-option
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="categoryStore.c3Id" :disabled="scene==0? false:true">
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

// 当一级分类发生变化时，通知仓库获取二级分类的数据(保证id是有的)
const handlerC1Change = () => {
  // 需要将二级，三级的数据清空
  // 清空二级分类的选中项
  categoryStore.c2Id = ''
  // 清空三级分类的可选列表
  categoryStore.c3Arr = []
  // 清空三级分类的选中项
  categoryStore.c3Id = ''
  categoryStore.getC2Data()
}

// 获取三级分类的数据
const handlerC2Change = () => {
  // 二级分类发生变化，清除三级分类数据
  categoryStore.c3Id = ''
  categoryStore.getC3Data()
}

// 接收父组件传来的值
defineProps(['scene'])
</script>

<style scoped lang="scss">
.el-select {
  width: 200px;
}
.el-card {
  margin-bottom: 15px;
}
</style>
