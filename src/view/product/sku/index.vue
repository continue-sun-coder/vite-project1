<template>
  <el-card>
    <el-table style="margin: 10px 0">
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
            type="primary"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
          <el-button
            type="primary"
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
              <el-button type="primary" size="small" icon="Delete"></el-button>
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
      :total="400"
      @size-change="handleSizeChange"
      @current-change="getHasSku"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
</script>

<style scoped></style>
