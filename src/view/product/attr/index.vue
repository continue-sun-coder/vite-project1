<template>
  <div>
    <!-- 三级分类组件 -->
    <Category />
    <el-card>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
        style="margin: 15px 0"
      >
        添加平台属性
      </el-button>
      <el-table style="width: 100%" border :data="attrArr">
        <el-table-column prop="date" type="index" label="序号" width="80px" align="center" />
        <el-table-column prop="attrName" label="属性名称" width="120px" align="center" />
        <el-table-column prop="address" label="属性值名称" align="center">
          <template #="{row, $index}">
            <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="80px" align="center">
          <!-- 已有的属性对象 -->
          <template #="{ row, $index }">
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="updateAttr(row)"
            />
            <el-popconfirm
              :title="`您确定要删除 ${row.tmName} 吗？`"
              @confirm="deleteAttr(row.id)"
              width="300px"
              icon="WarningFilled"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"/>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store/modules/category'
let categoryStore = useCategoryStore()

import { watch, ref } from 'vue'
import { reqAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
// 存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
// 监听仓库三级分类ID的变化
watch(()=>categoryStore.c3Id, ()=>{
  // 清空上一次查询的属性与属性值
  attrArr.value = []
  // 要保证三级分类有id才能发送请求
  if(categoryStore.c3Id)
    getAttr()
})
// 获取已有的属性与属性值方法
const getAttr = async () => {
  // 解构获取分类的id
  const { c1Id, c2Id, c3Id} = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if(result.code == 200){
    attrArr.value = result.data
  }
}
</script>

<style scoped lang="scss"></style>
