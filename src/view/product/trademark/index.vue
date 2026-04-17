<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
    <el-table border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <!-- el-table-column默认展示数据使用div，prop="tmName" -->
      <el-table-column label="品牌名称" align="center">
        <template v-slot="{ row }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row, $index }">
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          ></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="getHasTrademark"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, ->, jumper, sizes, total"
      :total="total"
    />
  </el-card>

  <!-- 对话框组件：在添加品牌于修改已有品牌的业务时使用的结构 -->
  <!-- 
    v-model：控制对话框的显示与隐藏 
    title：对话框的标题

  -->
  <el-dialog
    v-model="dialogVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    width="500"
    :before-close="handleClose"
  >
    <el-form ref="formRef" :model="trademarkParams" :rules="rules" label-width="auto">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName" />
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="logoUrl">
        <!-- 上传图片 -->
        <!-- action: 文件上传的接口地址，要加上/api-->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="headers"
        >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="Confirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark } from '@/api/product/trademark'
import type { Records, TradeMark } from '@/api/product/trademark/type'
// 定义分页相关的数据
// pageNo:当前页码，limit:每页条数，total:总条数，trademarkArr:已有品牌的数据数组
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
// 控制对话框显示与隐藏的变量
let dialogVisible = ref<boolean>(false)
// 定义手机新增品牌数据的对象
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取el-form组件的实例对象
const formRef = ref()
// 获取已有品牌的接口封装为一个函数，在任何情况下获取数据，调用函数即可
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result = await reqHasTrademark(pageNo.value, limit.value)
  console.log(result)
  if (result.code == 200) {
    // 存储已有品牌的总数
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(() => {
  getHasTrademark()
})
// 分液器每页条数发生变化会触发
// 分页组件会将下拉菜单选中的数据进行返回
const sizeChange = () => {
  // 数据都通过v-model绑定了，所以limit.value的值会发生变化，调用函数获取数据即可
  getHasTrademark()
}
// 分液器当前页码发生变化会触发
// 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据（当前的页码）
// const changePage = () => {
//   // 数据都通过v-model绑定了，所以pageNo.value和limit.value的值会发生变化，调用函数获取数据即可
//   // 因此可以不再单独封装一个函数，直接调用获取数据的函数即可
//   getHasTrademark()
// }

// 添加品牌
const addTrademark = () => {
  dialogVisible.value = true
  // 在每次添加品牌前，清空添加品牌的数据对象，就不用在Cancel, Confirm函数中重复代码了
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 如果用户点击完修改品牌再点击添加品牌，trademarkParams.id有值，所以在每次获取已有品牌数据之前，清空id的值
  trademarkParams.id = undefined

  // 还需要清空掉表单校验结果
  formRef.value?.clearValidate()
  // 另一种写法
  // nextTick(() => {
  //   formRef.value.clearValidate()
  // })
}
// 修改已有品牌
const updateTrademark = (row: TradeMark) => {
  // 清除掉表单校验结果
  formRef.value?.clearValidate()

  // 将已有品牌的数据回显到对话框组件中
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
  // trademarkParams.id = row.id
  // ES6语法，合并对象
  Object.assign(trademarkParams, row)
  dialogVisible.value = true
}
// 对话框组件：取消按钮的事件
const Cancel = () => {
  dialogVisible.value = false
  // // 清空添加品牌的数据对象
  // trademarkParams.tmName = ''
  // trademarkParams.logoUrl = ''
}
// 对话框组件：确认按钮的事件
const Confirm = async () => {
  // 为什么这里不用清除表单校验结果？因为在上传图片成功之后，已经清除了对应图片的校验结果了
  // 而且此时没有form对象，所以无法调用clearValidate方法了
  
  // 在发送请求之前，先进行表单校验，只有校验通过了才发送请求
  // validate方法会返回一个Promise对象，校验成功，Promise对象状态为resolved；校验失败，Promise对象状态为rejected
  // 定义一个变量接收validate方法返回的Promise对象，使用await进行等待，拿到校验结果
  await formRef.value.validate()

  let result = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    // 关闭对话框
    dialogVisible.value = false
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改成功' : '添加成功',
    })
    // 获取已有品牌的数据，更新页面
    // 如果trademarkParams.id有值，说明是修改已有品牌，获取当前页的数据；如果没有值，说明是添加品牌，获取第一页的数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
    // // 清空添加品牌的数据对象
    // trademarkParams.tmName = ''
    // trademarkParams.logoUrl = ''
  } else {
    // 提示用户操作失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改失败' : '添加失败',
    })
    // 关闭对话框
    dialogVisible.value = false
  }
}
// 上传图片成功之前触发的钩子，可以约束文件类型和大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}
// 上传图片成功之后触发的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  //response:即为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址,添加一个新的品牌的时候带给服务器
  console.log(response)
  trademarkParams.logoUrl = response.data
  //图片上传成功,清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl')
}

// 自定义品牌名称校验方法
// rule:校验规则对象，value:表单项的值，callback:放行函数
// 触发时机：blur事件触发时，进行校验
const validatorTmName = (rule: any, value: string, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称必须至少2个字符'))
  }
}
// 自定义LOGO上传校验方法
const validatorLogoUrl = (rule: any, value: string, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌LOGO'))
  }
}

// 定义表单校验规则对象
const rules = {
  tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, message: '请上传品牌LOGO', validator: validatorLogoUrl }],
}

// el-upload 上传 http 请求头，携带 Token
// 引入用户相关的仓库
import { useUserStore } from '@/store/modules/user'
// 获取用户相关的小仓库：获取仓库内部token，登录成功以后携带给服务器
const userStore = useUserStore()
const headers = { Token: userStore.token }
</script>

<style scoped lang="scss">
img {
  display: inline;
  margin: auto;
}

.avatar-uploader {
  border: 2px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  &:hover {
    border-color: var(--el-color-primary);
  }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
