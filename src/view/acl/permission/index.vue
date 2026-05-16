<template>
  <div>
    <el-table :data="PermissionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="权限值" prop="code" align="center"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <!-- row：即为已有的菜单对象｜按钮对象的数据 -->
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Plus"
            :disabled="row.level == 4 ? true : false"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            :disabled="row.level == 1 ? true : false"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定删除${row.name}？`"
            width="260px"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete" :disabled="row.level == 1 ? true : false">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reqAllPermisson } from '@/api/acl/menu'
import type { PermissionList, PermissionResponsData } from '@/api/acl/menu/type'
import { onMounted, ref } from 'vue'

// 存储菜单数据
let PermissionArr = ref<PermissionList>([])

// 组件挂载完毕
onMounted(() => {
  getHashPermission()
})

// 获取菜单数据方法
const getHashPermission = async () => {
  const result: PermissionResponsData = await reqAllPermisson()
  if (result.code == 200) {
    PermissionArr.value = result.data
  }
}
</script>

<style scoped></style>
