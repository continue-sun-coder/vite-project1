<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :scene="scene" />
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          style="margin: 15px 0"
          @click="addAttr"
        >
          添加平台属性
        </el-button>
        <el-table style="width: 100%" border :data="attrArr">
          <el-table-column prop="date" type="index" label="序号" width="80px" align="center" />
          <el-table-column prop="attrName" label="属性名称" width="120px" align="center" />
          <el-table-column prop="address" label="属性值名称" align="center">
            <template v-slot="{ row }">
              <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="180px" align="center">
            <!-- 已有的属性对象 -->
            <template v-slot="{ row }">
              <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)" />
              <el-popconfirm
                :title="`您确定要删除 ${row.attrName} 吗？`"
                @confirm="deleteAttr(row.id)"
                width="300px"
                icon="WarningFilled"
              >
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName" />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="attrParams.attrName.trim() ? false : true"
          @click="addAttrVaule"
        >
          添加属性值
        </el-button>
        <el-button @click="Cancel">取消</el-button>
        <el-table :data="attrParams.attrValueList" style="width: 100%; margin: 15px 0" border>
          <el-table-column prop="date" label="序号" type="index" width="80px" align="center" />
          <el-table-column prop="name" label="属性值名称" align="center">
            <template v-slot="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
              />
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="180px" align="center">
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          @click="Save"
        >
          保存
        </el-button>
        <el-button @click="Cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store/modules/category'
let categoryStore = useCategoryStore()

import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqADDorUPDATEAttr, reqRemoveAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
// 存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
// 收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '', //新增属性的名字
  attrValueList: [
    //新增的属性值数组
  ],
  categoryId: '', // 三级分类的id
  categoryLevel: 3, //代表是三级分类
})
// 准备一个数组：存储对应组件实例el-input
let inputArr = ref<any>([])
// 定义卡片内容切换变量
let scene = ref<number>(0)
// 监听仓库三级分类ID的变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上一次查询的属性与属性值
    attrArr.value = []
    // 要保证三级分类有id才能发送请求
    if (categoryStore.c3Id) getAttr()
  },
)
// 获取已有的属性与属性值方法
const getAttr = async () => {
  // 解构获取分类的id
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}

// 添加属性按钮的回调函数
const addAttr = () => {
  // 需要先清空数据
  Object.assign(attrParams, {
    attrName: '', //新增属性的名字
    attrValueList: [
      //新增的属性值数组
    ],
    categoryId: categoryStore.c3Id, // 收集三级分类的id
    categoryLevel: 3, //代表是三级分类
  })
  // 切换为添加属性页面
  scene.value = 1
}
// 修改按钮
const updateAttr = (row: Attr) => {
  // 切换为添加属性页面
  scene.value = 1
  // 将已有的属性对象赋值给attrParams
  // 要进行深拷贝，不然在修改页面会出现添加属性值后即使取消添加也会使原来的对象受影响
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
// 取消按钮的回调
const Cancel = () => {
  scene.value = 0
}
// 保存按钮的回调
const Save = async () => {
  let result = await reqADDorUPDATEAttr(attrParams)
  if (result.code == 200) {
    // 保存成功需要切换场景
    scene.value = 0
    // 提示信息
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    // 获取全部已有数据
    getAttr()
  } else {
    // 提示信息
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
// 添加属性值按钮的回调
const addAttrVaule = () => {
  // 点击按钮的时候，向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  // 获取最后一个el-input组件，聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
// 属性值表单失去焦点事件回调
// input失去焦点变为div展示
const toLook = (row: AttrValue, $index: number) => {
  // 非法情况1:空属性
  if (row.valueName.trim() == '') {
    // 删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    // 错误提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    // 把当前失去焦点的属性值对象从数组当中去除
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    // 将重复的属性值从数组中去除
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}
// 在添加属性值界面，点击进入编辑模式
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  // 响应式数据发生变化，获取更新的DOM
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

// 删除某一已有属性的方法
const deleteAttr = async (id: number) => {
  // 发送删除请求
  let result = await reqRemoveAttr(id)
  if(result.code == 200){
    // 删除成功
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 获取剩余已有属性的属性值
    getAttr()
  }else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

// 路由组件销毁的时候，把仓库分类相关的数据清空，不然路由跳转后重新访问Category组件会有残留数组
onBeforeUnmount(()=>{
  categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
