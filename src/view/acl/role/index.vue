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
            <el-button type="primary" size="small" icon="User">
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
  </div>
</template>

<script setup lang="ts">
import { reqAllRoleList } from '@/api/acl/role';
import type { RoleResponseData, Records } from '@/api/acl/role/type';
// import useLayoutSettingStore from '@/store/modules/setting';
import { ref, onMounted } from 'vue';

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

// 组件挂载完毕
onMounted(() => {
  // 获取角色请求
  getHasRole()
})

// 获取已有角色|分页器页码发生改变时，触发该函数
const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
  if(result.code === 200) {
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
}

// 编辑角色功能：当用户点击编辑按钮时，触发该函数
const updateRole = (row: any) => {
}

// 删除角色功能：当用户点击删除按钮时，触发该函数
const deleteRole = (id: number) => {
}

// 分页器：当用户改变每页展示条数时，触发该函数
const handleSizeChange = () => {
  getHasRole()
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
