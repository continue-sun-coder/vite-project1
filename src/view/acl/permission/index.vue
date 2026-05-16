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
            @click="addPermission(row)"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            :disabled="row.level == 1 ? true : false"
            @click="updatePermission(row)"
          >
            编辑
          </el-button>
          <el-popconfirm 
            :title="`确定删除${row.name}？`" 
            width="260px"
            @confirm="removePermission(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                :disabled="row.level == 1 ? true : false"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框组件：添加或者跟新已有菜单数据结构 -->
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'" width="500">
      <!-- 表单组件：收集新增与已有菜单数据 -->
      <el-form :label-width="formLabelWidth" style="margin-top: 20px">
        <el-form-item label="名称">
          <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input placeholder="请输入权限值" v-model="menuData.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateMenu, reqAllPermisson, reqRemoveMenu } from '@/api/acl/menu'
import type { MenuParams, Permission, PermissionList, PermissionResponsData } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 存储菜单数据
let PermissionArr = ref<PermissionList>([])
// 对话框显示与隐藏
let dialogVisible = ref(false)
// 存储新增与更新菜单数据
let menuData = reactive<MenuParams>({
  name: '',
  code: '',
  level: 1,
  pid: 0
})
// 表单宽度
let formLabelWidth = '80px'

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

// 添加菜单按钮的点击事件
const addPermission = (row: Permission) => {
  // 打开对话框
  dialogVisible.value = true
  
  Object.assign(menuData, {
    id: 0,
    name: '',
    code: '',
    level: row.level + 1,
    pid: row.id
  })
}
// 编辑菜单按钮的点击事件
const updatePermission = (row: Permission) => {
  // 打开对话框
  dialogVisible.value = true
  
  // 将已有菜单数据赋值给 menuData 对象
  Object.assign(menuData, row)
}

// 保存按钮的点击事件
const save = async () => {
  // 关闭对话框
  dialogVisible.value = false

  const result = await reqAddOrUpdateMenu(menuData)
  if (result.code == 200) {
    // 对话框隐藏
    dialogVisible.value = false

    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    // 获取最新的菜单数据，展示在页面上
    getHashPermission()
  }else {
    ElMessage({
      type: 'error',
      message: menuData.id ? '更新失败' : '添加失败',
    })
  }
}

// 删除菜单按钮的点击事件
const removePermission = async (id: number) => {
  const result = await reqRemoveMenu(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 获取最新的菜单数据，展示在页面上
    getHashPermission()
  }else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped></style>
