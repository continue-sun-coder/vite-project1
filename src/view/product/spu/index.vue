<template>
  <div>
    <!-- 三级分类卡片 -->
    <Category :scene="scene" />

    <el-card style="margin-top: 15px;">
      <el-button type="primary" icon="Plus">添加SPU</el-button>
        <el-table :data="tableData" style="width: 100%; margin: 15px 0;" border >
            <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" width="180px" align="center"></el-table-column>
            <el-table-column prop="address" label="描述" width="400px" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <el-button type="primary" size="small" icon="Plus"/>
              <el-button type="warning" size="small" icon="Edit"/>
              <el-button type="info" size="small" icon="InfoFilled"/>
              <el-button type="danger" size="small" icon="Delete"/>
            </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let scene = ref<number>(0)

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style scoped></style>
