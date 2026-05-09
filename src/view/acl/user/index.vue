<template>
  <el-card style="height: 80px">
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
  <el-card style="margin: 10px 0">
    <el-button type="primary">添加用户</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table :data="userArr" style="width: 100%; margin: 10px 0" border>
      <el-table-column width="40px" type="selection" />
      <el-table-column label="序号" type="index"/>
      <el-table-column label="id" prop="id" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="用户名字" prop="username" align="center"></el-table-column>
      <el-table-column label="用户名称" prop="name" align="center"></el-table-column>
      <el-table-column label="用户角色" prop="roleName" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <el-button icon="User" size="small" type="primary">分配角色</el-button>
        <el-button icon="Edit" size="small" type="warning">编辑</el-button>
        <el-button icon="Delete" size="small" type="danger">删除</el-button>
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
      @current-change="getHasUser"
    />
  </el-card>
</template>

<script setup lang="ts">
import type { Records } from '@/api/acl/user/type'
import { reqUserInfo } from '@/api/acl/user/index'
import { onMounted, ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示几条数据
let pageSize = ref<number>(10)
// 数据总条数
let total = ref<number>(20)
let userArr = ref<Records>([])

onMounted(()=>{
  getHasUser()
})

const getHasUser = async (pager=1) => {
  pageNo.value = pager
  let result = await reqUserInfo(pageNo.value, pageSize.value)
  if(result.code == 200){
    total.value = result.data.total
    userArr.value = result.data.records
  }
}

// 分页器下拉菜单（选择展示条数）的回调函数
const handleSizeChange = () => {
  getHasUser()
}
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
