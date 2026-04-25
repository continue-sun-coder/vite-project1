<template>
  <el-form ref="formRef" :model="form" label-width="auto">
    <el-form-item label="名称">
      <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName" />
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model="SpuParams.tmId" placeholder="请选择品牌">
        <el-option
          :label="item.tmName"
          value="item.id"
          v-for="item in AllTrademark"
          :key="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="描述" v-model="SpuParams.description">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>

    <el-form-item label="照片">
      <!-- 
      v-model:file-list->展示默认图片 
      action:上传图片的接口地址
      list-type:文件列表的类型
      on-preview:照片墙点击预览触发的钩子函数
      -->
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="销售属性">
      <div style="display: flex; gap: 15px">
        <el-select v-model="saleAttrAndValueName" :placeholder="unSelectSaleAttr.length? `还有${unSelectSaleAttr.length}个未选择`:`无`">
          <el-option :label="item.name" :value="`${item.id}:${item.name}`" v-for="item in unSelectSaleAttr" :key="item.id" />
        </el-select>
        <el-button 
          type="primary" 
          icon="Plus" 
          :disabled="saleAttrAndValueName?false:true"
          @click="addSaleAttr"
        >添加销售属性</el-button>
      </div>
      <el-table :data="saleAttr" style="width: 100%; margin: 10px 0" border>
        <el-table-column type="index" label="序号" width="80px" align="center" />
        <el-table-column prop="saleAttrName" label="属性名" width="180px" align="center" />
        <el-table-column prop="attrValue" label="属性值" align="center">
          <!-- row:当前SPU已有的销售属性对象 -->
          <template #="{ row, $index }">
            <el-tag
              v-for="item in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              style="margin: 0 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-button type="success" size="small" icon="Plus"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px" align="center">
          <template #="{ row, $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            />
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
import { ref, reactive, computed } from 'vue'
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
import { ElMessage } from 'element-plus'

// 存储已有的SPU对象
let SpuParams = ref<SPU>({
  category3Id: '', //三级分类的id
  spuName: '', //SPU的名字
  description: '', //描述
  tmId: '', //品牌id
  spuImageList: [], //照片
  spuSaleAttrList: [], //属性值
})
// 存储已有的SPU数据
let AllTrademark = ref<TradeMark[]>([])
// 商品的图片
let imgList = ref<SpuImg[]>([])
// 已有SPU的销售属性
let saleAttr = ref<SaleAttr[]>([])
// 全部的销售属性
let allSaleAttr = ref<AllSaleAttr[]>([])
// 收集还未选择的销售属性的ID与属性值的名字
let saleAttrAndValueName = ref<string>('')
const initHasSpuData = async (row: SPU) => {
  // 存储已有的SPU对象，用于在模版中展示
  SpuParams.value = row
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
  imgList.value = result1.data.map((item) => {
    return {
      // elementplus的API格式为name,url，因此需要进行修改
      name: item.imgName,
      url: item.imgUrl,
    }
  })
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
// 计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(()=>{
  // 销售属性有：颜色、版本、尺码
  let unSelectAttr = allSaleAttr.value.filter(item=>{
    return saleAttr.value.every(item1 => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectAttr
})

// 添加销售属性的方法（点击添加销售属性按钮的回调）
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrAndValueName.value.split(':')
  // type文件中定义的SaleAttr
  // 准备一个新的销售属性对象，将来带给服务器
  let newSaleAttr:SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  // 追加到数组当中
  saleAttr.value.push(newSaleAttr)
  // 清空下拉菜单
  saleAttrAndValueName.value = ''
}

import { Plus } from '@element-plus/icons-vue'

// 表单数据
const form = reactive({
  name: '',
  brand: '',
  desc: '',
  saleAttr: '',
  images: [],
})

// 图片预览的地址
const dialogImageUrl = ref('')
// 控制图片预览对话框的显示与隐藏
const dialogVisible = ref(false)
// 照片墙删除图片执行的钩子
const handleRemove = () => {
  ElMessage({
    type: 'success',
    message: '图片已删除',
  })
}
// 照片墙点击预览触发的钩子函数
const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
// 照片上传成功之前的钩子，约束文件的大小与类型
const handleUpload = (uploadFile: any) => {
  if (
    uploadFile.type === 'image/png' ||
    uploadFile.type === 'image/jpeg' ||
    uploadFile.type === 'image/gif'
  ) {
    if (uploadFile.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF',
    })
    return false
  }
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
