<template>
  <el-card style="height: 80px;">
      <el-form :inline="true" class="form"> 
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button type="primary" plain>重置</el-button>
          </el-form-item>
      </el-form>
  </el-card>
  <el-card style="margin: 10px 0;">
      <el-button type="primary">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>
      <el-table style="width: 100%; margin: 10px 0;" border>
          <el-table-column width="50px" type="selection"/>
          <el-table-column prop="name" label="Name" />
          <el-table-column label="id" ></el-table-column>
          <el-table-column label="用户名字" ></el-table-column>
          <el-table-column label="用户名称" ></el-table-column>
          <el-table-column label="用户角色" ></el-table-column>
          <el-table-column label="创建时间" ></el-table-column>
          <el-table-column label="更新时间" ></el-table-column>
          <el-table-column label="操作" >
            <el-button>分配角色</el-button>
            <el-button>编辑</el-button>
            <el-button>删除</el-button>
          </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total "
        :total="total"
      />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示几条数据
let pageSize = ref<number>(10)
// 数据总条数
let total = ref<number>(20)
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep(.el-card__body) {
  overflow: hidden;
}
</style>
