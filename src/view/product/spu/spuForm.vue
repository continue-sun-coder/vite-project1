<template>
  <el-form ref="formRef" :model="form" label-width="auto">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入SPU名称" />
    </el-form-item>
    <el-form-item label="品牌" prop="brand">
      <el-select v-model="form.brand" placeholder="请选择品牌">
        <el-option label="Options1" value="1" />
        <el-option label="Options2" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>

    <el-form-item label="照片" prop="images">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="销售属性" prop="saleAttr">
      <div style="display: flex; gap: 15px">
        <el-select v-model="form.saleAttr" placeholder="请选择属性">
          <el-option label="Options1" value="1" />
          <el-option label="Options2" value="2" />
        </el-select>
        <el-button type="primary" icon="Plus">添加销售属性</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%; margin: 10px 0" border>
        <el-table-column type="index" label="序号" width="80px" align="center" />
        <el-table-column prop="attrName" label="属性名" width="180px" align="center" />
        <el-table-column prop="attrValue" label="属性值" align="center" />
        <el-table-column label="操作" width="80px" align="center">
          <template #default>
            <el-button type="danger" size="small" icon="Delete" link />
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { reqAllSaleAttr, reqAllTrademark, reqSpuImageList, reqSpuSaleAttr } from '@/api/product/spu'
import type {
  SpuImg,
  AllTradeMark,
  SaleAttrResponseData,
  SPU,
  SpuImgs,
  TradeMark,
  SaleAttr,
  AllSaleAttr,
  AllSaleAttrResponseDate,
} from '@/api/product/spu/type'

// 存储已有的SPU数据
let AllTrademark = ref<TradeMark[]>([])
// 商品的图片
let imgList = ref<SpuImg[]>([])
// 已有SPU的销售属性
let saleAttr = ref<SaleAttr[]>([])
// 全部的销售属性
let allSaleAttr = ref<AllSaleAttr[]>([])
const initHasSpuData = async (row: SPU) => {
  // row为父组件传过来的已有的SPU对象（不完整）
  // 获取全部品牌的数据
  let result: AllTradeMark = await reqAllTrademark()
  // 获取某一品牌下全部图片
  let result1: SpuImgs = await reqSpuImageList(row.id as number)
  // 获取已有的SPU销售属性
  let result2: SaleAttrResponseData = await reqSpuSaleAttr(row.id as number)
  // 获取整个项目全部SPU销售属性
  let result3: AllSaleAttrResponseDate = await reqAllSaleAttr()

  AllTrademark.value = result.data
  imgList.value = result1.data
  saleAttr.value = result2.data
  allSaleAttr.value = result3.data
}
// 对外暴露：传递方法给父组件使用
defineExpose({ initHasSpuData })

let $emit = defineEmits(['changeScene'])
// 点击取消按钮，通知父组件切换场景
const cancel = () => {
  $emit('changeScene', 0)
}

import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'

// 表单数据
const form = reactive({
  name: '',
  brand: '',
  desc: '',
  saleAttr: '',
  images: [],
})

// 文件列表（示例数据）
const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

// 图片预览
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log('删除文件:', uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 表格数据
const tableData = ref([
  { attrName: '颜色', attrValue: '黑色,白色,红色' },
  { attrName: '尺寸', attrValue: 'S,M,L,XL' },
])
</script>

<style scoped lang="scss">
.el-select {
  width: 200px;
}
</style>
