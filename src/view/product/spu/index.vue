<template>
  <div>
    <!-- 三级分类卡片 -->
    <Category :scene="scene" />

    <el-card style="margin-top: 15px">
      <div v-show="scene == 0">
        <el-button
          @click="addSPU"
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
        >
          添加SPU
        </el-button>
        <el-table :data="records" style="width: 100%; margin: 15px 0" border>
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column
            prop="spuName"
            label="名称"
            width="180px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            width="400px"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU" />
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSPU"
              />
              <el-button type="info" size="small" icon="InfoFilled" title="查看SKU列表" />
              <el-button type="danger" size="small" icon="Delete" title="删除SPU" />
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          @size-change="sizeChange"
          @current_change="getSPU"
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, ->, jumper, sizes, total"
          :total="total"
        />
      </div>
      <!-- 添加SPU/SKU子组件 -->
      <SpuForm v-show="scene == 1" @changeScene="changeScene" />
      <SkuForm v-show="scene == 2" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqGetSPU } from '@/api/product/spu'
import type { SpuResponseData, Records } from '@/api/product/spu/type'
import { useCategoryStore } from '@/store/modules/category'
let categoryStore = useCategoryStore()
import { ref, watch } from 'vue'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'

// 控制场景，0：已有的SPU，1：添加或修改SPU，2：添加SKU
let scene = ref<number>(0)
// 分页器默认页码
let pageNo = ref<number>(1)
// 每页展示的数据条数
let limit = ref<number>(3)
// 数据总条数
let total = ref<number>(0)
// 存储已有的SPU数据
let records = ref<Records>([])

// 监听三级分类ID的变化，有变化时就可以发送请求获取数据进行展示
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getSPU()
  },
)

// 获取全部已有的SPU数据
const getSPU = async (pager = 1) => {
  // 修改当前页码
  pageNo.value = pager

  let result: SpuResponseData = await reqGetSPU(pageNo.value, limit.value, categoryStore.c3Id)
  console.log(result)
  if (result.code == 200) {
    records.value = result.data.records
  }
}

// 分页器的下拉菜单发生变化的时候触发的函数
const sizeChange = () => {
  getSPU()
}

// 场景0中点击添加SPU按钮的回调函数
const addSPU = () => {
  // 切换场景为1
  scene.value = 1
}

// 场景0中点击修改SPU按钮的回调函数
const updateSPU = () => {
  // 切换场景为1
  scene.value = 1
}

// 子组件spuForm绑定的自定义事件，用于取消按钮的切换场景功能
const changeScene = (newScene: number) => {
  scene.value = newScene
}
</script>

<style scoped></style>
