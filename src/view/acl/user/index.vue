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
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table :data="userArr" style="width: 100%; margin: 10px 0" border>
      <el-table-column width="40px" type="selection" />
      <el-table-column label="序号" type="index" />
      <el-table-column label="id" prop="id" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="用户名字" prop="username" align="center"></el-table-column>
      <el-table-column label="用户名称" prop="name" align="center"></el-table-column>
      <el-table-column label="用户角色" prop="roleName" align="center"></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
          <el-button type="warning" size="small" icon="Edit" @click="updateUser(row)">
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定删除${row.username}？`"
            width="260px"
            @confirm="deleteUser(row.id)"
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
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total "
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasUser"
    />
  </el-card>
  <!-- 抽屉组件：新增/更新用户信息 -->
  <el-drawer v-model="drawer" direction="rtl">
    <template #header>
      <h4>{{ UserParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="UserParams" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input placeholder="请输入用户姓名" v-model="UserParams.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input placeholder="请输入用户昵称" v-model="UserParams.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!UserParams.id">
          <el-input placeholder="请输入用户密码" v-model="UserParams.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 抽屉：分配角色 -->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="UserParams.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange">
              全选
            </el-checkbox>
            <!-- 显示角色复选框 -->
            <el-checkbox-group v-model="checkedRole" @change="handleCheckedRoleChange">
              <el-checkbox v-for="(role, index) in allRole" :key="index" :value="role">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer1 = false">取消</el-button>
          <el-button type="primary" @click="saveRole">确定</el-button>
        </div>
      </template>
    </el-drawer>
</template>

<script setup lang="ts">
import type { AllRole, AllRoleResponseData, Records, SetRoleData, User, UserResponseData } from '@/api/acl/user/type'
import { reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqUserInfo } from '@/api/acl/user/index'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示几条数据
let pageSize = ref<number>(10)
// 数据总条数
let total = ref<number>(20)
let userArr = ref<Records>([])
// 抽屉组件的显示与隐藏
// 添加、修改用户的抽屉
let drawer = ref<boolean>(false)
// 分配角色的抽屉
let drawer1 = ref<boolean>(false)
// 收集用户信息的响应式数据
let UserParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
// 获取form组件实例
let formRef = ref()
// 是否全选
let checkAll = ref<boolean>(false)
// 设置复选框不确定状态，仅负责样式控制（全选框的半选状态-）
const isIndeterminate = ref<boolean>(true)
// 存储全部角色数据(显示出来的所有可选项)
let allRole = ref<AllRole>([])
// 用户已有角色数据(已勾选的)
let checkedRole = ref<AllRole>([])

onMounted(() => {
  getHasUser()
})

const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}

// 分页器下拉菜单（选择展示条数）的回调函数
const handleSizeChange = () => {
  getHasUser()
}

const deleteUser = (id: number) => {
  console.log(id)
}

// 添加用户
const addUser = () => {
  //显示抽屉
  drawer.value = true
  // 清空遗留数据
  Object.assign(UserParams, {
    username: '',
    name: '',
    password: '',
  })
  // 获取form组件，清理遗留的校验信息
  // 第一次点击的时候，是没有form的
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}

// 编辑
const updateUser = (row: User) => {
  // row是已有的用户的信息
  drawer.value = true
  // 收集已有的账号信息
  Object.assign(UserParams, row)

  // 清除上一次的错误提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}
// 添加/编辑用户的取消按钮
const cancel = () => {
  drawer.value = false
}
// 添加/编辑用户的保存按钮
const save = async () => {
  // 点击保存的时候，需要确定表单校验都通过
  await formRef.value.validate()
  // 抽屉组件
  drawer.value = false
  let result = await reqAddOrUpdateUser(UserParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: UserParams.id ? '更新成功' : '添加成功',
    })
    getHasUser(UserParams.id? pageNo.value : 1)
    // 浏览器自动刷新
    // 如果修改了目前登录的用户，那么需要重新登录
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: UserParams.id ? '更新失败' : '添加失败',
    })
  }
}

// 校验用户名字回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  // 用户名字｜昵称，长度至少五位
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名字至少五位'))
  }
}

// 校验用户名字回调函数
const validatorName = (rule: any, value: any, callBack: any) => {
  if (!value) {
    callBack(new Error('用户名不能为空'))
  } else if (value.length < 3 || value.length > 20) {
    callBack(new Error('用户名长度在 3 - 20 之间'))
  } else {
    callBack()
  }
}

// 校验用户密码回调函数
const validatorPassword = (rule: any, value: any, callBack: any) => {
  if (!value) {
    callBack(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 20) {
    callBack(new Error('密码长度在 6 - 20 之间'))
  } else {
    callBack()
  }
}

// 表单校验的规则对象
const rules = {
  // 用户名字
  // 这里trigger使用change的话，在清空遗留数据的时候，还是会有遗留信息是因为由原来的变为了空
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  // 用户昵称
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  // 用户密码
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}

// 分配角色
const setRole = async (row: User) => {
  drawer1.value = true
  // 存储已有的用户信息
  Object.assign(UserParams,row)

  let result: AllRoleResponseData = await reqAllRole(UserParams.id as number)
  if (result.code == 200) {
    allRole.value = result.data.allRolesList
    checkedRole.value = result.data.assignRoles
    // 全选
    checkAll.value = checkedRole.value.length === allRole.value.length
    // 半选
    isIndeterminate.value = checkedRole.value.length > 0 && checkedRole.value.length < allRole.value.length
  }
}

// 保存分配角色
const saveRole = async () => {
  let data: SetRoleData = {
    userId: UserParams.id as number,
    roleIdList: checkedRole.value.map((item) => {
      return item.id as number
    }) // 只需要角色的id
  }

  let result = await reqSetUserRole(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '角色分配成功',
    })
    drawer1.value = false
  } else {
    ElMessage({
      type: 'error',
      message: '角色分配失败',
    })
  }
  // 关闭抽屉
  drawer1.value = false
  // 获取更新完毕用户的信息
  getHasUser(pageNo.value)
}

// 全选复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  checkedRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}

// 
const handleCheckedRoleChange = (value: string[]) => {
  // 检查已勾选的数组长度和全部数据数组的长度是否相等
  const checkedCount = value.length //当前勾选了几个
  // 全选
  checkAll.value = checkedCount === allRole.value.length // boolean
  // 半选
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
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
