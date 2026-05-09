<template>
  <el-card>
    <el-table style="margin: 10px 0" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片" width="150px">
        <template v-slot="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="height: 100px; width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格" width="150px" prop="price"></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template v-slot="{ row }">
          <el-button
            type="warning"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            :title="`确定删除 ${row.skuName} ?`"
            width="200px"
            @confirm="deleteSku(row)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total "
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasSku"
    />
  </el-card>
</template>

<script setup lang="ts">
import { reqSkuList } from '@/api/product/sku'
import type { SkuResponseData, SkuData } from '@/api/product/sku/type'
import { ref, onMounted } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示几条数据
let pageSize = ref<number>(10)
// 数据总条数
let total = ref<number>(0)
// 需展示的已有sku数据
let skuArr = ref<SkuData[]>()
onMounted(()=>{
  getHasSku()
})
// 获取已有的sku数据
const getHasSku = async (pager=1) => {
  pageNo.value = pager
  const result:SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if(result.code == 200){
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}
// 分页器下拉菜单（选择展示条数）的回调函数
const handleSizeChange = (pageSize: number)=> {
  getHasSku()
} 
const findSku = (row:any)=> {

}
const deleteSku = (row:any)=> {

}
const updateSku = (row:any)=> {

}
</script>

<style scoped></style>
