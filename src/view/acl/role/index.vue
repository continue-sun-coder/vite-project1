<template>
  <div>
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="角色名称">
          <el-input placeholder="请输入角色名称" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="keyword ? false : true"
            @click="search"
          >
            搜索
          </el-button>
          <el-button type="primary" size="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0px">
      <el-button type="primary" size="default" icon="Plus" @click="addRole">添加角色</el-button>
      <!-- table 展示用户信息 -->
      <el-table style="margin: 10px 0px" border :data="allRole">
        <el-table-column label="序号" align="center" type="index"></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="角色名称"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" icon="User" @click="setPermisson(row)">
              分配权限
            </el-button>
            <el-button type="warning" size="small" icon="Edit" @click="updateRole(row)">
              编辑
            </el-button>
            <el-popconfirm
              :title="`确定删除${row.roleName}？`"
              width="260px"
              @confirm="deleteRole(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 10]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getHasRole"
      />
    </el-card>
    <!-- 添加、更新角色对话框 -->
    <el-dialog v-model="dialogVisible" :title="roleParams.id ? '更新角色' : '添加角色'" width="500">
      <el-form ref="formRef" :model="roleParams" :rules="rules" label-width="auto">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleParams.roleName" placeholder="请输入角色名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" plain @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
    <!-- 抽屉组件：分配角色的菜单权限与按钮权限 -->
    <el-drawer v-model="drawer" direction="rtl">
      <!-- 头部标题：文字内容是动态的 -->
      <template #header>
        <h4>分配菜单与按钮权限</h4>
      </template>
      <!-- 主体部分 -->
      <template #default>
        <!-- 
        show-checkbox：节点是否可被选择
        default-expand-all：是否默认展开所有节点
        default-checked-keys：默认勾选的节点的 key 的数组
        props：树形控件的选项配置对象，具体属性如下：
          children：子节点数组的字段名称，默认为 children
          label：节点显示文本的字段名称，默认为 label
          disabled：节点禁用状态的字段名称，默认为 disabled
        -->
          <el-tree
            style="max-width: 600px"
            :data="menuArr"
            :props="defaultProps"
            show-checkbox 
            :default-expand-all="true"
            :default-checked-keys="selectArr"
            node-key="id"
            ref="tree"
          />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false" type="primary" plain>取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role'
import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'
import { ElMessage, type FormInstance, type TreeInstance } from 'element-plus'
import type { TreeKey } from 'element-plus/es/components/tree/src/tree.type.mjs'
// import useLayoutSettingStore from '@/store/modules/setting';
import { ref, onMounted, reactive, nextTick } from 'vue'

// 收集用户输入关键字（搜索框）
let keyword = ref<string>('')
// 获取setting小仓库
// let settingStore = useLayoutSettingStore()
// 默认页码
let pageNo = ref<number>(1)
// 一页展示几条数据
let pageSize = ref<number>(5)
// 存储全部已有的角色信息
let allRole = ref<Records>([])
// 用户总个数
let total = ref<number>(0)
//对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 收集角色数据（添加、更新角色对话框）
let roleParams = reactive<RoleData>({
  roleName: '',
})
// form组件实例
let formRef = ref<FormInstance>()
// 抽屉组件的显示与隐藏
let drawer = ref<boolean>(false)
// 存储用户权限数据
let menuArr = ref<MenuList>([])
// 存储勾选了节点的id
let selectArr = ref<number[]>([])
// 获取tree 组件实例
let tree = ref<TreeInstance>()

// 组件挂载完毕
onMounted(() => {
  // 获取角色请求
  getHasRole()
})

// 获取已有角色|分页器页码发生改变时，触发该函数
const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}

// 搜索功能：当用户点击搜索按钮时，触发该函数
const search = () => {
  getHasRole()
  keyword.value = ''
}

// 重置功能：当用户点击重置按钮时，触发该函数
const reset = () => {
  // settingStore.refresh = !settingStore.refresh
  keyword.value = ''
  getHasRole()
}

// 添加角色功能：当用户点击添加角色按钮时，触发该函数
const addRole = () => {
  dialogVisible.value = true
  Object.assign(roleParams, {
    id: 0,
    roleName: '',
  })
  // 清空表单校验状态
  nextTick(() => {
    formRef.value?.clearValidate('roleName')
  })
}

// 编辑角色功能：当用户点击编辑按钮时，触发该函数
const updateRole = (row: RoleData) => {
  dialogVisible.value = true
  // 将当前行数据赋值给roleParams，展示在对话框中
  Object.assign(roleParams, row)
  // 清空表单校验状态
  nextTick(() => {
    formRef.value?.clearValidate('roleName')
  })
}

// 保存功能：当用户点击对话框中的确定按钮时，触发该函数
const save = async () => {
  // 表单校验，校验成功，才发送请求
  await formRef.value?.validate()
  let result = await reqAddOrUpdateRole(roleParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新角色成功' : '添加角色成功',
    })
    dialogVisible.value = false
    getHasRole(roleParams.id ? pageNo.value : 1)
  }
}

// 分配权限功能：当用户点击分配权限按钮时，触发该函数
const setPermisson = async (row: RoleData) => {
  drawer.value = true
  // 获取用户权限数据
  Object.assign(roleParams, row)
  // 根据角色的id获取权限数据
  const result: MenuResponseData = await reqAllMenuList(roleParams.id as number)
  if (result.code === 200) {
    menuArr.value = result.data
    // 获取已勾选的节点id数组
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}

// 树形控件需要传递的配置项对象
const defaultProps = {
  children: 'children',
  label: 'name',
}

// 递归函数：过滤出已勾选的节点id数组
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })

  return initArr
}
// 确认分配权限功能：当用户点击抽屉组件中的确定按钮时，触发该函数
const confirmClick = async () => {
  // 角色ID
  const roleId = roleParams.id as number
  // 选中节点的ID
  let checkedKeys = tree.value?.getCheckedKeys()
  // 半选的id
  let halfCheckedKeys = tree.value?.getHalfCheckedKeys()
  let permissionId = checkedKeys?.concat(halfCheckedKeys as TreeKey[])
  // 下发权限
  const result = await reqSetPermission(roleId, permissionId as number[])
  if (result.code == 200) {
    // 抽屉关闭
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    })
    // getHasRole()
    // 页面刷新
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '分配权限失败',
    })
  }
}

// 删除角色功能：当用户点击删除按钮时，触发该函数
const deleteRole = async (roleId: number) => {
  const result = await reqRemoveRole(roleId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除角色成功',
    })
    getHasRole(allRole.value.length > 0 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除角色失败',
    })
  }
}

// 分页器：当用户改变每页展示条数时，触发该函数
const handleSizeChange = () => {
  getHasRole()
}

// 自定义校验规则
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('角色名称至少两位'))
  }
}
// 角色名称校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
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
