<template>
  <el-form label-width="auto">
    <el-form-item label="sku名称" prop="name">
      <el-input placeholder="请输入名称" />
    </el-form-item>
    <el-form-item label="价格(元)" prop="zone">
      <el-input-number :min="0" :precision="2" :step="0.01" /> 
    </el-form-item>
    <el-form-item label="重量(克)" prop="time">
      <el-input-number :min="0" :precision="0" :step="1" />
    </el-form-item>
    <el-form-item label="sku描述" prop="time">
      <el-input type="textarea" placeholder="请输入描述" />
    </el-form-item>
    <el-form-item label="平台属性" prop="name">
      <el-form label-width="auto" :inline="true">
        <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
          <el-select style="width: 180px">
            <el-option v-for="attrValue in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性" prop="name">
      <el-form>
        <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
          <el-select style="width: 180px">
            <el-option v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称" prop="name">
      <el-table :data="imgArr" style="width: 100%" border>
        <el-table-column prop="date" type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片" align="center">
          <template v-slot="row">
            <el-image style="width: 100px; height: 100px" :src="row.imgUrl" />
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <el-button type="warning" size="default">设置默认</el-button>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
// 引入接口的api
import { reqAttr } from '@/api/product/attr'
import { reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu'

import { ref } from 'vue'
// 平台属性
let attrArr = ref<any>([])
// 销售属性
let saleArr = ref<any>([])
// 照片墙数组
let imgArr = ref<any>([])

// 取消按钮的回调
const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}
// 对外暴露当前子组件
const initSkuData = async (c1Id:number|string, c2Id:number|string, spu:any) => {
  // 获取平台属性
  const result1 = await reqAttr(c1Id, c2Id, spu.category3Id)
  // 获取对应的销售属性
  const result2 = await reqSpuHasSaleAttr(spu.id)
  const result3 = await reqSpuImageList(spu.id)
  // 平台属性
  attrArr.value = result1.data
  // 销售属性
  saleArr.value = result2.data
  // 照片墙数组
  imgArr.value = result3.data
}
// 对外暴露的方法
defineExpose({ initSkuData })
// 自定义事件的方法
let $emit = defineEmits(['changeScene'])
</script>

<style scoped lang="scss"></style>
